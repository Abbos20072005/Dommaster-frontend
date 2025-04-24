import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { patchCommentById, postComment } from '@/utils/api/requests';

import type { CommentFormSchema } from '../constants';

import { commentFormSchema } from '../constants';

interface Props {
  defaultValues?: ProductComment;
  onSuccess?: (data: ProductCommentResponse) => void;
}

export const useCommentForm = ({ onSuccess, defaultValues }: Props) => {
  const isEdit = !!defaultValues;
  const { id } = useParams<{ id: string }>();
  const form = useForm<CommentFormSchema>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: {
      product_rating: defaultValues?.product_rating ?? undefined,
      comment: defaultValues?.comment ?? ''
    }
  });

  const queryClient = useQueryClient();
  const postCommentMutation = useMutation({
    mutationFn: postComment,
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ['productComments'] });
      queryClient.invalidateQueries({ queryKey: ['myComments'] });
      onSuccess?.(data);
    }
  });

  const patchCommentMutation = useMutation({
    mutationFn: patchCommentById,
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ['productComments'] });
      queryClient.invalidateQueries({ queryKey: ['myComments'] });
      onSuccess?.(data);
    }
  });

  const onSubmit = (data: CommentFormSchema) => {
    isEdit
      ? patchCommentMutation.mutate({ id: defaultValues.id, data })
      : postCommentMutation.mutate({ data, config: { params: { product_id: id } } });
  };

  return {
    form,
    state: {
      isPending: postCommentMutation.isPending || patchCommentMutation.isPending
    },
    functions: {
      onSubmit
    }
  };
};
