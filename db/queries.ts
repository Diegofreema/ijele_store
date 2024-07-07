'use server';

import { and, count, eq, getTableColumns } from 'drizzle-orm';
import { db } from '.';
import {
  SelectCart,
  SelectOrder,
  SelectProduct,
  SelectUser,
  cartTable,
  orders,
  productTable,
  usersTable,
} from './schema';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ProductInCartType } from '@/hooks/useGetCart';

export const getMenProducts = async (): Promise<Array<SelectProduct>> => {
  try {
    const men = db
      .select()
      .from(productTable)
      .where(eq(productTable.category, 'men'));
    return men;
  } catch (err) {
    console.log(err);
    throw new Error('Failed to get product');
  }
};
export const getWomenProducts = async (): Promise<Array<SelectProduct>> => {
  try {
    return db
      .select()
      .from(productTable)
      .where(eq(productTable.category, 'women'));
  } catch (error) {
    console.log(error);
    throw new Error('Failed to get products');
  }
};
export const getKidsProduct = async (): Promise<Array<SelectProduct>> => {
  try {
    return db
      .select()
      .from(productTable)
      .where(eq(productTable.category, 'children'));
  } catch (error) {
    console.log(error);

    throw new Error('Failed to get products');
  }
};

export const getSingleProduct = async (id: number): Promise<SelectProduct> => {
  try {
    const product = await db
      .select()
      .from(productTable)
      .where(eq(productTable.id, id));

    return product[0];
  } catch (error) {
    throw new Error('Failed to get product');
  }
};
export const getSimilarProduct = async (
  cat: string
): Promise<Array<SelectProduct>> => {
  try {
    const similarProducts = await db
      .select()
      .from(productTable)
      .where(eq(productTable.category, cat));
    return similarProducts;
  } catch (error) {
    console.log(error);

    throw new Error('Failed to get product');
  }
};

export const getProductInCart = async (): Promise<Array<ProductInCartType>> => {
  const id = cookies().get('id')?.value;
  if (!id) {
    return [];
  }

  try {
    const products = await db
      .select()
      .from(cartTable)
      .where(eq(cartTable.userId, id))
      .leftJoin(productTable, eq(cartTable.productId, productTable.id));
    return products;
  } catch (error) {
    console.log('error', error);
    throw new Error('Failed to get product in cart');
  }
};
export const getId = () => {
  const id = cookies().get('id')?.value;
  if (!id) return undefined;
  return id;
};
export const checkIfAddedInCart = async (
  productId: number
): Promise<boolean> => {
  const id = cookies().get('id')?.value;
  if (!id) {
    return false;
  }
  const isInCart = await db.query.cartTable.findFirst({
    where: and(eq(cartTable.userId, id), eq(cartTable.productId, productId)),
  });
  if (isInCart) return true;
  return false;
};

export const getProfile = async (id: string): Promise<SelectUser | null> => {
  try {
    const user = await db.query.usersTable.findFirst({
      where: eq(usersTable.user_id, id),
    });
    if (!user) {
      redirect('/');
    }
    return user;
  } catch (error) {
    console.log('error', error);
    return null;
  }
};

export const getOrders = async (id: string): Promise<Array<SelectOrder>> => {
  try {
    return await db.query.orders.findMany({
      where: eq(orders.customerId, id),
    });
  } catch (error) {
    console.log(error);

    throw new Error('Failed to get orders');
  }
};
