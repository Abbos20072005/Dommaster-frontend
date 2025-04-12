import { z } from 'zod';

export const securityFormSchema = z
  .object({
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must be at least 8 characters long'),
    passwordConfirm: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must be at least 8 characters long')
  })
  .refine(
    (data) => data.password === data.passwordConfirm,
    () => ({
      message: 'Passwords do not match',
      path: ['passwordConfirm']
    })
  );

export type SecurityFormSchema = z.infer<typeof securityFormSchema>;
