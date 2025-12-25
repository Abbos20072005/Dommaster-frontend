import { z } from 'zod';

export const questionFormSchema = z.object({
  question: z.string().min(1, 'Fill the required field')
});

export type QuestionFormSchema = z.infer<typeof questionFormSchema>;
