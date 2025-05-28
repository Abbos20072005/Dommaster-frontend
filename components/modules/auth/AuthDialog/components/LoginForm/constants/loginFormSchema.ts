import { z } from 'zod';

const PHONE_NUMBER_REGEX = /^\+998\d{9}$/;

export const loginFormSchema = (withEmail: boolean) =>
  z.object({
    phone_number: withEmail
      ? z.string().optional()
      : z
          .string()
          .min(1, 'Fill the required field')
          .regex(PHONE_NUMBER_REGEX, 'Invalid phone number'),
    email: withEmail
      ? z.string().min(1, 'Fill the required field').email('Invalid email')
      : z.string().optional(),
    password: z
      .string()
      .min(1, 'Fill the required field')
      .min(4, 'Password must be at least 4 characters long')
  });

export type LoginFormSchema = z.infer<ReturnType<typeof loginFormSchema>>;
