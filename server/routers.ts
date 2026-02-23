import { COOKIE_NAME } from "@shared/const";
import { TRPCError } from "@trpc/server";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import { calculateShipping, validateCEP, formatCEP } from "./shipping";
import { createPaymentPreference, validateEmail, validatePhone } from "./payment";
import { saveAddress, getAddresses, getDefaultAddress, updateAddress, deleteAddress } from "./address.db";
import {
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  getOrdersByStatus,
  getAllPayments,
  getPaymentsByOrderId,
  updatePaymentStatus,
  getPaymentsByStatus,
  getAllInventory,
  getInventoryByProductId,
  updateInventoryQuantity,
  getLowStockItems,
  getDashboardStats,
  getAllProducts,
  createOrder,
} from "./admin.db";
import { sendAdminNewOrderWhatsApp } from "./services/whatsapp";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  shipping: router({
    calculateShipping: publicProcedure
      .input(
        z.object({
          cep: z.string(),
          weight: z.number(),
          height: z.number(),
          width: z.number(),
          length: z.number(),
          quantity: z.number(),
        })
      )
      .mutation(async ({ input }) => {
        if (!validateCEP(input.cep)) {
          return { success: false, error: "CEP invalido", options: [] };
        }
        try {
          const options = await calculateShipping(input);
          return { success: true, options, formattedCep: formatCEP(input.cep) };
        } catch (error) {
          return { success: false, error: "Erro ao calcular frete", options: [] };
        }
      }),
  }),

  payment: router({
    createPaymentPreference: publicProcedure
      .input(
        z.object({
          amount: z.number(),
          description: z.string(),
          payerEmail: z.string(),
          payerName: z.string(),
          payerPhone: z.string(),
          orderId: z.string(),
          items: z.array(
            z.object({
              title: z.string(),
              quantity: z.number(),
              unitPrice: z.number(),
            })
          ),
        })
      )
      .mutation(async ({ input }) => {
        if (!validateEmail(input.payerEmail)) {
          return { success: false, error: "Email invalido" };
        }
        if (!validatePhone(input.payerPhone)) {
          return { success: false, error: "Telefone invalido" };
        }
        try {
          const paymentResponse = await createPaymentPreference(input);
          return { success: paymentResponse.status !== 'error', ...paymentResponse };
        } catch (error) {
          return { success: false, status: 'error' as const, message: "Erro ao criar pagamento" };
        }
      }),
  }),

  checkout: router({
    createOrder: publicProcedure
      .input(
        z.object({
          customerName: z.string(),
          customerEmail: z.string(),
          customerPhone: z.string().optional(),
          address: z.string(),
          city: z.string(),
          state: z.string(),
          zipCode: z.string(),
          subtotal: z.number(),
          shippingCost: z.number().default(0),
          discount: z.number().default(0),
          total: z.number(),
          shippingMethod: z.string().optional(),
          items: z.array(
            z.object({
              productId: z.number(),
              size: z.string(),
              quantity: z.number(),
              price: z.number(),
              name: z.string(),
            })
          ),
        })
      )
      .mutation(async ({ input, ctx }) => {
        try {
          const { items, ...orderData } = input;
          const order = await createOrder({
            orderData: {
              ...orderData,
              subtotal: String(orderData.subtotal),
              shippingCost: String(orderData.shippingCost),
              discount: String(orderData.discount),
              total: String(orderData.total),
              userId: ctx.user?.id ?? null,
            },
            items: items.map(({ name: _name, ...item }) => ({
              ...item,
              price: String(item.price),
            })),
          });

          if (!order) {
            throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Erro ao criar pedido' });
          }

          // Notificar admin via WhatsApp (falhas não bloqueiam o checkout)
          const itemNameByProductId = new Map(items.map((i) => [i.productId, i.name]));
          await sendAdminNewOrderWhatsApp({
            orderId: order.id,
            total: order.total,
            customerName: order.customerName,
            customerPhone: order.customerPhone,
            items: (order.items ?? []).map((item) => ({
              name: itemNameByProductId.get(item.productId) ?? `Produto #${item.productId}`,
              quantity: item.quantity,
              price: item.price,
            })),
          });

          return { success: true, order };
        } catch (error) {
          if (error instanceof TRPCError) throw error;
          throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Erro ao processar pedido' });
        }
      }),
  }),

  admin: router({
    getDashboardStats: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user?.role !== 'admin') {
        throw new Error('Acesso negado');
      }
      return await getDashboardStats();
    }),

    getAllOrders: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user?.role !== 'admin') {
        throw new Error('Acesso negado');
      }
      return await getAllOrders();
    }),

    getOrderById: protectedProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input, ctx }) => {
        if (ctx.user?.role !== 'admin') {
          throw new Error('Acesso negado');
        }
        return await getOrderById(input.id);
      }),

    updateOrderStatus: protectedProcedure
      .input(z.object({ id: z.number(), status: z.string() }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== 'admin') {
          throw new Error('Acesso negado');
        }
        return await updateOrderStatus(input.id, input.status);
      }),

    getOrdersByStatus: protectedProcedure
      .input(z.object({ status: z.string() }))
      .query(async ({ input, ctx }) => {
        if (ctx.user?.role !== 'admin') {
          throw new Error('Acesso negado');
        }
        return await getOrdersByStatus(input.status);
      }),

    getAllPayments: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user?.role !== 'admin') {
        throw new Error('Acesso negado');
      }
      return await getAllPayments();
    }),

    getPaymentsByOrderId: protectedProcedure
      .input(z.object({ orderId: z.number() }))
      .query(async ({ input, ctx }) => {
        if (ctx.user?.role !== 'admin') {
          throw new Error('Acesso negado');
        }
        return await getPaymentsByOrderId(input.orderId);
      }),

    updatePaymentStatus: protectedProcedure
      .input(z.object({ id: z.number(), status: z.string() }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== 'admin') {
          throw new Error('Acesso negado');
        }
        return await updatePaymentStatus(input.id, input.status);
      }),

    getPaymentsByStatus: protectedProcedure
      .input(z.object({ status: z.string() }))
      .query(async ({ input, ctx }) => {
        if (ctx.user?.role !== 'admin') {
          throw new Error('Acesso negado');
        }
        return await getPaymentsByStatus(input.status);
      }),

    getAllInventory: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user?.role !== 'admin') {
        throw new Error('Acesso negado');
      }
      return await getAllInventory();
    }),

    getInventoryByProductId: protectedProcedure
      .input(z.object({ productId: z.number() }))
      .query(async ({ input, ctx }) => {
        if (ctx.user?.role !== 'admin') {
          throw new Error('Acesso negado');
        }
        return await getInventoryByProductId(input.productId);
      }),

    updateInventoryQuantity: protectedProcedure
      .input(z.object({ id: z.number(), quantity: z.number() }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== 'admin') {
          throw new Error('Acesso negado');
        }
        return await updateInventoryQuantity(input.id, input.quantity);
      }),

    getLowStockItems: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user?.role !== 'admin') {
        throw new Error('Acesso negado');
      }
      return await getLowStockItems();
    }),

    getAllProducts: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user?.role !== 'admin') {
        throw new Error('Acesso negado');
      }
      return await getAllProducts();
    }),
  }),

  address: router({
    saveAddress: protectedProcedure
      .input(
        z.object({
          street: z.string(),
          number: z.string(),
          complement: z.string().optional(),
          neighborhood: z.string(),
          city: z.string(),
          state: z.string(),
          zipCode: z.string(),
          isDefault: z.boolean().optional(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        if (!ctx.user) {
          throw new TRPCError({ code: 'UNAUTHORIZED' });
        }
        try {
          await saveAddress(ctx.user.id, input);
          return { success: true };
        } catch (error) {
          throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Erro ao salvar endereco' });
        }
      }),

    getAddresses: protectedProcedure.query(async ({ ctx }) => {
      if (!ctx.user) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }
      try {
        return await getAddresses(ctx.user.id);
      } catch (error) {
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Erro ao buscar enderecos' });
      }
    }),

    getDefaultAddress: protectedProcedure.query(async ({ ctx }) => {
      if (!ctx.user) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }
      try {
        return await getDefaultAddress(ctx.user.id);
      } catch (error) {
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Erro ao buscar endereco padrao' });
      }
    }),

    updateAddress: protectedProcedure
      .input(
        z.object({
          id: z.number(),
          street: z.string().optional(),
          number: z.string().optional(),
          complement: z.string().optional(),
          neighborhood: z.string().optional(),
          city: z.string().optional(),
          state: z.string().optional(),
          zipCode: z.string().optional(),
          isDefault: z.boolean().optional(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        if (!ctx.user) {
          throw new TRPCError({ code: 'UNAUTHORIZED' });
        }
        const { id, ...addressData } = input;
        try {
          await updateAddress(id, ctx.user.id, addressData);
          return { success: true };
        } catch (error) {
          throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Erro ao atualizar endereco' });
        }
      }),

    deleteAddress: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input, ctx }) => {
        if (!ctx.user) {
          throw new TRPCError({ code: 'UNAUTHORIZED' });
        }
        try {
          await deleteAddress(input.id, ctx.user.id);
          return { success: true };
        } catch (error) {
          throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Erro ao deletar endereco' });
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
