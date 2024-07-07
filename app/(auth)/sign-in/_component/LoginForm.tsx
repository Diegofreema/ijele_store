'use client';

import { Box, Flex, useToast } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'next-view-transitions';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useRouter, useSearchParams } from 'next/navigation';
import { loginSchema } from '@/validators';
import { login } from '@/db/mutations';
import { AuthHeader } from '@/components/AuthHeader';

import { CustomButton } from '@/components/CustomButton';
import { colors } from '@/constants';
import { CustomText } from '@/components/typography';
import { ValidateInput } from '@/components/ValidateInput';
type Props = {};

export const LoginForm = ({}: Props): JSX.Element => {
  const toast = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();

  const prev = searchParams.get('prev');
  const membership = searchParams.get('membership');
  console.log({ prev, membership });

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof loginSchema>>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    console.log(data);
    try {
      const res = await login(data.email, data.password);
      console.log(res);

      if (res?.message === 'User not found') {
        return toast({
          title: 'User not found',
          description: 'Please use a different username or password',
          status: 'error',
          position: 'top-right',
        });
      }
      if (res?.message === 'Invalid credentials') {
        return toast({
          title: 'Error: Invalid credentials',
          description: 'Please use a different username or password',
          status: 'error',
          position: 'top-right',
        });
      }
      if (res?.message === 'Failed to login') {
        return toast({
          title: 'Error',
          description: 'Please try again later, failed to login',
          status: 'error',
          position: 'top-right',
        });
      }
      if (res?.message === 'not verified') {
        return toast({
          title: 'Verify your email address',
          description: 'A verification link was sent to your email address',
          status: 'info',
          position: 'top-right',
        });
      }

      toast({
        title: 'Welcome',
        description: 'Login successfully',
        status: 'success',
        position: 'top-right',
      });

      if (prev) {
        // router.replace(`${prev}?membership=${membership}`);
      } else {
        router.replace('/');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong',
        status: 'error',
        position: 'top-right',
      });
    }
  };
  return (
    <Flex mt={{ base: 120, md: 150 }}>
      <Flex
        width={{ base: '90%', md: '40%' }}
        mx="auto"
        justifyContent={'center'}
        flexDir={'column'}
      >
        <AuthHeader
          type="Login"
          href="/sign-up"
          text="Don’t have an account? Create an account"
        />

        <Box display={'flex'} flexDir={'column'} gap={5} mt={5}>
          <ValidateInput
            label="Email"
            control={control}
            errors={errors}
            name={'email'}
            placeholder="Enter your email address"
          />
          <ValidateInput
            label="Password"
            control={control}
            errors={errors}
            name={'password'}
            placeholder="Enter your password"
            type={'password'}
          />
          <CustomButton
            title="Login"
            onClick={handleSubmit(onSubmit)}
            loading={isSubmitting}
            loadingText="Signing in..."
            bg={colors.darkBlue}
          />
          <Link href="/forgot-password">
            <CustomText
              text="Forgot password?"
              fontWeight={'bold'}
              textDecoration={'underline'}
              textColor={'black'}
            />
          </Link>
        </Box>
      </Flex>
    </Flex>
  );
};
