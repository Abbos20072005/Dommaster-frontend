'use client';

import { CheckIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { CartCounter, useProductCart } from '@/components/modules/cart';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { Link } from '@/i18n/navigation';

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
        disabled={state.isCartAdding}
        size='sm'
        onClick={functions.onAddToCart}
      >
        <Spinner show={state.isCartAdding} />
        {t('To cart')}
      </Button>
    );

  return (
    <div className='grid grid-cols-[2fr_1fr] gap-2'>
      <CartCounter
        maxValue={product.quantity}
        value={state.cartCount}
        onChange={functions.onCartCountChange}
      />
      <Button asChild className='shrink-0' size='sm' variant='outline'>
        <Link href='/cart'>
          <CheckIcon />
        </Link>
      </Button>
    </div>
  );
};
