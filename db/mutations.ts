'use server';
import { and, eq, ilike, sql } from 'drizzle-orm';
import { db } from '.';
import {
  cartTable,
  favoriteTable,
  InsertUser,
  orderItems,
  orders,
  SelectUser,
  usersTable,
} from './schema';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { hashPasswordBcrypt, verifyPasswordBcrypt } from '@/lib/helper';
import { Resend } from 'resend';
import VerifyEmail from '@/email/VerifyEmail';
import ResetPassword from '@/email/ResetPassword';

const resend = new Resend(process.env.RESEND_KEY);
const api = process.env.BASE_URL;

type CartType = {
  productId: number;
  qty?: number;
};
export const addToCart = async ({ productId, qty = 1 }: CartType) => {
  const userId = cookies().get('id')?.value;
  if (!userId) {
    redirect('/sign-in');
    return { message: 'Please login' };
  }
  try {
    const isInCart = await db.query.cartTable.findFirst({
      where: and(
        eq(cartTable.userId, userId),
        eq(cartTable.productId, productId)
      ),
    });

    if (isInCart) {
      await db
        .update(cartTable)
        .set({ quantity: sql`${cartTable.quantity} + 1` })
        .where(eq(cartTable.id, isInCart.id));
    }

    if (!isInCart) {
      const productAddedToCArt = await db
        .insert(cartTable)
        .values({
          productId: productId,
          userId: userId,
          quantity: qty.toString(),
        })
        .returning();
      if (productAddedToCArt.length > 0) {
        revalidatePath('/', 'layout');
        return { message: 'Cart updated' };
      }
    }

    return { message: 'Error updating cart' };
  } catch (error) {
    console.log(error);
    return { message: 'Error updating cart' };
  }
};
export const removeFromCart = async (productId: number) => {
  const userId = cookies().get('id')?.value;
  if (!userId) {
    redirect('/sign-in');
    return { message: 'Please login' };
  }
  try {
    const deletedProductInCart = await db
      .delete(cartTable)
      .where(
        and(eq(cartTable.userId, userId), eq(cartTable.productId, productId))
      )
      .returning();

    if (deletedProductInCart.length > 0) {
      revalidatePath('/', 'layout');
      return { message: 'Cart updated' };
    }
    return { message: 'Error updating cart' };
  } catch (error) {
    console.log(error);
    return { message: 'Error updating cart' };
  }
};

export const addToFav = async (productId: number) => {
  const userId = cookies().get('id')?.value;
  if (!userId) {
    redirect('/sign-in');
    return { message: 'Please login' };
  }
  try {
    const isInFav = await db
      .select()
      .from(favoriteTable)
      .where(
        and(
          eq(favoriteTable.userId, userId),
          eq(favoriteTable.productId, productId)
        )
      );

    if (isInFav.length > 0) {
      await db
        .delete(favoriteTable)
        .where(
          and(
            eq(favoriteTable.userId, userId),
            eq(favoriteTable.productId, productId)
          )
        );
    }

    if (!isInFav) {
      await db
        .insert(favoriteTable) // @ts-ignore
        .values({ productId: productId, userId: userId });
    }

    return { message: 'Favorite updated' };
  } catch (error) {
    console.log(error);

    return { message: 'Error updating favorite' };
  }
};

export const register = async (values: InsertUser) => {
  try {
    const hashedPassword = await hashPasswordBcrypt(values.password!);
    if (!hashedPassword) return { message: 'Failed to create profile' };
    const userExists = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, values.email));
    if (userExists.length > 0) {
      return { message: 'Profile already exists' };
    }

    await db.insert(usersTable).values(values);
    const { error: emailError } = await resend.emails.send({
      from: `Support <${process.env.SENDER_EMAIL}>`,
      to: [values?.email],
      subject: 'Verify your email',
      react: VerifyEmail({
        userImage: values?.imageUrl as string,
        fullName: `${values?.firstName} ${values?.lastName}`,
        verificationLink: `${api}/confirm-email?id=${values?.user_id}`,
      }),
    });

    console.log('', emailError);
    return { message: 'success' };
  } catch (err) {
    return { message: 'Failed to create profile' };
  }
};

export const login = async (email: string, password: string) => {
  try {
    const user = await db.query.usersTable.findFirst({
      where: (table) => ilike(table.email, email),
    });

    console.log(user);

    if (!user) {
      return { message: 'User not found' };
    }
    const hashPassword = await verifyPasswordBcrypt(user?.password!, password);

    if (!hashPassword) {
      return { message: 'Invalid credentials' };
    }

    if (!user.verified) {
      return { message: 'not verified' };
    }
    cookies().set('id', user.user_id!);
    return { message: 'success' };
  } catch (error) {
    console.log('', error);

    return { message: 'Failed to login' };
  }
};

