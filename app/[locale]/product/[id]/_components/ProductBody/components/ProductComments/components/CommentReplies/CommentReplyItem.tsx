import { useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { EditIcon, Trash2Icon, TrashIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { ProductCommentReplyForm } from '@/modules/product';
import { deleteCommentReplyById } from '@/utils/api/requests';
import { useAuth } from '@/utils/stores';

interface Props {
  comment: ProductComment;
  reply: ProductCommentReply;
}

export const CommentReplyItem = ({ reply, comment }: Props) => {
  const t = useTranslations();
  const { user } = useAuth();
  const [openReplyForm, setOpenReplyForm] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);

  const deleteCommentReplyMutation = useMutation({
    mutationFn: deleteCommentReplyById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['productCommentReplies', comment.id] });
    }
  });

  const queryClient = useQueryClient();

  const onDelete = () => {
    deleteCommentReplyMutation.mutate({ id: reply.id });
    setOpenDelete(false);
  };

  if (openReplyForm) {
    return (
      <ProductCommentReplyForm
        defaultValues={reply}
        commentId={comment.id}
        onCancel={() => setOpenReplyForm(false)}
        onSuccess={() => setOpenReplyForm(false)}
      />
    );
  }

  return (
    <article key={reply.id} className='space-y-2'>
      <div>
        <div className='mb-1 flex items-center gap-2'>
          <span className='font-bold'>
            {reply.is_admin ? (
              <span className='text-secondary'>Buildex.uz</span>
            ) : (
              reply.customer.full_name
            )}
          </span>
          {!reply.is_admin && user?.id === reply.customer.id && (
            <div className='flex gap-1'>
              <Button size='iconSm' variant='ghost' onClick={() => setOpenReplyForm(true)}>
                <EditIcon />
              </Button>
              <AlertDialog onOpenChange={setOpenDelete} open={openDelete}>
                <AlertDialogTrigger asChild>
                  <Button size='iconSm' variant='ghost' onClick={() => setOpenDelete(true)}>
                    <Trash2Icon />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <div className='bg-destructive/15 rounded-xl p-2'>
                      <TrashIcon className='text-destructive size-8' />
                    </div>
                    <AlertDialogTitle>{t('Delete reply')}</AlertDialogTitle>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>{t('Cancel')}</AlertDialogCancel>
                    <Button
                      disabled={deleteCommentReplyMutation.isPending}
                      size='sm'
                      variant='destructive'
                      onClick={onDelete}
                    >
                      <Spinner show={deleteCommentReplyMutation.isPending} />
                      {t('Delete')}
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
        </div>
        <div className='flex'>
          <span className='text-muted-foreground text-xs italic'>
            {format(reply.created_at, 'dd MMMM yyyy')}
          </span>
        </div>
      </div>
      <p className='text-sm'>{reply.reply_comment}</p>
    </article>
  );
};
