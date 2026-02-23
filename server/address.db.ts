import { eq, and } from "drizzle-orm";
import { addresses, InsertAddress } from "../drizzle/schema";
import { getDb } from "./db";

export async function saveAddress(userId: number, address: Omit<InsertAddress, 'userId' | 'createdAt' | 'updatedAt'>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  // Se isDefault é true, remover isDefault de outros endereços
  if (address.isDefault) {
    await db.update(addresses)
      .set({ isDefault: false })
      .where(eq(addresses.userId, userId));
  }

  const result = await db.insert(addresses).values({
    ...address,
    userId,
  });

  return result;
}

export async function getAddresses(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return await db.select().from(addresses).where(eq(addresses.userId, userId));
}

export async function getDefaultAddress(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.select().from(addresses).where(
    and(
      eq(addresses.userId, userId),
      eq(addresses.isDefault, true)
    )
  ).limit(1);

  return result.length > 0 ? result[0] : null;
}

export async function updateAddress(addressId: number, userId: number, address: Partial<Omit<InsertAddress, 'userId' | 'createdAt' | 'updatedAt'>>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  // Se isDefault é true, remover isDefault de outros endereços
  if (address.isDefault) {
    await db.update(addresses)
      .set({ isDefault: false })
      .where(eq(addresses.userId, userId));
  }

  return await db.update(addresses)
    .set(address)
    .where(and(
      eq(addresses.id, addressId),
      eq(addresses.userId, userId)
    ));
}

export async function deleteAddress(addressId: number, userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return await db.delete(addresses).where(
    and(
      eq(addresses.id, addressId),
      eq(addresses.userId, userId)
    )
  );
}
