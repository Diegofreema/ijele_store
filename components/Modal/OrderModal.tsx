import { SelectOrderItem } from '@/db/schema';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Flex,
  Spinner,
  Heading,
  Text,
  Table,
  Th,
  Tr,
  Thead,
  Tbody,
  Td,
} from '@chakra-ui/react';
import { ScrollArea } from '../ui/scroll-area';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  items: SelectOrderItem[];
  loading: boolean;
};
export function OrderModal({ isOpen, onClose, items, loading }: Props) {
  console.log(items, isOpen);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Items</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ScrollArea className="h-[200px] w-full">
              <Flex width="100%" justifyContent={'center'}>
                {loading && <Spinner size="xl" color="green" />}
              </Flex>
              <Table>
                <Thead>
                  <Tr>
                    <Th>Product</Th>
                    <Th>Quantity</Th>
                    <Th>Category</Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {items?.length > 0 &&
                    items?.map((item) => (
                      <Tr key={item.id}>
                        {/* @ts-ignore  */}
                        <Td>{item?.productId?.name}</Td>
                        <Td>{item?.quantity}</Td>
                        {/* @ts-ignore  */}
                        <Td>{item?.productId?.category}</Td>
                      </Tr>
                    ))}
                </Tbody>
              </Table>

              {!items.length && (
                <Heading textAlign={'center'}>No items found</Heading>
              )}
            </ScrollArea>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
