import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React from 'react';

import { CartCounter } from '@/components/modules/cart';
import { Button } from '@/components/ui/button';
import { Ratings } from '@/components/ui/rating';
import { cn } from '@/lib/utils';

import { ProductImages } from './components';

type Props = React.ComponentProps<'div'> & {
  product: Product;
  setLockParentScroll?: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ProductCard = ({ product, className, setLockParentScroll, ...props }: Props) => {
  const t = useTranslations();
  const [cartCount, setCartCount] = React.useState(1);

  return (
    <div className={cn('group/product size-full overflow-hidden rounded-lg', className)} {...props}>
      <Link href={`product/${product.id}`} aria-label={product.title}>
        <ProductImages product={product} setLockParentScroll={setLockParentScroll} />
        <span className='sr-only'>{product.title}</span>
      </Link>
      <div>
        <div className='flex items-center justify-between py-1'>
          <Link href={`product/${product.id}/reviews`}>
            <Ratings className='gap-1' rating={4.3} classNameIcon='text-primary size-4' />
          </Link>
          <p className='text-muted-foreground text-xs'>1349879</p>
        </div>
        <Link href={`product/${product.id}`}>
          <span className='line-clamp-4 min-h-24 text-sm'>{product.title}</span>
        </Link>
      </div>
      <div className='grid grid-cols-2 gap-2'>
        <Button size='sm'>{t('To cart')}</Button>
        <CartCounter maxValue={product.product_count} value={cartCount} onChange={setCartCount} />
      </div>
    </div>
  );
};
