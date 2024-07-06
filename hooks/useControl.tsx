'use client';

import {
  addToCart,
  decreaseProductInCart,
  increaseProductInCart,
} from '@/db/mutations';
import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const useIncrease = (productId: number) => {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();
  const handleIncrease = async () => {
    setIsLoading(true);
    try {
      const { message } = await increaseProductInCart(productId);
      if (message === 'Please login') {
        toast({
          title: 'Please login',
          status: 'info',
          position: 'top-right',
          isClosable: true,
          duration: 5000,
        });
        router.push('/sign-in');
      }
      if (message === 'failed') {
        toast({
          title: 'Error',
          description: 'Error updating quantity',
          status: 'error',
          position: 'top-right',
          isClosable: true,
          duration: 5000,
        });
      }
      if (message === 'success') {
        toast({
          title: 'Success',
          description: 'quantity updated successfully',
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
        description: 'Error updating quantity',
        status: 'error',
        position: 'top-right',
        isClosable: true,
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, handleIncrease };
};

export const useDecrease = (productId: number) => {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();
  const handleDecrease = async () => {
    setIsLoading(true);
    try {
      const { message } = await decreaseProductInCart(productId);
      if (message === 'Please login') {
        toast({
          title: 'Please login',
          status: 'info',
          position: 'top-right',
          isClosable: true,
          duration: 5000,
        });
        router.push('/sign-in');
      }
      if (message === 'failed') {
        toast({
          title: 'Error',
          description: 'Error updating quantity',
          status: 'error',
          position: 'top-right',
          isClosable: true,
          duration: 5000,
        });
      }
      if (message === 'success') {
        toast({
          title: 'Success',
          description: 'quantity updated successfully',
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
        description: 'Error updating quantity',
        status: 'error',
        position: 'top-right',
        isClosable: true,
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, handleDecrease };
};
