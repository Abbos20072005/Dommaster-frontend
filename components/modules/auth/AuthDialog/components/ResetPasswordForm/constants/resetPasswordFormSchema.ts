import { z } from 'zod';

export const resetPasswordFormSchema = z
  .object({
    new_password: z
      .string()
      .min(1, 'Fill the required field')
      .min(4, 'Password must be at least 4 characters long'),
    confirm_new_password: z.string().min(1, 'Fill the required field')
  })
  .refine((data) => data.new_password === data.confirm_new_password, {
    message: 'Passwords do not match',
    path: ['confirm_password']
  });

export type ResetPasswordFormSchema = z.infer<typeof resetPasswordFormSchema>;
