import { z } from 'zod';

const PHONE_NUMBER_REGEX = /^\+998\d{9}$/;

export const registerFormSchema = z.object({
  full_name: z.string().min(1, 'Full name is required'),
  phone_number: z
    .string()
    .min(1, 'Phone number is required')
    .regex(PHONE_NUMBER_REGEX, 'Invalid phone number'),
  email: z.string().min(1, 'Fill the required field').email('Invalid email'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(4, 'Password must be at least 8 characters long')
});

export type RegisterFormSchema = z.infer<typeof registerFormSchema>;
