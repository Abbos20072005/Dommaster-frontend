import { StarIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React from 'react';

import { cn, formatPrice } from '@/lib/utils';

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
      <div className='relative'>
        <Link href={`/product/${product.id}`} aria-label={name}>
          <ProductImages product={{ ...product, name }} />
          <span className='sr-only'>{name}</span>
        </Link>
        {!hideControl && (
          <div className='absolute top-2 right-2 z-3'>
            <ProductControl product={product} />
          </div>
        )}
      </div>
      <div className='flex flex-1 flex-col gap-2 p-2 md:p-3'>
        <div>
          <div className='text-base font-bold md:text-lg'>
            {formatPrice(product.discount_price ?? product.price)}
          </div>
          {product.discount_price && (
            <div className='text-muted-foreground text-sm line-through'>
              {formatPrice(product.price)}
            </div>
          )}
        </div>
        <div className='flex-1'>
          <Link href={`/product/${product.id}`}>
            <span className='line-clamp-2 text-sm leading-5'>{name}</span>
          </Link>
        </div>
        <Link
          href={{ pathname: `/product/${product.id}`, query: { tab: 'reviews' } }}
          className='flex items-center gap-1 text-sm'
        >
          <StarIcon className='text-secondary fill-secondary size-4' />
          <span>{(product.rating ?? 0).toFixed(1)}</span>
          {product.comments_quantity > 0 && (
            <span className='text-muted-foreground'>
              ({product.comments_quantity} {t('reviews')})
            </span>
          )}
        </Link>
        {!hideCart && <ProductCart product={product} />}
      </div>
    </div>
  );
};
