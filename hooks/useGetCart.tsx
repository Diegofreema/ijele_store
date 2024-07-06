'use client';

import { addToFav } from '@/db/mutations';
import { checkIfAddedInCart, getProductInCart } from '@/db/queries';
import { SelectCart, SelectProduct } from '@/db/schema';
import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
export type ProductInCartType = {
  cart: SelectCart;
  products: SelectProduct | null;
};
export const useGetCart = () => {
  const [loading, setLoading] = useState(false);
  const [productInCart, setProductInCart] = useState<ProductInCartType[]>([]);
  const toast = useToast();
  const router = useRouter();
  useEffect(() => {
    const handleGetCart = async () => {
      setLoading(true);
      try {
        const res = await getProductInCart();
        if (res === null) {
          toast({
            title: 'Please login',
            status: 'info',
            position: 'top-right',
            isClosable: true,
            duration: 5000,
          });
          return;
        }
        setProductInCart(res);
        router.refresh();
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Error fetching items in cart',
          status: 'error',
          position: 'top-right',
          isClosable: true,
          duration: 5000,
        });
      } finally {
        setLoading(false);
      }
    };

    handleGetCart();
  }, [router, toast]);

  return { loading, productInCart };
};

export const useIsInCart = (productId: number) => {
  const [loading, setLoading] = useState(false);
  const [inCart, setInCart] = useState(false);
  const fn = useCallback(async () => {
    try {
      const isInCart = await checkIfAddedInCart(productId);
      setInCart(isInCart);
    } catch (error) {
      console.log(error);
      setInCart(false);
    } finally {
      setLoading(false);
    }
  }, [productId]);
  useEffect(() => {
    setLoading(true);

    fn();
  }, [productId, fn]);

  return { loading, inCart, fn };
};
