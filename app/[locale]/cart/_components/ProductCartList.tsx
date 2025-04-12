'use client';

import { useTranslations } from 'next-intl';
import React from 'react';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { productsData } from '@/fake-data/products';

import { ProductCartItem } from './ProductCartItem';

export const ProductCartList = () => {
  const t = useTranslations();
  const [selectedProducts, setSelectedProducts] = React.useState<number[]>([]);

  const onToggleProduct = (id: number) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const onToggleAll = () => {
    setSelectedProducts((prev) =>
      prev.length === productsData.length ? [] : productsData.map((item) => item.id)
    );
  };

  return (
    <Card className='flex-1' variant='outline'>
      <CardHeader className='p-4'>
        <div className='flex items-center gap-2'>
          <Checkbox
            checked={selectedProducts.length === productsData.length}
            id='select-all'
            onCheckedChange={onToggleAll}
          />
          <Label htmlFor='select-all'>{t('Select all')}</Label>
        </div>
      </CardHeader>
      <CardContent className='p-4 pt-0'>
        {productsData.slice(0, 3).map((product) => (
          <div key={product.id} className='flex items-center gap-2 border-t'>
            <ProductCartItem
              checked={selectedProducts.includes(product.id)}
              onCheckedChange={() => onToggleProduct(product.id)}
              product={product}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
