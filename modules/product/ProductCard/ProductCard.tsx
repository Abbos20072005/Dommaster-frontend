import { StarIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React from 'react';

import { cn, formatPrice } from '@/lib/utils';

import { PriceUnit } from '../PriceUnit/PriceUnit';
import { ProductCart, ProductControl, ProductImages } from './components';

type Props = React.ComponentProps<'div'> & {
  product: Product;
  hideCart?: boolean;
  hideControl?: boolean;
};

export const ProductCard = ({ product, className, hideCart, hideControl, ...props }: Props) => {
  const t = useTranslations();
  // Backend tarjimasi yo'q tilda name null qaytadi — breadcrumbs'ning oxirgi elementi mahsulot nomi
  const name = product.name || product.breadcrumbs?.at(-1)?.name || '';

  return (
    <div
      className={cn(
        'bg-background flex flex-col overflow-hidden rounded-xl border transition-shadow hover:shadow-md',
        className
      )}
      {...props}
    >
      <div className='relative p-2 pb-0 md:p-3 md:pb-0'>
        <Link href={`/product/${product.id}`} aria-label={name}>
          <ProductImages product={{ ...product, name }} />
          <span className='sr-only'>{name}</span>
        </Link>
        {!hideControl && (
          <div className='absolute top-4 right-4 z-3 md:top-5 md:right-5'>
            <ProductControl product={product} />
          </div>
        )}
      </div>
      <div className='flex flex-1 flex-col gap-2 p-2 md:p-3'>
        <Link
          href={{ pathname: `/product/${product.id}`, query: { tab: 'reviews' } }}
          className='flex h-5 items-center gap-1 text-sm'
        >
          <StarIcon className='text-secondary fill-secondary size-4' />
          <span>{(product.rating ?? 0).toFixed(1)}</span>
          {product.comments_quantity > 0 && (
            <span className='text-muted-foreground'>
              ({product.comments_quantity} {t('reviews')})
            </span>
          )}
        </Link>
        <Link className='block h-10' href={`/product/${product.id}`}>
          <span className='line-clamp-2 text-sm leading-5'>{name}</span>
        </Link>
        <div className='mt-auto h-12'>
          <div className='text-base leading-6 font-bold md:text-lg'>
            {formatPrice(product.discount_price ?? product.price)} {t('sum')}
            <PriceUnit unit={product.unit} />
          </div>
          {product.discount_price && (
            <div className='text-muted-foreground text-sm leading-5 line-through'>
              {formatPrice(product.price)} {t('sum')}
            </div>
          )}
        </div>
        {!hideCart && (
          <div className='h-10'>
            <ProductCart product={product} />
          </div>
        )}
      </div>
    </div>
  );
};
