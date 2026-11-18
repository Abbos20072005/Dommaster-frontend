'use client';

import { ShoppingCartIcon } from 'lucide-react';
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
  // the quantity picked with "− 1 +"; the cart is changed only by the button
  const [quantity, setQuantity] = React.useState(Math.max(1, state.cartCount));

  // the cart changed elsewhere (another card, the cart page): follow it
  React.useEffect(() => {
    if (state.cartCount > 0) setQuantity(state.cartCount);
  }, [state.cartCount]);

  if (product.quantity === 0)
    return (
      <Button className='w-full rounded-xl' disabled>
        <ShoppingCartIcon />
        {t('Out of stock')}
      </Button>
    );

  // the button is blue while the picked quantity is not in the cart yet (it puts it there);
  // once it is there the button is plain and opens the cart page
  const inCart = state.cartCount > 0 && state.cartCount === quantity;

  // a narrow card (phone, a dense carousel) shows the cart icon instead of the word
  const label = (
    <>
      <ShoppingCartIcon className='@[180px]:hidden' />
      <span className='hidden @[180px]:inline'>{t('To cart')}</span>
    </>
  );
  const buttonClass = 'h-10 min-w-0 flex-1 rounded-xl px-2';

  return (
    <div className='@container'>
      <div className='flex items-center gap-2'>
        {inCart ? (
          <Button asChild className={buttonClass} variant='outline'>
            <Link aria-label={t('To cart')} href='/cart'>
              {label}
            </Link>
          </Button>
        ) : (
          <Button
            aria-label={t('To cart')}
            className={buttonClass}
            onClick={() =>
              state.cartCount > 0
                ? functions.onCartCountChange(quantity)
                : functions.onAddQuantity(quantity)
            }
          >
            {label}
          </Button>
        )}
        <CartCounter
          className='h-10 w-24 shrink-0'
          maxValue={product.quantity}
          minValue={1}
          value={quantity}
          onChange={setQuantity}
        />
      </div>
    </div>
  );
};
