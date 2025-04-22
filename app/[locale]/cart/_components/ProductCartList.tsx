'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import React from 'react';

import { useCart } from '@/components/modules/cart';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Link } from '@/i18n/navigation';
import { patchCart, postCartBulk } from '@/utils/api/requests';

import { ProductCartItem } from './ProductCartItem';

export const ProductCartList = () => {
  const t = useTranslations();

  const { cart, isLoading } = useCart();

  const isAllChecked = cart?.cart_items.every((item) => item.is_checked);

  const queryClient = useQueryClient();
  const postCartBulkMutation = useMutation({
    mutationFn: postCartBulk,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    }
  });

  const onToggleAll = () => {
    postCartBulkMutation.mutate({
      data: { is_checked: !isAllChecked }
    });
  };

  const patchCartMutation = useMutation({
    mutationFn: patchCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    }
  });

  const onToggleProduct = (product: number, is_checked: boolean) => {
    patchCartMutation.mutate({
      data: { is_checked, product }
    });
  };

  if (isLoading) {
    return (
      <Card className='flex-1' variant='outline'>
        <CardHeader className='p-4'>
          <Skeleton className='h-4 w-32' />
        </CardHeader>
        <CardContent className='p-4 pt-0'>
          {Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className='border-t py-4'>
              <Skeleton className='h-26 w-full' />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (!cart?.cart_items.length) {
    return (
      <Card className='flex-1' variant='outline'>
        <CardHeader>
          <CardTitle className='font-semibold'>{t('Your cart is currently empty')}</CardTitle>
          <CardDescription>
            {t(
              'Promotions, special offers and reviews of the most interesting products on the main page will help you make your choice!'
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <Link href='/'>{t('Go to the main page')}</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className='flex-1' variant='outline'>
      <CardHeader className='p-4'>
        <div className='flex items-center gap-2'>
          <Checkbox checked={isAllChecked} id='select-all' onCheckedChange={onToggleAll} />
          <Label htmlFor='select-all'>{t('Select all')}</Label>
        </div>
      </CardHeader>
      <CardContent className='p-4 pt-0'>
        {cart.cart_items.map((item) => (
          <div key={item.id} className='flex items-center gap-2 border-t'>
            <ProductCartItem
              checked={item.is_checked}
              onCheckedChange={(checked) => onToggleProduct(item.product.id, checked)}
              product={item.product}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
