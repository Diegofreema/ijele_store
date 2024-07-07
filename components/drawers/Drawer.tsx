import { getProductInCart, getProfile } from '@/db/queries';
import { Cart } from './Cart';
import { cookies } from 'next/headers';

export const Drawer = async () => {
  const id = cookies().get('id')?.value;
  const cart = getProductInCart();

  const userData = getProfile(id!);
  const [cartItems, user] = await Promise.all([cart, userData]);
  return <Cart cartItems={cartItems} user={user} />;
};
