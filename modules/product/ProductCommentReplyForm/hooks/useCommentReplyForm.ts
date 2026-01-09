import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { patchCommentReplyById, postCommentReply } from '@/utils/api/requests';

import type { CommentReplyFormSchema } from '../constants';

import { commentReplyFormSchema } from '../constants';

interface Props {
  commentId: number;
  defaultValues?: ProductCommentReply;
  onSuccess?: (data: ProductCommentReplyResponse) => void;
}

export const useCommentReplyForm = ({ onSuccess, commentId, defaultValues }: Props) => {
  const isEdit = !!defaultValues;
  const form = useForm<CommentReplyFormSchema>({
    resolver: zodResolver(commentReplyFormSchema),
    defaultValues: {
      reply_comment: defaultValues?.reply_comment ?? ''
    }
  });

  const queryClient = useQueryClient();

  const postCommentReplyMutation = useMutation({
    mutationFn: postCommentReply,
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ['productComments'] });
      onSuccess?.(data);
    },
    meta: {
      invalidatesQuery: ['productCommentReplies', commentId]
    }
  });

  const patchCommentReplyMutation = useMutation({
    mutationFn: patchCommentReplyById,
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ['productComments'] });
      onSuccess?.(data);
    },
    meta: {
      invalidatesQuery: ['productCommentReplies', commentId]
    }
  });

  const onSubmit = (data: CommentReplyFormSchema) => {
    isEdit
      ? patchCommentReplyMutation.mutate({ id: defaultValues.id, data })
      : postCommentReplyMutation.mutate({ commentId, data });
  };

  return {
    form,
    state: {
      isPending: postCommentReplyMutation.isPending || patchCommentReplyMutation.isPending
    },
    functions: {
      onSubmit
    }
  };
};
