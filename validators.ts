import { z } from 'zod';

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const passwordSchema = z.string().refine((value) => passwordRegex.test(value), {
  message:
    'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
});
export const loginSchema = z.object({
  email: z
    .string()
    .email({ message: 'A valid email is required' })
    .min(1, { message: 'Please enter an  email' }),

  password: passwordSchema,
});

export const resetPassword = z
  .object({
    password: passwordSchema,
    confirmPassword: z
      .string()
      .min(1, { message: 'Confirm Password is required' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const forgotPassword = z.object({
  email: z
    .string()
    .email({ message: 'A valid email is required' })
    .min(1, { message: 'Please enter an  email' }),
});

export const registerSchema = z
  .object({
    email: z
      .string()
      .email({ message: 'A valid email is required' })
      .min(1, { message: 'Please enter an email' }),
    password: passwordSchema,
    firstName: z.string().min(1, { message: 'Please enter your first name' }),
    lastName: z.string().min(1, { message: 'Please enter your last name' }),

    confirmPassword: z
      .string()
      .min(1, { message: 'Confirm Password is required' }),
    phoneNumber: z
      .string()
      .min(1, { message: 'Please enter your phone number' }),
    // country: z.string().min(1, { message: 'Please select a country' }),
    // state: z.string().min(1, { message: 'Please select a state of origin' }),
    // address: z.string().min(1, { message: 'Please enter your address' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const updateSchema = z.object({
  email: z
    .string()
    .email({ message: 'A valid email is required' })
    .min(1, { message: 'Please enter an email' }),

  firstName: z.string().min(1, { message: 'Please enter your first name' }),
  lastName: z.string().min(1, { message: 'Please enter your last name' }),

  phoneNumber: z.string().min(1, { message: 'Please enter your phone number' }),
});
