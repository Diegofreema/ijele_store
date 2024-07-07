'use client';
import { SelectOrder } from '@/db/schema';
import { useFavOpen } from '@/lib/zustand/useFavOpen';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Flex,
} from '@chakra-ui/react';
type Props = {
  orders: SelectOrder[];
};

export const Favorite = ({ orders }: Props): JSX.Element => {
  const { isOpen, onClose } = useFavOpen();

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Orders</DrawerHeader>

        <DrawerBody display={'flex'} flexDir={'column'}></DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Close
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

const OrderItem = ({ order }: { order: SelectOrder }) => {
  return <Flex alignItems={'center'} justifyContent={'space-between'}></Flex>;
};
