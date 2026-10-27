import { StarIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React from 'react';

import { cn, formatPrice } from '@/lib/utils';

import { PriceUnit } from '../PriceUnit/PriceUnit';
import { ProductCart, ProductControl, ProductImages } from './components';
import { productHref } from '@/lib/urls';

type Props = React.ComponentProps<'div'> & {
  product: Product;
  hideCart?: boolean;
  hideControl?: boolean;
  /** the card lies on a dark background (sale banner): light text */
  onDark?: boolean;
};

export const ProductCard = ({
  product,
  className,
  hideCart,
  hideControl,
  onDark,
  ...props
}: Props) => {
  const t = useTranslations();
  // Backend tarjimasi yo'q tilda name null qaytadi — breadcrumbs'ning oxirgi elementi mahsulot nomi
  const name = product.name || product.breadcrumbs?.at(-1)?.name || '';

  return (
    <div
      className={cn(
        // no card box: the rounded photo and the text lie right on the page
        // 480px: the photo takes 288px (60%), the details the other 192px (40%)
        'flex h-[480px] flex-col',
        'group/card',
        // on the dark banner every card is a slightly lighter panel: the photo is flush with its
        // edges, only the text block has padding
        onDark &&
          'text-primary-foreground overflow-hidden rounded-xl bg-white/10 [&_.text-muted-foreground]:text-white/70',
        className
      )}
      data-on-dark={onDark ? '' : undefined}
      {...props}
    >
      <div className='relative'>
        <Link href={productHref(product)} aria-label={name}>
          <ProductImages product={{ ...product, name }} />
          <span className='sr-only'>{name}</span>
        </Link>
        {!hideControl && (
          <div className='absolute top-2 right-2 z-3'>
            <ProductControl product={product} />
          </div>
        )}
      </div>
      <div className={cn('flex flex-1 flex-col gap-3 pt-3', onDark && 'px-2 pb-2')}>
        <div className='space-y-0.5'>
          <Link
            href={{ pathname: productHref(product), query: { tab: 'reviews' } }}
            className='flex h-5 items-center gap-1 text-sm'
          >
            <StarIcon className='text-secondary fill-secondary size-4' />
            <span>{(product.rating ?? 0).toFixed(1)}</span>
            <span className='text-muted-foreground'>
              • {product.comments_quantity} {t('reviews')}
            </span>
          </Link>
          <Link className='block h-10' href={productHref(product)}>
            <span className='line-clamp-2 text-sm leading-5 font-medium'>{name}</span>
          </Link>
        </div>
        <div className='mt-auto'>
          {product.discount_price && (
            <div className='text-muted-foreground text-xs leading-4 line-through'>
              {formatPrice(product.price)} {t('sum')}
            </div>
          )}
          <div className='flex flex-wrap items-center justify-between gap-x-2'>
            <div className='text-base leading-6 font-bold md:text-lg'>
              {formatPrice(product.discount_price ?? product.price)} {t('sum')}
              <PriceUnit unit={product.unit} />
            </div>
            {product.discount_price && product.price > 0 && (
              <span className='rounded-md bg-red-50 px-1.5 py-0.5 text-xs font-bold text-red-600'>
                -{Math.round((1 - product.discount_price / product.price) * 100)}%
              </span>
            )}
          </div>
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
