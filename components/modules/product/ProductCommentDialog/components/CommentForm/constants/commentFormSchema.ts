import { z } from 'zod';

export const commentFormSchema = z.object({
  product_rating: z.number({ required_error: 'Fill the required field' }),
  comment: z.string().min(1, 'Fill the required field')
});

export type CommentFormSchema = z.infer<typeof commentFormSchema>;
