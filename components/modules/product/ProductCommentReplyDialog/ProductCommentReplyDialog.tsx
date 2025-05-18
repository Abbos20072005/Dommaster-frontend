'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TrashIcon } from 'lucide-react';
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Spinner } from '@/components/ui/spinner';
import { deleteCommentReplyById } from '@/utils/api/requests';

import { ProductCommentReplyForm } from './components';

interface Props extends React.ComponentProps<typeof DialogTrigger> {
  children: React.ReactNode;
  commentId: number;
  defaultValues?: ProductCommentReply;
}

export const ProductCommentReplyDialog = ({
  children,
  commentId,
  defaultValues,
  ...props
}: Props) => {
  const t = useTranslations();
  const [open, setOpen] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);

  const deleteCommentReplyMutation = useMutation({
    mutationFn: deleteCommentReplyById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['productCommentReplyReplies'] });
      queryClient.invalidateQueries({ queryKey: ['myCommentReplies'] });
    }
  });

  const queryClient = useQueryClient();

  const onDelete = () => {
    if (!defaultValues?.id) return;
    deleteCommentReplyMutation.mutate({ id: defaultValues?.id });
    setOpen(false);
    setOpenDelete(false);
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger {...props}>{children}</DialogTrigger>
      <DialogContent hideCloseButton>
        <DialogHeader className='flex-row items-center justify-between'>
          <DialogTitle>{t('Write a review')}</DialogTitle>
          {defaultValues && (
            <AlertDialog onOpenChange={setOpenDelete} open={openDelete}>
              <AlertDialogTrigger asChild>
                <Button size='sm' variant='outline'>
                  {t('Delete reply')}
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
          )}
        </DialogHeader>
        <ProductCommentReplyForm
          defaultValues={defaultValues}
          commentId={commentId}
          onSuccess={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};
