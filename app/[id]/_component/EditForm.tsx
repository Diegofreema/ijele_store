'use client';

import { AuthHeader } from '@/components/AuthHeader';
import { CustomButton } from '@/components/CustomButton';
import { ValidateInput } from '@/components/ValidateInput';
import { update } from '@/db/mutations';
import { SelectUser } from '@/db/schema';
import { updateSchema } from '@/validators';

import { Box, Flex, SimpleGrid, useToast } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
type Props = {
  user: SelectUser | null;
};

export const EditForm = ({ user }: Props): JSX.Element => {
  const toast = useToast();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm<z.infer<typeof updateSchema>>({
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
    },
    resolver: zodResolver(updateSchema),
  });

  useEffect(() => {
    if (user) {
      setValue('email', user?.email);
      setValue('firstName', user?.firstName);
      setValue('lastName', user?.lastName);
      setValue('phoneNumber', user?.phoneNumber || '');
    }
  }, [user, setValue]);

  const onSubmit = async (data: z.infer<typeof updateSchema>) => {
    try {
      const res = await update(
        {
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          phoneNumber: data.phoneNumber,
        },
        user?.user_id!
      );

      if (res?.error === 'Failed to update') {
        console.log(res?.error);
        toast({
          title: 'Error',
          description: 'Failed to update profile',
          status: 'error',
          isClosable: true,
          duration: 9000,
          position: 'top-right',
        });
        return;
      }
      toast({
        title: 'Success',
        description: 'Account has been updated successfully',
        status: 'success',
        isClosable: true,
        duration: 9000,
        position: 'top-right',
      });
    } catch (error) {
      console.log(error);
      toast({
        title: 'Error',
        description: 'Something went wrong, please try again',
        status: 'error',
        isClosable: true,
        duration: 9000,
        position: 'top-right',
      });
    }
  };

  return (
    <Flex mt={{ base: 50, md: 100 }} pb={50}>
      <Flex
        width={{ base: '90%', md: '70%', lg: '70%' }}
        mx="auto"
        justifyContent={'center'}
        flexDir={'column'}
      >
        <AuthHeader type="Edit profile" href="" text="" />

        <SimpleGrid columns={{ base: 1, md: 2 }} gap={5}>
          <Box display={'flex'} flexDir={'column'} gap={5} mt={5}>
            <ValidateInput
              label="Email"
              control={control}
              errors={errors}
              name={'email'}
              placeholder="Enter your email address"
            />
            <ValidateInput
              label="First name"
              control={control}
              errors={errors}
              name={'firstName'}
              placeholder="Enter your first name"
            />
            <ValidateInput
              label="Last name"
              control={control}
              errors={errors}
              name={'lastName'}
              placeholder="Enter your last name"
            />
          </Box>
          <Box display={'flex'} flexDir={'column'} gap={5} mt={5}>
            <ValidateInput
              label="Phone number"
              control={control}
              errors={errors}
              name={'phoneNumber'}
              placeholder="Enter your phone number"
            />

            {/* <ValidateInput
              label="Gender"
              control={control}
              errors={errors}
              type="select"
              data={['Male', 'Female']}
              name={'gender'}
              placeholder="Select a Gender"
            /> */}
          </Box>
        </SimpleGrid>
        <Flex width={'100%'} justifyContent={'center'}>
          <CustomButton
            title="Update"
            loadingText="Updating..."
            onClick={handleSubmit(onSubmit)}
            isLoading={isSubmitting}
            mt={5}
            width={'250px'}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};
