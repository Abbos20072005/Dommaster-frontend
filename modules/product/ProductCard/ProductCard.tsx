import { StarIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { Link } from '@/i18n/navigation';
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
        // the 3:4 photo and a details block of a fixed height: every card is the same size
        'flex flex-col',
        'group/card',
        // in the sale block (light blue) every card is a white panel: the photo is flush with its
        // edges, only the text block has padding
        onDark && 'overflow-hidden rounded-xl bg-white',
        className
      )}
      data-on-dark={onDark ? '' : undefined}
      {...props}
    >
      <div className='relative'>
        {/* no prefetch on the card links: a page has hundreds of them and a product page is
            rendered on demand anyway, so a prefetch only costs requests */}
        <Link href={productHref(product)} aria-label={name} prefetch={false}>
          <ProductImages product={{ ...product, name }} />
          <span className='sr-only'>{name}</span>
        </Link>
        {!hideControl && (
          <div className='absolute top-2 right-2 z-3'>
            <ProductControl product={product} />
          </div>
        )}
      </div>
      {/* the sale block (dark) has a tighter text part; every other card keeps the fixed height */}
      <div className={cn('flex flex-col', onDark ? 'gap-2 px-1.5 pt-1 pb-1.5' : 'h-48 gap-3 pt-3')}>
        {/* the sale block shows the price first, then the name (`order`) */}
        <div className={cn('space-y-0.5', onDark && 'order-2')}>
          {/* the rating is shown only when there are reviews; it links to `#reviews`, not `?tab=`
              (robots.txt blocked `?tab=`, BLD-453). An empty line keeps the card height (not on
              the sale block, where the name starts right under the photo). */}
          {product.comments_quantity > 0 ? (
            <Link
              href={`${productHref(product)}#reviews`}
              className='flex h-5 items-center gap-1 text-sm'
              prefetch={false}
            >
              <StarIcon className='text-secondary fill-secondary size-4' />
              <span>{(product.rating ?? 0).toFixed(1)}</span>
              <span className='text-muted-foreground'>
                • {product.comments_quantity} {t('reviews')}
              </span>
            </Link>
          ) : (
            !onDark && <div className='h-5' />
          )}
          <Link className={cn('block', !onDark && 'h-10')} href={productHref(product)} prefetch={false}>
            <span className='line-clamp-2 text-sm leading-5 font-medium'>{name}</span>
          </Link>
        </div>
        <div className={cn('mt-auto', onDark && 'order-1')}>
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
