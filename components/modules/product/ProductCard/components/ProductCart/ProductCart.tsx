'use client';

import { CheckIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { CartCounter } from '@/components/modules/cart';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';

interface Props {
  product: Product;
}

export const ProductCart = ({ product }: Props) => {
  const [cartCount, setCartCount] = React.useState(0);
  const t = useTranslations();

  const onAddToCart = () => {
    setCartCount(1);
  };

  if (cartCount === 0)
    return (
      <Button className='w-full' size='sm' onClick={onAddToCart}>
        {t('To cart')}
      </Button>
    );

  return (
    <div className='grid grid-cols-[2fr_1fr] gap-2'>
      <CartCounter maxValue={product.product_count} value={cartCount} onChange={setCartCount} />
      <Button asChild className='shrink-0' size='sm' variant='outline'>
        <Link href='/cart'>
          <CheckIcon />
        </Link>
      </Button>
    </div>
  );
};
