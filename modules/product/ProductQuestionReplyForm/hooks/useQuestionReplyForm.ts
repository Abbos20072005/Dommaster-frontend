import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { patchQuestionReplyById, postQuestionReply } from '@/utils/api/requests';

import type { QuestionReplyFormSchema } from '../constants';

import { questionReplyFormSchema } from '../constants';

interface Props {
  defaultValues?: ProductQuestionReply;
  questionId: number;
  onSuccess?: (data: ProductQuestionReplyResponse) => void;
}

export const useQuestionReplyForm = ({ onSuccess, questionId, defaultValues }: Props) => {
  const isEdit = !!defaultValues;
  const form = useForm<QuestionReplyFormSchema>({
    resolver: zodResolver(questionReplyFormSchema),
    defaultValues: {
      answer: defaultValues?.answer ?? ''
    }
  });
  const postQuestionReplyMutation = useMutation({
    mutationFn: postQuestionReply,
    onSuccess: ({ data }) => {
      onSuccess?.(data);
    },
    meta: {
      invalidatesQuery: ['productQuestionReplies', questionId]
    }
  });

  const patchQuestionReplyMutation = useMutation({
    mutationFn: patchQuestionReplyById,
    onSuccess: ({ data }) => {
      onSuccess?.(data);
    },
    meta: {
      invalidatesQuery: ['productQuestionReplies', questionId]
    }
  });

  const onSubmit = (data: QuestionReplyFormSchema) => {
    isEdit
      ? patchQuestionReplyMutation.mutate({ id: defaultValues.id, data })
      : postQuestionReplyMutation.mutate({ questionId, data });
  };

  return {
    form,
    state: {
      isPending: postQuestionReplyMutation.isPending || patchQuestionReplyMutation.isPending
    },
    functions: {
      onSubmit
    }
  };
};
