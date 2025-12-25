import { z } from 'zod';

export const questionReplyFormSchema = z.object({
  answer: z.string().min(1, 'Fill the required field')
});

export type QuestionReplyFormSchema = z.infer<typeof questionReplyFormSchema>;
