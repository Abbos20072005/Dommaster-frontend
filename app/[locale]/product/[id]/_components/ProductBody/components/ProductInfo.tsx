'use client';

import { CheckIcon, CopyIcon, StarIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { Link } from '@/i18n/navigation';
import { StockStatus } from '@/modules/product';

import type { ProductSectionId } from './ProductSections';

import { ProductVariantGroups } from './ProductDescription/components';
import { DeliveryInfo, PriceBlock } from './ProductPurchase';

const KEY_SPECS_COUNT = 6;

const CopyCode = ({ code }: { code: string }) => {
  const t = useTranslations();
  const [copied, setCopied] = React.useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard ruxsat berilmagan — jim
    }
  };

  return (
    <button
      className='text-muted-foreground hover:text-foreground inline-flex min-h-8 items-center gap-1 text-xs'
      aria-label={t('Copy')}
      type='button'
      onClick={onCopy}
    >
      {copied ? (
        <>
          <CheckIcon className='size-3.5 text-green-600' />
          {t('Copied')}
        </>
      ) : (
        <CopyIcon className='size-3.5' />
      )}
    </button>
  );
};

interface Props {
  product: Product;
  onNavigate: (section: ProductSectionId) => void;
}

export const ProductInfo = ({ product, onNavigate }: Props) => {
  const t = useTranslations();
  const keySpecs = product.characteristics.slice(0, KEY_SPECS_COUNT);
  const hasReviews = product.comments_quantity > 0;

  return (
    <div className='min-w-0 space-y-4'>
      <h1 className='text-xl leading-7 font-bold text-pretty md:text-2xl md:leading-8'>
        {product.name || product.breadcrumbs.at(-1)?.name}
      </h1>

      <div className='flex flex-wrap items-center gap-x-4 gap-y-0.5 text-sm'>
        {product.brand && (
          <Link className='font-medium hover:underline' href={`/brand/${product.brand.id}`}>
            {product.brand.name}
          </Link>
        )}
        <span className='text-muted-foreground inline-flex items-center gap-1.5'>
          {t('Code')}: <span className='text-foreground font-mono text-[13px]'>{product.id}</span>
          <CopyCode code={String(product.id)} />
        </span>
      </div>

      <div className='flex flex-wrap items-center gap-x-4 gap-y-0.5 text-sm'>
        <button
          className='inline-flex min-h-8 items-center gap-1.5'
          type='button'
          onClick={() => onNavigate('reviews')}
        >
          {hasReviews ? (
            <>
              <StarIcon className='fill-secondary text-secondary size-4' />
              <strong className='font-semibold'>{(product.rating ?? 0).toFixed(1)}</strong>
              <span className='text-primary'>
                · {product.comments_quantity} {t('reviews')}
              </span>
            </>
          ) : (
            <span className='text-muted-foreground'>{t('No reviews yet')}</span>
          )}
        </button>
        <button
          className='text-primary inline-flex min-h-8 items-center'
          type='button'
          onClick={() => onNavigate('questions')}
        >
          {t('Questions')}
          {!!product.questions_quantity && `: ${product.questions_quantity}`}
        </button>
      </div>

      {/* Planshet va telefonda narx va xarid ma'lumoti shu yerda (katta ekranda — o'ng panelda) */}
      <div className='grid gap-3 lg:hidden'>
        <PriceBlock product={product} size='md' />
        <StockStatus quantity={product.quantity} />
      </div>

      <ProductVariantGroups variantGroups={product.variant_groups} />

      {!!keySpecs.length && (
        <div className='border-t'>
          <div className='pt-3.5 pb-1.5 text-base font-semibold'>{t('Key characteristics')}</div>
          {keySpecs.map((item) => (
            <div
              key={item.name}
              className='grid grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-3 border-b py-2 text-sm last:border-b-0'
            >
              <span className='text-muted-foreground'>{item.name}</span>
              <span>
                {item.value}
                {item.unit && ` ${item.unit}`}
              </span>
            </div>
          ))}
          {product.characteristics.length > KEY_SPECS_COUNT && (
            <button
              className='text-primary inline-flex min-h-11 items-center text-sm font-medium'
              type='button'
              onClick={() => onNavigate('characteristics')}
            >
              {t('All characteristics')} ↓
            </button>
          )}
        </div>
      )}

      <div className='bg-muted rounded-xl p-4 lg:hidden'>
        <DeliveryInfo />
      </div>
    </div>
  );
};
