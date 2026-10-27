'use client';

import { useTranslations } from 'next-intl';
import React from 'react';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

import type { LinkConflict } from './useProLink';

interface Props {
  conflict: LinkConflict | null;
  pending: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

/** "Some items are already in another project. Move them?" — the answer "yes" sends `force`. */
export const LinkConflictDialog = ({ conflict, pending, onConfirm, onCancel }: Props) => {
  const t = useTranslations();

  return (
    <AlertDialog open={!!conflict} onOpenChange={(open) => !open && onCancel()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className='text-xl leading-[26px] font-bold'>
            {t('Move items question')}
          </AlertDialogTitle>
          <AlertDialogDescription className='text-sm leading-5 text-[#4A5563]'>
            {conflict?.count
              ? t('Items in other project', { count: conflict.count })
              : t('Some items in other project')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className='h-11 px-5'>{t('No')}</AlertDialogCancel>
          <Button className='h-11 px-5' isLoading={pending} onClick={onConfirm}>
            {t('Yes, move')}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
