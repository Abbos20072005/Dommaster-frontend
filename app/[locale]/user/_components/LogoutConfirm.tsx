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
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useRouter } from '@/i18n/navigation';
import { useAuth } from '@/modules/auth';

/** "Log out" always asks first; nothing is lost, so the confirm button is the primary one. */
export const LogoutConfirm = ({ children }: { children: React.ReactNode }) => {
  const t = useTranslations();
  const router = useRouter();
  const { reset } = useAuth();

  const onLogout = () => {
    reset();
    router.push('/');
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className='text-xl leading-[26px] font-bold'>
            {t('Logout question')}
          </AlertDialogTitle>
          <AlertDialogDescription className='text-sm leading-5 text-[#4A5563]'>
            {t('Logout text')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className='h-11 px-5'>{t('Stay')}</AlertDialogCancel>
          <Button className='h-11 px-5' onClick={onLogout}>
            {t('Log out')}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
