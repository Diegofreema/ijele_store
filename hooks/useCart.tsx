'use client';

import { addToCart, removeFromCart } from '@/db/mutations';
import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const useCart = (productId: number, qty?: number) => {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();
  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      const { message } = await addToCart({ productId, qty });
      if (message === 'Please login') {
        toast({
          title: 'Please login',
          status: 'info',
          position: 'top-right',
          isClosable: true,
          duration: 5000,
        });
      }
      if (message === 'Error updating cart') {
        toast({
          title: 'Error',
          description: 'Error updating cart',
          status: 'error',
          position: 'top-right',
          isClosable: true,
          duration: 5000,
        });
      }
      if (message === 'Cart updated') {
        toast({
          title: 'Success',
          description: 'Cart updated successfully',
          status: 'success',
          position: 'top-right',
          isClosable: true,
          duration: 5000,
        });
        router.refresh();
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Error updating cart',
        status: 'error',
        position: 'top-right',
        isClosable: true,
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, handleAddToCart };
};

export const useRemoveCart = (productId: number) => {
  const [isRemoving, setIsRemoving] = useState(false);
  const toast = useToast();
  const router = useRouter();
  const handleRemoveFromCart = async () => {
    setIsRemoving(true);
    try {
      const { message } = await removeFromCart(productId);
      if (message === 'Please login') {
        toast({
          title: 'Please login',
          status: 'info',
          position: 'top-right',
          isClosable: true,
          duration: 5000,
        });
      }
      if (message === 'Error updating cart') {
        toast({
          title: 'Error',
          description: 'Error updating cart',
          status: 'error',
          position: 'top-right',
          isClosable: true,
          duration: 5000,
        });
      }
      if (message === 'Cart updated') {
        toast({
          title: 'Success',
          description: 'Cart updated successfully',
          status: 'success',
          position: 'top-right',
          isClosable: true,
          duration: 5000,
        });
        router.refresh();
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Error updating cart',
        status: 'error',
        position: 'top-right',
        isClosable: true,
        duration: 5000,
      });
    } finally {
      setIsRemoving(false);
    }
  };

  return { isRemoving, handleRemoveFromCart };
};
