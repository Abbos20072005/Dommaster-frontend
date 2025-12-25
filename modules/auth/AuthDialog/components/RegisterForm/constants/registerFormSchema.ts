import { z } from 'zod';

const PHONE_NUMBER_REGEX = /^\+998\d{9}$/;

export const registerFormSchema = z
  .object({
    full_name: z.string().min(1, 'Fill the required field'),
    phone_number: z
      .string()
      .min(1, 'Fill the required field')
      .regex(PHONE_NUMBER_REGEX, 'Invalid phone number'),
    email: z.string().min(1, 'Fill the required field').email('Invalid email'),
    password: z
      .string()
      .min(1, 'Fill the required field')
      .min(4, 'Password must be at least 4 characters long'),
    confirm_password: z.string().min(1, 'Fill the required field')
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password']
  });

export type RegisterFormSchema = z.infer<typeof registerFormSchema>;
