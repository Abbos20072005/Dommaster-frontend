import { z } from 'zod';

export const verifyFormSchema = z.object({
  otp_code: z.string().min(5, {
    message: 'Your one-time password must be 5 characters.'
  })
});

export type VerifyFormSchema = z.infer<typeof verifyFormSchema>;
