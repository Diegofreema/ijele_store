import { getOrderItems, getOrders } from '@/db/queries';
import { cookies } from 'next/headers';
import { Favorite } from './Favourite';

const Orders = async () => {
  const id = cookies().get('id')?.value;
  console.log(id);

  const orders = await getOrders(id!);
  console.log(orders);

  return <Favorite orders={orders} />;
};

export default Orders;
