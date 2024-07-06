import { getProductInCart } from '@/db/queries';
import { Cart } from './Cart';

export const Drawer = async () => {
  const cartItems = await getProductInCart();
  return <Cart cartItems={cartItems} />;
};
