import { z } from 'zod';

export const commentReplyFormSchema = z.object({
  reply_comment: z.string().min(1, 'Fill the required field')
});

export type CommentReplyFormSchema = z.infer<typeof commentReplyFormSchema>;
