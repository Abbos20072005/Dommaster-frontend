'use client';

import { ShoppingCartIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { cn, formatPrice } from '@/lib/utils';
import { CartCounter, useProductCart } from '@/modules/cart';
import { PriceUnit, StockStatus } from '@/modules/product';
import { ProductControl } from '@/modules/product/ProductCard/components/ProductControl/ProductControl';

import { ShareButton } from './ProductBody/components/ShareButton';
import { DeliveryInfo, PriceBlock } from './ProductBody/components/ProductPurchase';

interface Props {
  product: Product;
}

/** Katta ekranda o'ng tomondagi yopishqoq xarid paneli */
export const ProductCart = ({ product }: Props) => {
  const t = useTranslations();
  const { state, functions } = useProductCart(product);
  const inStock = product.quantity > 0;
  const unitPrice = product.discount_price ?? product.price;

  return (
    <aside className='bg-background sticky top-20 hidden space-y-4 rounded-xl border p-5 lg:block'>
      <PriceBlock product={product} />
      <StockStatus quantity={product.quantity} />

      {!inStock ? (
        <Button className='h-12 w-full' disabled>
          {t('Out of stock')}
        </Button>
      ) : state.cartCount === 0 ? (
        <Button className='h-12 w-full text-[15px]' onClick={functions.onAddToCart}>
          <ShoppingCartIcon />
          {t('Add to cart')}
        </Button>
      ) : (
        <div className='grid gap-3'>
          <CartCounter
            className='bg-muted h-11 rounded-md'
            maxValue={product.quantity}
            value={state.cartCount}
            onChange={functions.onCartCountChange}
          />
          <div className='flex items-center justify-between text-sm'>
            <span className='text-muted-foreground'>{t('Total')}</span>
            <strong className='tabular-nums'>
              {formatPrice(unitPrice * state.cartCount)} {t('sum')}
            </strong>
          </div>
          <Button asChild className='h-12' variant='outline'>
            <Link href='/cart'>
              <ShoppingCartIcon />
              {t('To cart')}
            </Link>
          </Button>
        </div>
      )}

      <div className='grid grid-cols-2 gap-2'>
        <ProductControl product={product} withLabel />
        <ShareButton title={product.name} withLabel />
      </div>

      <DeliveryInfo className='border-t pt-4' />
    </aside>
  );
};

/** Telefon va planshetda ekran pastida (pastki navigatsiya ustida) qotib turadigan panel */
export const ProductMobileBar = ({ product }: Props) => {
  const t = useTranslations();
  const { state, functions } = useProductCart(product);
  const inStock = product.quantity > 0;

  return (
    <div
      className={cn(
        'bg-background fixed inset-x-0 bottom-[4.5rem] z-40 flex items-center gap-2 border-t px-4 py-2.5',
        'shadow-[0_-6px_20px_rgba(15,22,32,0.06)] md:bottom-0 lg:hidden'
      )}
    >
      <div className='grid min-w-0 flex-1'>
        {product.discount_price && (
          <span className='text-muted-foreground text-[11px] leading-3.5 tabular-nums line-through'>
            {formatPrice(product.price)} {t('sum')}
          </span>
        )}
        <span className='text-base leading-5 font-bold whitespace-nowrap tabular-nums'>
          {formatPrice(product.discount_price ?? product.price)} {t('sum')}
        </span>
        <PriceUnit className='leading-4' unit={product.unit} />
      </div>

      {!inStock ? (
        <Button className='h-11 flex-1' disabled>
          {t('Out of stock')}
        </Button>
      ) : state.cartCount === 0 ? (
        <Button className='h-11 px-6' onClick={functions.onAddToCart}>
          <ShoppingCartIcon />
          {t('To cart')}
        </Button>
      ) : (
        <>
          <CartCounter
            className='bg-muted h-11 w-32 rounded-md'
            maxValue={product.quantity}
            value={state.cartCount}
            onChange={functions.onCartCountChange}
          />
          <Button asChild className='h-11' variant='outline'>
            <Link aria-label={t('To cart')} href='/cart'>
              <ShoppingCartIcon />
            </Link>
          </Button>
        </>
      )}
    </div>
  );
};
