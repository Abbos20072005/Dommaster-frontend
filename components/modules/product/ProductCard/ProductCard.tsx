import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React from 'react';

import { Ratings } from '@/components/ui/rating';
import { cn } from '@/lib/utils';

import { ProductCart, ProductControl, ProductImages, ProductPrice } from './components';

type Props = React.ComponentProps<'div'> & {
  product: Product;
  setLockParentScroll?: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ProductCard = ({ product, className, setLockParentScroll, ...props }: Props) => {
  const t = useTranslations();

  return (
    <div
      className={cn(
        'bg-background flex h-full flex-col rounded-lg border p-3 transition-shadow hover:shadow-md sm:p-4',
        className
      )}
      {...props}
    >
      <div className='flex justify-between'>
        <p className='text-muted-foreground text-sm'>{t('code')}: 16012263</p>
        <ProductControl product={product} />
      </div>
      <div className='relative mb-1'>
        <Link href={`/product/${product.id}`} aria-label={product.name}>
          <ProductImages product={product} setLockParentScroll={setLockParentScroll} />
          <span className='sr-only'>{product.name}</span>
        </Link>
      </div>
      <div className='mb-2'>
        <Link href={{ pathname: `/product/${product.id}`, query: { tab: 'reviews' } }}>
          <Ratings
            className='gap-0.5 md:gap-1'
            rating={product.rating}
            classNameIcon='text-secondary size-3.5 md:size-4'
          />
        </Link>
      </div>
      <div className='mb-4 flex-1'>
        <Link href={`/product/${product.id}`}>
          <span className='line-clamp-4 text-sm leading-5'>{product.name}</span>
        </Link>
      </div>
      <div className='mb-2'>
        <ProductPrice product={product} />
      </div>
      <ProductCart product={product} />
    </div>
  );
};
