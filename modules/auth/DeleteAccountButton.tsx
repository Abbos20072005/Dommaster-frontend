'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import React from 'react';
import { toast } from 'sonner';

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
import { useRouter } from '@/i18n/navigation';
import { deleteAccount, getDeleteButton } from '@/utils/api/requests';

import { useAuth } from './hooks/useAuth';

/** The admin switches the "Delete account" button on and off (`GET base/delete-button/`). */
export const useCanDeleteAccount = () =>
  !!useQuery({ queryKey: ['deleteButton'], queryFn: getDeleteButton, staleTime: 0 }).data?.data
    .result.is_deleted;

/** "Delete account" with the confirmation; after the deletion the customer is logged out. */
export const DeleteAccountButton = ({ className }: { className?: string }) => {
  const t = useTranslations();
  const router = useRouter();
  const { reset } = useAuth();

  // success is the 204 status; a 400 means the account is already gone: the same exit
  const deleteAccountMutation = useMutation({
    mutationFn: deleteAccount,
    onSettled: (_data, error) => {
      const status = (error as { response?: { status?: number } } | null)?.response?.status;
      if (error && status !== 400) return;
      toast.success(t('Account deleted'));
      reset();
      router.push('/');
    }
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className={className} type='button' variant='ghostDestructive'>
          {t('Delete account')}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className='text-xl leading-[26px] font-bold'>
            {t('Delete account question')}
          </AlertDialogTitle>
          <AlertDialogDescription className='text-sm leading-5 text-[#4A5563]'>
            {t('Delete account text')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className='h-11 px-5'>{t('Cancel')}</AlertDialogCancel>
          <Button
            className='h-11 px-5'
            variant='destructive'
            isLoading={deleteAccountMutation.isPending}
            onClick={() => deleteAccountMutation.mutate()}
          >
            {t('Delete')}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
