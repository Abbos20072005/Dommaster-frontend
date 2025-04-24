import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { patchQuestionById, postQuestion } from '@/utils/api/requests';

import type { QuestionFormSchema } from '../constants';

import { questionFormSchema } from '../constants';

interface Props {
  defaultValues?: ProductQuestion;
  onSuccess?: (data: ProductQuestionResponse) => void;
}

export const useQuestionForm = ({ onSuccess, defaultValues }: Props) => {
  const isEdit = !!defaultValues;
  const { id } = useParams<{ id: string }>();
  const form = useForm<QuestionFormSchema>({
    resolver: zodResolver(questionFormSchema),
    defaultValues: {
      question: defaultValues?.question ?? ''
    }
  });

  const queryClient = useQueryClient();
  const postQuestionMutation = useMutation({
    mutationFn: postQuestion,
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ['productQuestions'] });
      queryClient.invalidateQueries({ queryKey: ['myQuestions'] });
      onSuccess?.(data);
    }
  });

  const patchQuestionMutation = useMutation({
    mutationFn: patchQuestionById,
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ['productQuestions'] });
      queryClient.invalidateQueries({ queryKey: ['myQuestions'] });
      onSuccess?.(data);
    }
  });

  const onSubmit = (data: QuestionFormSchema) => {
    isEdit
      ? patchQuestionMutation.mutate({ id: defaultValues.id, data })
      : postQuestionMutation.mutate({ data, config: { params: { product_id: id } } });
  };

  return {
    form,
    state: {
      isPending: postQuestionMutation.isPending || patchQuestionMutation.isPending
    },
    functions: {
      onSubmit
    }
  };
};
