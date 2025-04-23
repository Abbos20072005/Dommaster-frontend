'use client';

import { useTranslations } from 'next-intl';
import React from 'react';

import { AuthDialog } from '@/components/modules/auth';
import { useCart } from '@/components/modules/cart';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { useRouter } from '@/i18n/navigation';
import { formatPrice } from '@/lib/utils';
import { useAuth } from '@/utils/stores';

export const CartCalculation = () => {
  const t = useTranslations();
  const { user } = useAuth();
  const { cart, availableCartItems, isFetching } = useCart();
  const router = useRouter();

  return (
    <Card className='sticky top-20' variant='outline'>
      <CardHeader className='p-4'>
        <CardTitle>{t('Your order')}</CardTitle>
      </CardHeader>
      <CardContent className='space-y-2 p-4 pt-0'>
        {!!cart?.cart_items.length && (
          <div className='align-center flex justify-between gap-1 text-sm'>
            <p>
              {t('Goods')} ({availableCartItems.length}):
            </p>
            <span>
              {formatPrice(cart.products_total_price)} {t('som')}
            </span>
          </div>
        )}
        {!!cart?.saved_price && (
          <div className='align-center flex justify-between gap-1 text-sm'>
            <p>{t('Your benefit')}</p>
            <p className='text-secondary'>
              -{formatPrice(cart.saved_price)} {t('som')}
            </p>
          </div>
        )}
        <div className='align-center flex justify-between gap-1 text-xl font-bold'>
          <p>{t('Total')}</p>
          <p>
            {formatPrice(cart?.total_price ?? 0)} {t('som')}
          </p>
        </div>
      </CardContent>
      <CardFooter className='p-4 pt-0'>
        {user ? (
          <Button
            className='w-full'
            disabled={!availableCartItems.length || isFetching}
            onClick={() => router.push('/checkout')}
          >
            {isFetching ? <Spinner /> : t('Proceed to checkout')}
          </Button>
        ) : (
          <AuthDialog asChild>
            <Button className='w-full' disabled={!availableCartItems.length || isFetching}>
              {isFetching ? <Spinner /> : t('Proceed to checkout')}
            </Button>
          </AuthDialog>
        )}
      </CardFooter>
    </Card>
  );
};
