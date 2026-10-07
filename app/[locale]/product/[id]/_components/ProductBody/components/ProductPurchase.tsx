'use client';

import { CreditCardIcon, HouseIcon, RotateCcwIcon, TruckIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { Link } from '@/i18n/navigation';
import { cn, formatPrice } from '@/lib/utils';
import { PriceUnit } from '@/modules/product';

interface PriceBlockProps {
  product: Product;
  className?: string;
  size?: 'md' | 'lg';
}

/** Eski narx, chegirma foizi va joriy narx (birlik bilan) */
export const PriceBlock = ({ product, className, size = 'lg' }: PriceBlockProps) => {
  const t = useTranslations();

  return (
    <div className={cn('grid gap-1', className)}>
      {product.discount_price && (
        <div className='flex items-center gap-2'>
          <span className='text-muted-foreground text-sm tabular-nums line-through'>
            {formatPrice(product.price)} {t('sum')}
          </span>
          {!!product.discount && (
            <span className='bg-secondary text-foreground rounded-md px-1.5 py-px text-xs font-bold'>
              −{product.discount}%
            </span>
          )}
        </div>
      )}
      <div
        className={cn(
          'font-bold tabular-nums',
          size === 'lg' ? 'text-3xl leading-9' : 'text-2xl leading-8'
        )}
      >
        {formatPrice(product.discount_price ?? product.price)} {t('sum')}
        <PriceUnit className='text-base' unit={product.unit} />
      </div>
    </div>
  );
};

/** Yetkazib berish, olib ketish, to'lov va qaytarish haqida qisqa ma'lumot */
export const DeliveryInfo = ({ className }: { className?: string }) => {
  const t = useTranslations();

  return (
    <div className={cn('grid gap-4', className)}>
      <div className='grid grid-cols-[22px_minmax(0,1fr)] gap-2.5'>
        <TruckIcon className='text-primary size-5' />
        <div className='grid gap-0.5'>
          <span className='text-sm font-medium'>{t('Delivery')}</span>
          <span className='text-muted-foreground text-[13px] leading-[18px]'>
            {t('Delivery across Tashkent')} ·{' '}
            <Link className='text-primary hover:underline' href='/courier-delivery'>
              {t('Terms')}
            </Link>
          </span>
        </div>
      </div>
      <div className='grid grid-cols-[22px_minmax(0,1fr)] gap-2.5'>
        <HouseIcon className='text-primary size-5' />
        <div className='grid gap-0.5'>
          <span className='text-sm font-medium'>{t('Pickup')}</span>
          <span className='text-muted-foreground text-[13px] leading-[18px]'>
            {t('From the warehouse')}
          </span>
        </div>
      </div>
      <div className='grid grid-cols-[22px_minmax(0,1fr)] gap-2.5'>
        <CreditCardIcon className='text-primary size-5' />
        <div className='grid gap-0.5'>
          <span className='text-sm font-medium'>{t('Payment')}</span>
          <span className='text-muted-foreground text-[13px] leading-[18px]'>
            {t('Pay online by card or on pickup')}
          </span>
        </div>
      </div>
      <Link
        className='text-primary flex items-center gap-1.5 text-[13px] hover:underline'
        href='/payment-methods'
      >
        <RotateCcwIcon className='size-4' />
        {t('Return policy')}
      </Link>
    </div>
  );
};
