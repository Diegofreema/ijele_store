'use client';
import { SelectUser } from '@/db/schema';
import { useProfileOpen } from '@/lib/zustand/useProfileOpen';
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
import { CustomText } from '../typography';
import { useRouter } from 'next/navigation';
import { colors } from '../../constants';
type Props = {
  user: SelectUser;
};

export const ProfileDrawer = ({ user }: Props): JSX.Element => {
  const { isOpen, onClose } = useProfileOpen();
  const router = useRouter();
  const handleEdit = () => {
    router.push(`/${user.user_id}`);
    onClose();
  };
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Profile</DrawerHeader>

        <DrawerBody
          display={'flex'}
          flexDir={'column'}
          gap={3}
          height={'100%'}
          pt={10}
        >
          <Flex alignItems={'center'} justifyContent={'space-between'}>
            <CustomText textColor="black" fontWeight={500} text="Name" />
            <CustomText
              textColor="black"
              fontWeight={700}
              text={user?.firstName + ' ' + user?.lastName}
            />
          </Flex>
          <Flex alignItems={'center'} justifyContent={'space-between'}>
            <CustomText textColor="black" fontWeight={500} text="Phone" />
            <CustomText
              textColor="black"
              fontWeight={700}
              text={user?.phoneNumber!}
            />
          </Flex>
          <Flex alignItems={'center'} justifyContent={'space-between'}>
            <CustomText textColor="black" fontWeight={500} text="Email" />
            <CustomText
              textColor="black"
              fontWeight={700}
              text={user?.email!}
            />
          </Flex>
        </DrawerBody>

        <DrawerFooter width={'100%'}>
          <Button
            bg={colors.darkBlue}
            mr={3}
            color={'white'}
            onClick={handleEdit}
            width={'100%'}
          >
            Edit
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
