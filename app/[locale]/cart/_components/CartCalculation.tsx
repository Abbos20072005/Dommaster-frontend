'use client';

import { useTranslations } from 'next-intl';
import React from 'react';

import { AuthDialog } from '@/components/modules/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@/i18n/navigation';
import { useAuth } from '@/utils/stores';

export const CartCalculation = () => {
  const t = useTranslations();
  const { user } = useAuth();

  return (
    <Card className='sticky top-20' variant='outline'>
      <CardHeader className='p-4'>
        <CardTitle>{t('Your order')}</CardTitle>
      </CardHeader>
      <CardContent className='space-y-2 p-4 pt-0'>
        <div className='align-center flex justify-between gap-1 text-sm'>
          <p>{t('Goods')} (2):</p>
          <span>60 000 {t('som')}</span>
        </div>
        <div className='align-center flex justify-between gap-1 text-sm'>
          <p>{t('Your benefit')}</p>
          <p className='text-secondary'>-12 000 {t('som')}</p>
        </div>
        <div className='align-center flex justify-between gap-1 text-xl font-bold'>
          <p>{t('Total')}</p>
          <p>48 000 {t('som')}</p>
        </div>
      </CardContent>
      <CardFooter className='p-4 pt-0'>
        {user ? (
          <Button asChild className='w-full'>
            <Link href='/checkout'>{t('Proceed to checkout')}</Link>
          </Button>
        ) : (
          <AuthDialog asChild>
            <Button className='w-full'>{t('Proceed to checkout')}</Button>
          </AuthDialog>
        )}
      </CardFooter>
    </Card>
  );
};
