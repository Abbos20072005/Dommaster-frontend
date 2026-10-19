import { z } from 'zod';

const PHONE_NUMBER_REGEX = /^\+998\d{9}$/;

export const loginFormSchema = z.object({
  phone_number: z
    .string()
    .min(1, 'Fill the required field')
    .regex(PHONE_NUMBER_REGEX, 'Invalid phone number'),
  // the customer agrees to the offer and the privacy policy: not checked in advance (BLD-287)
  consent: z.boolean()
});

export type LoginFormSchema = z.infer<typeof loginFormSchema>;
