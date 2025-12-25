'use client';

import { CheckIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { CartCounter, useProductCart } from '@/modules/cart';

interface Props {
  product: Product;
}

export const ProductCart = ({ product }: Props) => {
  const t = useTranslations();
  const { state, functions } = useProductCart(product);

  if (state.cartCount === 0)
    return (
      <Button
        className='w-full'
        disabled={product.quantity === 0}
        size='sm'
        onClick={functions.onAddToCart}
      >
        {product.quantity === 0 ? t('Out of stock') : t('To cart')}
      </Button>
    );

  return (
    <div className='gap-2 md:grid md:grid-cols-[2fr_1fr]'>
      <CartCounter
        maxValue={product.quantity}
        value={state.cartCount}
        onChange={functions.onCartCountChange}
      />
      <Button asChild className='hidden shrink-0 md:flex' size='sm' variant='outline'>
        <Link href='/cart'>
          <CheckIcon />
        </Link>
      </Button>
    </div>
  );
};
