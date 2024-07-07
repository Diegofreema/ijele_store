'use client';
import { ProductInCartType } from '@/hooks/useGetCart';
import { useCartOpen } from '@/lib/zustand/useCartOpen';
import { PaystackConsumer } from 'react-paystack';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Badge,
  SimpleGrid,
  Box,
  Image,
  Flex,
  Spinner,
  Heading,
  useToast,
} from '@chakra-ui/react';
import { CustomText } from '../typography';
import { Minus, Plus } from 'lucide-react';
import { colors } from '@/constants';
import { useDecrease, useIncrease } from '@/hooks/useControl';
import { Suspense, useCallback, useReducer } from 'react';
import { SelectUser } from '@/db/schema';
type Props = {
  cartItems: ProductInCartType[];
  user: SelectUser | null;
};

export const Cart = ({ cartItems, user }: Props): JSX.Element => {
  const { isOpen, onClose } = useCartOpen();
  const toast = useToast();
  const totalPrice = cartItems.reduce((accumulator, item) => {
    return (
      accumulator + Number(item?.cart?.quantity) * Number(item?.products?.price)
    );
  }, 0);
  const onSuccess = useCallback(async () => {
    toast({
      title: 'Processing',
      description: `Please be patient...`,
      status: 'loading',
      position: 'top-right',
    });
    // const { message } = await onSub(user.user_id, singleMember?.type as any);
  }, [toast]);

  const onCloseFn = useCallback(() => {
    toast({
      title: 'Oops!',
      description: `You cancelled the transaction`,
      status: 'info',
      position: 'top-right',
    });
  }, [toast]);

  const config = {
    reference: new Date().getTime().toString(),
    email: user?.email!,
    amount: totalPrice! * 100,
    publicKey: 'pk_test_52f4b5b31fa901229f5d3e2a1641d7477aacf092',
  };

  const componentProps = {
    ...config,
    text: 'Register',
    onSuccess: () => onSuccess(),
    onClose: () => onCloseFn(),
  };

  const totalProductInCart = cartItems?.length;
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          <Flex alignItems={'center'} gap={2}>
            My Cart
            <Badge bg={colors.darkBlue} color="white" borderRadius={50}>
              {totalProductInCart}
            </Badge>
          </Flex>
        </DrawerHeader>

        <DrawerBody gap={5} height={'100%'} pt={10}>
          <Flex
            height={'100%'}
            width="100%"
            flexDirection={'column'}
            gap={6}
            overflowY={'auto'}
          >
            <Flex width="100%" justifyContent={'center'}>
              {!cartItems && <Spinner size="xl" color="green" />}
            </Flex>
            {cartItems?.length > 0 &&
              cartItems?.map((product) => (
                <Suspense key={product?.cart?.id} fallback="Loading...">
                  <CartItem product={product} key={product.cart?.id} />
                </Suspense>
              ))}

            {!cartItems.length && (
              <Heading textAlign={'center'}>No item in cart</Heading>
            )}
          </Flex>
        </DrawerBody>

        <DrawerFooter width="100%">
          <Flex
            justifyContent={'space-between'}
            alignItems={'center'}
            width="100%"
          >
            <CustomText
              text={`Total: ₦${totalPrice || 0}`}
              textColor="black"
              fontWeight={'bold'}
            />
            <PaystackConsumer {...componentProps}>
              {({ initializePayment }) => (
                <button
                  className="w-full bg-[#e9c365] text-white rounded-md "
                  onClick={() => {
                    initializePayment(onSuccess, onClose);
                  }}
                >
                  Checkout
                </button>
              )}
            </PaystackConsumer>
          </Flex>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

const CartItem = ({ product }: { product: ProductInCartType }) => {
  const { handleIncrease, isLoading } = useIncrease(product?.cart?.productId!);
  const { handleDecrease, isLoading: loading } = useDecrease(
    product?.cart?.productId!
  );

  const disabled = isLoading || loading;
  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} gap={5}>
      <Box borderRadius={10} overflow={'hidden'}>
        <Image
          alt="image"
          src={product?.products?.imagePath}
          width="100%"
          height={200}
          objectFit={'cover'}
        />
      </Box>
      <Box
        display={'flex'}
        flexDirection={'column'}
        gap={5}
        height="100%"
        position="relative"
      >
        <Flex justifyContent={'space-between'} alignItems={'center'}>
          <CustomText
            text={product?.products?.name!}
            textColor="black"
            fontWeight={'700'}
            fontSize={17}
          />
          <CustomText
            text={`₦${product?.products?.price!}`}
            textColor="black"
            fontWeight={'700'}
            fontSize={17}
          />
        </Flex>
        <Flex justifyContent={'space-between'} alignItems={'center'}>
          <CustomText
            text={'Quantity'}
            textColor="black"
            fontWeight={'700'}
            fontSize={12}
          />
          <CustomText
            text={product?.cart?.quantity!}
            textColor="black"
            fontWeight={'700'}
            fontSize={15}
          />
        </Flex>
        <Flex
          position={'absolute'}
          bottom={0}
          bg={colors.darkBlue}
          borderRadius={50}
          gap={4}
          width={120}
          justifyContent={'center'}
          py={2}
          mt="auto"
        >
          <Button
            bg="transparent"
            leftIcon={<Minus color="white" />}
            onClick={handleDecrease}
            isDisabled={disabled}
            _hover={{ backgroundColor: '' }}
            _pressed={{ bg: '', opacity: 1 }}
            backgroundColor={'transparent'}
          />
          <Button
            bg="transparent"
            title=""
            leftIcon={<Plus color="white" />}
            onClick={handleIncrease}
            isDisabled={disabled}
            _hover={{ backgroundColor: '' }}
            _pressed={{ bg: '', opacity: 1 }}
            backgroundColor={'transparent'}
          />
        </Flex>
      </Box>
    </SimpleGrid>
  );
};
