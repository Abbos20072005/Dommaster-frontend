'use client';

import { useTranslations } from 'next-intl';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { useAuth } from '@/utils/stores';

import { AuthDialog } from './AuthDialog';

export const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const t = useTranslations();
  const { user } = useAuth();

  if (user === undefined) {
    return (
      <div className='flex items-center justify-center py-20'>
        <Spinner />
      </div>
    );
  }

  if (user === null) {
    return (
      <Card className='px-4 shadow-none md:p-5 md:shadow-sm'>
        <p className='mb-3 hidden text-2xl font-bold md:block'>{t('Login or register')}</p>
        <p className='max-w-lg text-sm'>
          {t(
            'Login or create an account to view your orders, track your purchase history, manage addresses, and more'
          )}
        </p>
        <div className='flex gap-2 pt-4'>
          <AuthDialog asChild defaultStep='register'>
            <Button>{t('Register')}</Button>
          </AuthDialog>
          <AuthDialog asChild>
            <Button variant='outline'>{t('Login')}</Button>
          </AuthDialog>
        </div>
      </Card>
    );
  }

  return children;
};
