import { eq, desc, and, gte, lte } from "drizzle-orm";
import { getDb } from "./db";
import { orders, orderItems, payments, inventory, products } from "../drizzle/schema";

// ===== PEDIDOS =====

export async function getAllOrders() {
  const db = await getDb();
  if (!db) return [];
  
  return await db
    .select()
    .from(orders)
    .orderBy(desc(orders.createdAt));
}

export async function getOrderById(id: number) {
  const db = await getDb();
  if (!db) return null;
  
  const order = await db
    .select()
    .from(orders)
    .where(eq(orders.id, id))
    .limit(1);
  
  if (!order.length) return null;
  
  const items = await db
    .select()
    .from(orderItems)
    .where(eq(orderItems.orderId, id));
  
  return { ...order[0], items };
}

export async function updateOrderStatus(id: number, status: string) {
  const db = await getDb();
  if (!db) return null;
  
  await db
    .update(orders)
    .set({ status: status as any })
    .where(eq(orders.id, id));
  
  return await getOrderById(id);
}

export async function getOrdersByStatus(status: string) {
  const db = await getDb();
  if (!db) return [];
  
  return await db
    .select()
    .from(orders)
    .where(eq(orders.status, status as any))
    .orderBy(desc(orders.createdAt));
}

// ===== PAGAMENTOS =====

export async function getAllPayments() {
  const db = await getDb();
  if (!db) return [];
  
  return await db
    .select()
    .from(payments)
    .orderBy(desc(payments.createdAt));
}

export async function getPaymentsByOrderId(orderId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db
    .select()
    .from(payments)
    .where(eq(payments.orderId, orderId));
}

export async function updatePaymentStatus(id: number, status: string) {
  const db = await getDb();
  if (!db) return null;
  
  await db
    .update(payments)
    .set({ status: status as any })
    .where(eq(payments.id, id));
  
  const result = await db
    .select()
    .from(payments)
    .where(eq(payments.id, id))
    .limit(1);
  
  return result[0] || null;
}

export async function getPaymentsByStatus(status: string) {
  const db = await getDb();
  if (!db) return [];
  
  return await db
    .select()
    .from(payments)
    .where(eq(payments.status, status as any))
    .orderBy(desc(payments.createdAt));
}

// ===== ESTOQUE =====

export async function getAllInventory() {
  const db = await getDb();
  if (!db) return [];
  
  return await db
    .select()
    .from(inventory)
    .orderBy(inventory.productId);
}

export async function getInventoryByProductId(productId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db
    .select()
    .from(inventory)
    .where(eq(inventory.productId, productId));
}

export async function updateInventoryQuantity(id: number, quantity: number) {
  const db = await getDb();
  if (!db) return null;
  
  await db
    .update(inventory)
    .set({ quantity })
    .where(eq(inventory.id, id));
  
  const result = await db
    .select()
    .from(inventory)
    .where(eq(inventory.id, id))
    .limit(1);
  
  return result[0] || null;
}

export async function getLowStockItems() {
  const db = await getDb();
  if (!db) return [];
  
  return await db
    .select()
    .from(inventory)
    .where(gte(inventory.minQuantity, inventory.quantity));
}

// ===== DASHBOARD STATS =====

export async function getDashboardStats() {
  const db = await getDb();
  if (!db) return null;
  
  // Total de pedidos
  const totalOrdersResult = await db
    .select({ count: orders.id })
    .from(orders);
  
  const totalOrders = totalOrdersResult[0]?.count || 0;
  
  // Pedidos pendentes
  const pendingOrdersResult = await db
    .select({ count: orders.id })
    .from(orders)
    .where(eq(orders.status, "pending"));
  
  const pendingOrders = pendingOrdersResult[0]?.count || 0;
  
  // Receita total
  const totalRevenueResult = await db
    .select({ total: orders.total })
    .from(orders)
    .where(eq(orders.status, "delivered"));
  
  const totalRevenue = totalRevenueResult.reduce((sum, row) => {
    return sum + (parseFloat(row.total as any) || 0);
  }, 0);
  
  // Pagamentos aprovados
  const approvedPaymentsResult = await db
    .select({ count: payments.id })
    .from(payments)
    .where(eq(payments.status, "approved"));
  
  const approvedPayments = approvedPaymentsResult[0]?.count || 0;
  
  // Itens com baixo estoque
  const lowStockResult = await db
    .select({ count: inventory.id })
    .from(inventory)
    .where(gte(inventory.minQuantity, inventory.quantity));
  
  const lowStockCount = lowStockResult[0]?.count || 0;
  
  return {
    totalOrders,
    pendingOrders,
    totalRevenue,
    approvedPayments,
    lowStockCount,
  };
}

// ===== PRODUTOS =====

export async function getAllProducts() {
  const db = await getDb();
  if (!db) return [];
  
  return await db
    .select()
    .from(products)
    .orderBy(products.id);
}

export async function createProduct(data: any) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db
    .insert(products)
    .values(data);
  
  return result;
}

export async function updateProduct(id: number, data: any) {
  const db = await getDb();
  if (!db) return null;
  
  await db
    .update(products)
    .set(data)
    .where(eq(products.id, id));
  
  const result = await db
    .select()
    .from(products)
    .where(eq(products.id, id))
    .limit(1);
  
  return result[0] || null;
}