export const update = async (values: InsertUser, id: string) => {
  try {
    await db.update(usersTable).set(values).where(eq(usersTable.user_id, id));
    revalidatePath('/profile');
    return { message: 'success' };
  } catch (error) {
    console.log('', error);
    return { error: 'Failed to update' };
  }
};
export const getCookies = async () => {
  return cookies().get('id')?.value;
};

export const forgotPasswordFn = async (email: string) => {
  try {
    const user = await db.query.usersTable.findFirst({
      where: (table, { eq }) => eq(table.email, email),
    });
    if (user) {
      const { error: emailError } = await resend.emails.send({
        from: `Support <${process.env.SENDER_EMAIL}>`,
        to: [email],
        subject: 'Reset your password',
        react: ResetPassword({
          resetLink: `${api}/reset-password?id=${user.user_id}`,
        }),
      });
      console.log('df', emailError);
      if (!emailError) return { message: 'success' };
    }

    return { message: 'user not found' };
  } catch (error) {
    return { message: 'failed' };
  }
};
export const logOut = async () => {
  cookies().delete('id');
  redirect('/');
};

export const verifyEmail = async (id: string) => {
  try {
    await db
      .update(usersTable)
      .set({ verified: true })
      .where(eq(usersTable.user_id, id));
    return { message: 'Email verified' };
  } catch (error) {
    return { message: 'Failed to verify email' };
  }
};

const checkIfInCart = async (userId: string, productId: number) => {
  const isInCart = await db
    .select()
    .from(cartTable)
    .where(
      and(eq(cartTable.userId, userId), eq(cartTable.productId, productId))
    );
  if (isInCart?.length > 0) {
    const productInCart = isInCart[0];
    return productInCart;
  }
  return null;
};

export const increaseProductInCart = async (productId: number) => {
  const userId = cookies().get('id')?.value;
  if (!userId) {
    return { message: 'Please login' };
  }
  try {
    const productInCart = await checkIfInCart(userId, productId);
    if (productInCart) {
      await db
        .update(cartTable)
        .set({ quantity: sql`${cartTable.quantity} + 1` })
        .where(
          and(eq(cartTable?.userId, userId), eq(cartTable.productId, productId))
        );
    } else {
      await addToCart({ productId });
    }
    revalidatePath('/', 'layout');
    return { message: 'success' };
  } catch (error) {
    return { message: 'failed' };
  }
};
export const decreaseProductInCart = async (productId: number) => {
  const userId = cookies().get('id')?.value;
  if (!userId) {
    return { message: 'Please login' };
  }
  try {
    const productInCart = await checkIfInCart(userId, productId);
    if (productInCart) {
      if (+productInCart?.quantity! > 1) {
        await db
          .update(cartTable)
          .set({ quantity: sql`${cartTable.quantity} - 1` })
          .where(
            and(
              eq(cartTable?.userId, userId),
              eq(cartTable.productId, productId)
            )
          );
        revalidatePath('/', 'layout');
      } else {
        await db.delete(cartTable).where(eq(cartTable.id, productInCart.id));
        revalidatePath('/', 'layout');
      }
    }
    return { message: 'success' };
  } catch (error) {
    return { message: 'failed' };
  }
};

export const resetPasswordFn = async (id: string, password: string) => {
  try {
    const hashedPassword = await hashPasswordBcrypt(password);
    if (!hashedPassword) return { message: 'Failed to change password' };
    await db
      .update(usersTable)
      .set({ password: hashedPassword })
      .where(eq(usersTable.user_id, id));

    return { message: 'Password changed successfully' };
  } catch (error) {
    console.log(error);

    return { message: 'Failed to change password' };
  }
};

export const createOrder = async (id: string, amount: number) => {
  try {
    const createdOrder = await db
      .insert(orders)
      .values({ customerId: id, totalAmount: amount.toString() })
      .returning();
    if (createdOrder) {
      const cartItems = await db.query.cartTable.findMany({
        where: eq(cartTable?.userId, id),
      });
      if (cartItems) {
        const createOrderItem = async (item: {
          productId: number | null;
          id: number;
          userId: string | null;
          quantity: string | null;
        }) => {
          await db.insert(orderItems).values({
            quantity: item.quantity!,
            productId: item.productId,
            orderId: createdOrder[0].id,
          });
        };
        cartItems.forEach((item) => createOrderItem(item));
        await db.delete(cartTable).where(eq(cartTable.userId, id));
        revalidatePath('/', 'layout');
        return { message: 'success' };
      } else {
        return { message: 'failed' };
      }
    } else {
      return { message: 'failed' };
    }
  } catch (error) {
    console.log('error', error);
    return { message: 'failed' };
  }
};
