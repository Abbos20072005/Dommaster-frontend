import { z } from 'zod';

export const commentFormSchema = z.object({
  product_rating: z.number({ required_error: 'Fill the required field' }),
  comment: z.string().min(1, 'Fill the required field'),
  images: z
    .array(
      z.custom<File>((val) => val instanceof File, {
        message: 'Expected an image'
      })
    )
    .max(5, 'Please select up to 5 files')
    .refine((files) => files.every((file) => file.size <= 5 * 1024 * 1024), {
      message: 'File size must be less than 5MB',
      path: ['images']
    })
});

export type CommentFormSchema = z.infer<typeof commentFormSchema>;
