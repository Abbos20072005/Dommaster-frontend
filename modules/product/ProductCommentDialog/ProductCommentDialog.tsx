'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import React from 'react';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
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
import { deleteCommentById } from '@/utils/api/requests';

import { CommentForm } from './components';

interface Props extends React.ComponentProps<typeof DialogTrigger> {
  children: React.ReactNode;
  defaultValues?: ProductComment;
  /** the product to review when the dialog is not on the product page */
  productId?: number;
}

export const ProductCommentDialog = ({ children, defaultValues, productId, ...props }: Props) => {
  const t = useTranslations();
  const [open, setOpen] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);

  const deleteCommentMutation = useMutation({
    mutationFn: deleteCommentById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['productComments'] });
      queryClient.invalidateQueries({ queryKey: ['myComments'] });
    }
  });

  const queryClient = useQueryClient();

  const onDelete = () => {
    if (!defaultValues?.id) return;
    deleteCommentMutation.mutate({ id: defaultValues?.id });
    setOpen(false);
    setOpenDelete(false);
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger {...props}>{children}</DialogTrigger>
      <DialogContent hideCloseButton>
        <DialogHeader className='flex-row items-center justify-between'>
          <DialogTitle className='text-xl leading-[26px] font-bold'>
            {t('Write a review')}
          </DialogTitle>
          {defaultValues && (
            <AlertDialog onOpenChange={setOpenDelete} open={openDelete}>
              <AlertDialogTrigger asChild>
                <Button size='sm' variant='outline'>
                  {t('Delete comment')}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className='text-xl leading-[26px] font-bold'>
                    {t('Delete review question')}
                  </AlertDialogTitle>
                  <AlertDialogDescription className='text-sm leading-5 text-[#4A5563]'>
                    {t('Delete review text')}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className='h-11 px-5'>{t('Cancel')}</AlertDialogCancel>
                  <Button
                    className='h-11 px-5'
                    variant='destructive'
                    isLoading={deleteCommentMutation.isPending}
                    onClick={onDelete}
                  >
                    {t('Delete')}
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </DialogHeader>
        <CommentForm
          defaultValues={defaultValues}
          productId={productId}
          onSuccess={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};
