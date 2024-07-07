import { getOrders } from '@/db/queries';
import { cookies } from 'next/headers';
import { Favorite } from './Favourite';

const Orders = async () => {
  const id = cookies().get('id')?.value;
  const orders = await getOrders(id!);
  return <Favorite orders={orders} />;
};

export default Orders;
