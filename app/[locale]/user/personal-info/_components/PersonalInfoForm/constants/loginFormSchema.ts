import { z } from 'zod';

const PHONE_NUMBER_REGEX = /^\+998\d{9}$/;

export const personalInfoFormSchema = z.object({
  full_name: z.string().min(1, 'First name is required'),
  phone_number: z
    .string()
    .min(1, 'Fill the required field')
    .regex(PHONE_NUMBER_REGEX, 'Invalid phone number'),
  email: z.string().email('Invalid email address')
});

export type PersonalInfoFormSchema = z.infer<typeof personalInfoFormSchema>;
