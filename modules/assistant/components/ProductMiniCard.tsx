'use client';

import { ChevronRightIcon, ClockIcon, ImageIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';

import { Link } from '@/i18n/navigation';
import { trackEvent } from '@/lib/analytics';
import { cn, formatPrice } from '@/lib/utils';
import { productHref } from '@/lib/urls';

import type { AssistantProduct, StockStatus } from '../types';

/**
 * The badge follows `stock_status` of the server (its limits may change): `check` is almost every
 * product while 1C sends no real stock, and the card then never says "in stock".
 */
const Stock = ({ status }: { status: StockStatus }) => {
  const t = useTranslations();

  if (status === 'check') {
    return (
      <span className='inline-flex items-center gap-1 rounded-full border border-[#CBD2DB] px-2 py-0.5 text-xs font-medium text-[#4A5563]'>
        <ClockIcon className='size-3' />
        {t('assistant.checkStock')}
      </span>
    );
  }

  const [label, className, dot] =
    status === 'out_of_stock'
      ? ['assistant.outOfStock', 'bg-[#EDF0F5] text-[#4A5563]', 'bg-[#6B7685]']
      : status === 'low'
        ? ['assistant.lowStock', 'bg-[#FFF1D6] text-[#8A5A00]', 'bg-[#F5A524]']
        : ['assistant.inStock', 'bg-[#E6F6EC] text-[#12703C]', 'bg-[#12A150]'];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium',
        className
      )}
    >
      <span className={cn('size-1.5 rounded-full', dot)} />
      {t(label)}
    </span>
  );
};

/** A product in an answer: a photo, a name, a price, the stock and a link to the product page. */
export const ProductMiniCard = ({ product }: { product: AssistantProduct }) => {
  const t = useTranslations();
  const image = product.images?.[0]?.image;
  const price = product.discount_price ?? product.price;
  const percent =
    product.discount_price && product.price > 0
      ? Math.round((1 - product.discount_price / product.price) * 100)
      : 0;

  return (
    <Link
      className='group flex gap-3 rounded-xl border border-[#E5E8EC] bg-white p-3 transition-colors hover:border-[#C9D3E6] active:border-primary active:bg-[#EAF1FF]'
      href={productHref(product)}
      onClick={() => trackEvent('assistant_product_click', { item_id: String(product.id) })}
    >
      <span className='relative flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[#E5E8EC] bg-white'>
        {image ? (
          <Image
            alt={product.name}
            className='object-contain p-1'
            fill
            sizes='64px'
            src={image}
          />
        ) : (
          <ImageIcon className='size-6 text-[#CBD2DB]' />
        )}
      </span>
      <span className='flex min-w-0 flex-1 flex-col gap-1'>
        <span className='line-clamp-2 text-sm leading-5 font-medium text-[#0F1620]'>
          {product.name}
        </span>
        <span className='flex flex-wrap items-baseline gap-x-1.5'>
          <span className='text-sm leading-5 font-bold text-[#0F1620]'>
            {formatPrice(price)} {t('sum')}
          </span>
          {product.discount_price && (
            <span className='text-xs text-[#6B7685] line-through'>
              {formatPrice(product.price)}
            </span>
          )}
          {percent > 0 && (
            <span className='rounded bg-[#FFE27A] px-1 text-[11px] leading-4 font-bold text-[#0F1620]'>
              -{percent}%
            </span>
          )}
          <span className='text-xs whitespace-nowrap text-[#6B7685]'>/ {t(product.unit)}</span>
        </span>
        <span className='flex flex-wrap items-center justify-between gap-x-3 gap-y-1'>
          <Stock status={product.stock_status ?? 'check'} />
          <span className='text-primary inline-flex items-center text-sm font-semibold'>
            {t('assistant.toProduct')}
            <ChevronRightIcon className='size-4' />
          </span>
        </span>
      </span>
    </Link>
  );
};
