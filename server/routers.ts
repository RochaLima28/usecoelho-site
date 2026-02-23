import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import { calculateShipping, validateCEP, formatCEP } from "./shipping";
import { createPaymentPreference, validateEmail, validatePhone } from "./payment";
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
} from "./admin.db";

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
});

export type AppRouter = typeof appRouter;
