'use client';

import { useTranslations } from 'next-intl';
import React from 'react';

import { AuthWrapper, DeleteAccountButton, useCanDeleteAccount } from '@/modules/auth';

/**
 * What is deleted and what stays, and the button. A visitor who is not logged in is asked to log
 * in first (the deletion needs the customer's token); if the admin switched the button off, the
 * page gives the contacts of the support instead.
 */
export const DeleteAccountPanel = () => {
  const t = useTranslations();
  const canDelete = useCanDeleteAccount();

  return (
    <div className='space-y-4 text-[15px] leading-7'>
      <p>{t('Delete account page intro')}</p>
      <p className='text-muted-foreground'>{t('Delete account page kept')}</p>
      <AuthWrapper>
        {canDelete ? (
          <DeleteAccountButton className='h-11 px-5' />
        ) : (
          <p className='font-medium'>{t('Delete account page support')}</p>
        )}
      </AuthWrapper>
    </div>
  );
};
