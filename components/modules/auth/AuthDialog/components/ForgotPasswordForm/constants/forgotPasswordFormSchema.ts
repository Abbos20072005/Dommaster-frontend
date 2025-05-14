import { z } from 'zod';

const PHONE_NUMBER_REGEX = /^\+998\d{9}$/;

export const forgotPasswordFormSchema = z.object({
  phone_number: z
    .string()
    .min(1, 'Fill the required field')
    .regex(PHONE_NUMBER_REGEX, 'Invalid phone number')
});

export type ForgotPasswordFormSchema = z.infer<typeof forgotPasswordFormSchema>;
