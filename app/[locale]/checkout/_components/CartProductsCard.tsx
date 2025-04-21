'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/utils/stores';

export const CartProductsCard = () => {
  const t = useTranslations();
  const { cart } = useCart();

  return (
    <Card variant='outline'>
      <CardHeader>
        <CardTitle className='md:text-xl'>{t('Products on order')}</CardTitle>
      </CardHeader>
      <CardContent className='flex gap-4'>
        {cart?.cart_items
          .map((item) => item.product)
          .map((product) => (
            <div key={product.id} className='relative'>
              <Badge className='bg-background absolute top-1 right-1' variant='outline'>
                {product.in_cart_quantity}
              </Badge>
              <Image
                alt={product.name}
                className='bg-muted size-[80px] rounded-sm object-contain md:size-[100px]'
                height={100}
                src={product.images[0]?.image ?? '/product/no-image.png'}
                width={100}
              />
            </div>
          ))}
      </CardContent>
    </Card>
  );
};
