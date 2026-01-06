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
import { useAuth } from '@/modules/auth';
import { ProductQuestionReplyForm } from '@/modules/product';
import { deleteQuestionReplyById } from '@/utils/api/requests';

interface Props {
  question: ProductQuestion;
  reply: ProductQuestionReply;
}

export const QuestionReplyItem = ({ reply, question }: Props) => {
  const t = useTranslations();
  const { user } = useAuth();
  const [openReplyForm, setOpenReplyForm] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);

  const deleteQuestionReplyMutation = useMutation({
    mutationFn: deleteQuestionReplyById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['productQuestionReplies', question.id] });
    }
  });

  const queryClient = useQueryClient();

  const onDelete = () => {
    deleteQuestionReplyMutation.mutate({ id: reply.id });
    setOpenDelete(false);
  };

  if (openReplyForm) {
    return (
      <ProductQuestionReplyForm
        defaultValues={reply}
        onCancel={() => setOpenReplyForm(false)}
        onSuccess={() => setOpenReplyForm(false)}
        questionId={question.id}
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
                      size='sm'
                      variant='destructive'
                      isLoading={deleteQuestionReplyMutation.isPending}
                      onClick={onDelete}
                    >
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
      <p className='text-sm'>{reply.answer}</p>
    </article>
  );
};
