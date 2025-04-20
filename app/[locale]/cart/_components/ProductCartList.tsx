'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import React from 'react';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { getCartList, patchCart, postCartBulk } from '@/utils/api/requests';

import { ProductCartItem } from './ProductCartItem';

export const ProductCartList = () => {
  const t = useTranslations();

  const getCartListQuery = useQuery({
    queryKey: ['cart'],
    queryFn: () => getCartList()
  });

  const cartItems = getCartListQuery.data?.data.result.cart_items || [];

  const isAllChecked = cartItems.every((item) => item.is_checked);

  const postCartBulkMutation = useMutation({
    mutationFn: postCartBulk,
    onSuccess: () => {
      getCartListQuery.refetch();
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
      getCartListQuery.refetch();
    }
  });

  const onToggleProduct = (product: number, is_checked: boolean) => {
    patchCartMutation.mutate({
      data: { is_checked, product }
    });
  };

  return (
    <Card className='flex-1' variant='outline'>
      <CardHeader className='p-4'>
        <div className='flex items-center gap-2'>
          <Checkbox checked={isAllChecked} id='select-all' onCheckedChange={onToggleAll} />
          <Label htmlFor='select-all'>{t('Select all')}</Label>
        </div>
      </CardHeader>
      <CardContent className='p-4 pt-0'>
        {cartItems.map((item) => (
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
