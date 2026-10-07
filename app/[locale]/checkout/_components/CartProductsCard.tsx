'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/modules/cart';

export const CartProductsCard = () => {
  const t = useTranslations();
  const { availableCartItems } = useCart();

  return (
    <Card variant='subtle'>
      <CardHeader>
        <CardTitle className='md:text-xl'>{t('Products on order')}</CardTitle>
      </CardHeader>
      <CardContent className='flex gap-4'>
        {availableCartItems
          .map((item) => item.product)
          .map((product) => (
            <div key={product.id} className='relative'>
              <Badge className='bg-background absolute top-1 right-1' variant='outline'>
                {product.in_cart_quantity}
              </Badge>
              <Image
                alt={product.name || 'Buildex'}
                className='bg-muted size-20 md:size-[100px] rounded-sm object-contain'
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
