'use client';
import { SelectOrder, SelectOrderItem } from '@/db/schema';
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
  Spinner,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  IconButton,
  useDisclosure,
  Td,
} from '@chakra-ui/react';
import { format } from 'date-fns';
import { Eye } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { OrderModal } from '../Modal/OrderModal';
import { useEffect, useState } from 'react';
import { getOrderItems } from '@/db/queries';
import { useGetOrderItems } from '@/hooks/useGetOrderItems';
type Props = {
  orders: SelectOrder[];
};

export const Favorite = ({ orders }: Props): JSX.Element => {
  const { isOpen, onClose } = useFavOpen();
  const searchParams = useSearchParams();
  const orderId = Number(searchParams.get('item'));
  const { items, loading } = useGetOrderItems(orderId);
  console.log(orderId);

  const {
    isOpen: isOpenModal,
    onOpen,
    onClose: onCloseModal,
  } = useDisclosure();
  const pathname = usePathname();
  const router = useRouter();

  const showModal = (orderId: number) => {
    router.push(`${pathname}?item=${orderId}`);
    onOpen();
  };
  return (
    <>
      <OrderModal
        isOpen={isOpenModal}
        loading={loading}
        onClose={onCloseModal}
        items={items}
      />
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={'lg'}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Orders</DrawerHeader>

          <DrawerBody gap={5} height={'100%'} pt={10}>
            <Flex
              height={'100%'}
              width="100%"
              flexDirection={'column'}
              gap={6}
              overflowY={'auto'}
            >
              {orders?.length > 0 && (
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Order date</Th>
                      <Th>Status</Th>
                      <Th>id</Th>
                      <Th isNumeric>Total cost</Th>

                      <Th>View</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {orders?.map((order) => {
                      const textColor =
                        order?.status === 'pending'
                          ? 'yellow'
                          : order?.status === 'canceled'
                          ? 'red'
                          : 'green';
                      return (
                        <Tr key={order.id}>
                          <Td>{format(order.orderDate!, 'dd/mm/yy')}</Td>
                          <Td textColor={textColor}>
                            {order?.status?.toLowerCase()}
                          </Td>
                          <Td>{order?.orderId?.slice(0, 12)}...</Td>
                          <Td isNumeric>₦{+order.totalAmount}</Td>
                          <Td>
                            <IconButton
                              aria-label="icon"
                              icon={<Eye />}
                              onClick={() => showModal(order?.id)}
                            />
                          </Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              )}

              {!orders?.length && (
                <Heading textAlign={'center'}>No orders yet</Heading>
              )}
            </Flex>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
