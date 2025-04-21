'use client';

import { useTranslations } from 'next-intl';
import React from 'react';

import { AuthDialog } from '@/components/modules/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@/i18n/navigation';
import { formatPrice } from '@/lib/utils';
import { useAuth, useCart } from '@/utils/stores';

export const CartCalculation = () => {
  const t = useTranslations();
  const { user } = useAuth();
  const { cart, overallPrice, overallPriceWithDiscount, overallBenefit } = useCart();

  return (
    <Card className='sticky top-20' variant='outline'>
      <CardHeader className='p-4'>
        <CardTitle>{t('Your order')}</CardTitle>
      </CardHeader>
      <CardContent className='space-y-2 p-4 pt-0'>
        {!!cart?.cart_items.length && (
          <div className='align-center flex justify-between gap-1 text-sm'>
            <p>
              {t('Goods')} ({cart?.cart_items.length}):
            </p>
            <span>
              {formatPrice(overallPrice)} {t('som')}
            </span>
          </div>
        )}
        {!!overallBenefit && (
          <div className='align-center flex justify-between gap-1 text-sm'>
            <p>{t('Your benefit')}</p>
            <p className='text-secondary'>
              -{formatPrice(overallBenefit)} {t('som')}
            </p>
          </div>
        )}
        <div className='align-center flex justify-between gap-1 text-xl font-bold'>
          <p>{t('Total')}</p>
          <p>
            {formatPrice(overallPriceWithDiscount)} {t('som')}
          </p>
        </div>
      </CardContent>
      <CardFooter className='p-4 pt-0'>
        {user ? (
          cart?.cart_items.length ? (
            <Button asChild className='w-full'>
              <Link href='/checkout'>{t('Proceed to checkout')}</Link>
            </Button>
          ) : (
            <Button disabled className='w-full'>
              {t('Proceed to checkout')}
            </Button>
          )
        ) : (
          <AuthDialog asChild>
            <Button className='w-full'>{t('Proceed to checkout')}</Button>
          </AuthDialog>
        )}
      </CardFooter>
    </Card>
  );
};
