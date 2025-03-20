import { z } from 'zod';

const PHONE_NUMBER_REGEX = /^\+998\d{9}$/;

export const registerFormSchema = z
  .object({
    phone_number: z
      .string()
      .min(1, 'Phone number is required')
      .regex(PHONE_NUMBER_REGEX, 'Invalid phone number'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must be at least 8 characters long'),
    password_confirm: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must be at least 8 characters long')
  })
  .refine(
    (data) => data.password === data.password_confirm,
    () => ({
      message: 'Passwords do not match',
      path: ['password_confirm']
    })
  );

export type RegisterFormSchema = z.infer<typeof registerFormSchema>;
