import { getOrderItems } from '@/db/queries';
import { SelectOrderItem } from '@/db/schema';
import { useEffect, useState } from 'react';

export const useGetOrderItems = (orderId: number) => {
  const [items, setItems] = useState<SelectOrderItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const getItems = async () => {
      const items = await getOrderItems(orderId);
      setItems(items);
      setLoading(false);
    };
    getItems();
  }, [orderId]);

  return { items, loading };
};
