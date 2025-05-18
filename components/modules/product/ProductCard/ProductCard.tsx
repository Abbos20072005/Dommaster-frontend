import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React from 'react';

import { Ratings } from '@/components/ui/rating';
import { cn } from '@/lib/utils';

import { ProductCart, ProductControl, ProductImages, ProductPrice } from './components';

type Props = React.ComponentProps<'div'> & {
  product: Product;
  hideCart?: boolean;
  hideControl?: boolean;
};

export const ProductCard = ({ product, className, hideCart, hideControl, ...props }: Props) => {
  const t = useTranslations();

  return (
    <div
      className={cn(
        'bg-background flex flex-col rounded-lg border p-3 transition-shadow hover:shadow-md md:p-4',
        className
      )}
      {...props}
    >
      {!hideControl && (
        <div className='flex justify-between'>
          <p className='text-muted-foreground text-sm'>
            {t('code')}: {product.id}
          </p>
          <ProductControl product={product} />
        </div>
      )}
      <div className='relative mb-1'>
        <Link href={`/product/${product.id}`} aria-label={product.name}>
          <ProductImages product={product} />
          <span className='sr-only'>{product.name}</span>
        </Link>
      </div>
      <div className='mb-2'>
        <Link
          href={{ pathname: `/product/${product.id}`, query: { tab: 'reviews' } }}
          className='flex items-center gap-1'
        >
          <Ratings
            className='gap-0.5 md:gap-1'
            rating={product.rating}
            classNameIcon='text-secondary size-3.5'
          />
          {product.comments_quantity > 0 && (
            <span className='text-muted-foreground text-sm'>{product.comments_quantity}</span>
          )}
        </Link>
      </div>
      <div className='mb-2 flex-1'>
        <Link href={`/product/${product.id}`}>
          <span className='line-clamp-3 text-sm leading-5'>{product.name}</span>
        </Link>
      </div>
      <div>
        <ProductPrice product={product} />
      </div>
      {!hideCart && (
        <div className='mt-2'>
          <ProductCart product={product} />
        </div>
      )}
    </div>
  );
};
