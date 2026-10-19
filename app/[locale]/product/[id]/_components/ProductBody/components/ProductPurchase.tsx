'use client';

import { CreditCardIcon, RotateCcwIcon, TruckIcon } from 'lucide-react';
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

/**
 * Short blocks about the delivery, the payment and the returns, each with a link to its page
 * (BLD-287). Only what the trust pages say: no pickup and no payment on receipt.
 */
export const DeliveryInfo = ({ className }: { className?: string }) => {
  const t = useTranslations();
  const blocks = [
    {
      icon: TruckIcon,
      title: 'Delivery',
      text: 'Product delivery short',
      href: '/courier-delivery'
    },
    {
      icon: CreditCardIcon,
      title: 'Payment',
      text: 'Product payment short',
      href: '/payment-methods'
    },
    {
      icon: RotateCcwIcon,
      title: 'Returns',
      text: 'Product returns short',
      href: '/returns'
    }
  ] as const;

  return (
    <div className={cn('grid gap-4', className)}>
      {blocks.map(({ icon: Icon, title, text, href }) => (
        <div className='grid grid-cols-[22px_minmax(0,1fr)] gap-2.5' key={href}>
          <Icon className='text-primary size-5' />
          <div className='grid gap-0.5'>
            <span className='text-sm font-medium'>{t(title)}</span>
            <span className='text-muted-foreground text-[13px] leading-[18px]'>
              {t(text)} ·{' '}
              <Link className='text-primary hover:underline' href={href}>
                {t('Terms')}
              </Link>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
