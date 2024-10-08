'use client';

import { Box, Flex, SimpleGrid, useToast } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { registerSchema } from '@/validators';
import { CustomButton } from '@/components/CustomButton';
import { AuthHeader } from '@/components/AuthHeader';

import { register } from '@/db/mutations';
import { ValidateInput } from '@/components/ValidateInput';
type Props = {};

export const RegisterForm = ({}: Props): JSX.Element => {
  const toast = useToast();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm<z.infer<typeof registerSchema>>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
    },
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    try {
      // @ts-ignore
      const res = await register({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
      });

      if (res?.message === 'Failed to create profile') {
        toast({
          title: 'Error',
          description: 'Failed to create profile',
          status: 'error',
          isClosable: true,
          duration: 9000,
          position: 'top-right',
        });
        return;
      }
      if (res?.message === 'Profile already exists') {
        toast({
          title: 'User already exists',
          description: 'Please use a different email',
          status: 'error',
          isClosable: true,
          duration: 9000,
          position: 'top-right',
        });
        return;
      }

      toast({
        title: 'Account has been created successfully',
        description: 'Please check your email to verify your account',
        status: 'success',
        isClosable: true,
        duration: 9000,
        position: 'top-right',
      });
      reset();
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
    <Flex mt={{ base: 150, md: 100 }} pb={50}>
      <Flex
        width={{ base: '90%', md: '70%', lg: '70%' }}
        mx="auto"
        justifyContent={'center'}
        flexDir={'column'}
      >
        <AuthHeader
          type="Sign up"
          href="/sign-in"
          text="Already have an account? Log in"
        />

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

            <ValidateInput
              label="Password"
              control={control}
              errors={errors}
              name={'password'}
              placeholder="Enter a password"
            />
            <ValidateInput
              label="Confirm password"
              control={control}
              errors={errors}
              name={'confirmPassword'}
              placeholder="Confirm your password"
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
          </Box>
        </SimpleGrid>
        <Flex width={'100%'} justifyContent={'center'}>
          <CustomButton
            title="Sign up"
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
