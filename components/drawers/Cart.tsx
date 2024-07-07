'use client';
import { ProductInCartType } from '@/hooks/useGetCart';
import { useCartOpen } from '@/lib/zustand/useCartOpen';
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
} from '@chakra-ui/react';
import { CustomText } from '../typography';
import { Minus, Plus } from 'lucide-react';
import { colors } from '@/constants';
import { useDecrease, useIncrease } from '@/hooks/useControl';
type Props = {
  cartItems: ProductInCartType[];
};

export const Cart = ({ cartItems }: Props): JSX.Element => {
  const { isOpen, onClose } = useCartOpen();

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
          <Flex height={'100%'} width="100%" flexDirection={'column'} gap={6}>
            <Flex width="100%" justifyContent={'center'}>
              {!cartItems && <Spinner size="xl" color="green" />}
            </Flex>
            {cartItems?.length > 0 &&
              cartItems?.map((product) => (
                <CartItem product={product} key={product.cart?.id} />
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
            <CustomText text={`Total`} textColor="black" fontWeight={'bold'} />
            <Button
              variant="outline"
              mr={3}
              onClick={onClose}
              bg={colors.darkBlue}
              color="white"
            >
              Checkout
            </Button>
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
