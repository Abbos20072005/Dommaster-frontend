'use client';

import { CreditCardIcon, LandmarkIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { CHECKOUT_PAYMENT_METHODS } from '@/utils/constants/checkoutPaymentMethods';
import { useCheckoutStore } from '@/utils/stores';

import { SavedCardsList } from './components/SavedCardsList';

// To'lov usullari: Uzum, Click, Payme, Naqd va eng oxirida Atmos (saqlangan karta orqali)
export const PaymentMethodSelector = () => {
  const t = useTranslations();
  const { paymentMethod, setPaymentMethod } = useCheckoutStore();

  return (
    <Card variant='subtle'>
      <CardHeader>
        <div className='flex items-center gap-2'>
          <CreditCardIcon className='text-primary size-5' />
          <CardTitle className='md:text-xl'>{t('Payment method')}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div aria-label={t('Payment method')} className='space-y-2' role='radiogroup'>
          {CHECKOUT_PAYMENT_METHODS.map((method) => {
            const isSelected = paymentMethod === method.value;
            const label = method.label ?? t(method.labelKey!);

            return (
              <div
                key={method.value}
                className={cn(
                  'rounded-xl border-2 transition-colors',
                  isSelected
                    ? 'border-primary/50 bg-primary/5'
                    : 'bg-background hover:border-primary/20 border-transparent'
                )}
              >
                <button
                  aria-checked={isSelected}
                  className='flex w-full cursor-pointer items-center gap-3 p-3 text-left'
                  type='button'
                  onClick={() => setPaymentMethod(method.value)}
                  role='radio'
                >
                  <span className='flex h-8 w-14 shrink-0 items-center justify-center'>
                    {method.image ? (
                      <Image
                        alt={label}
                        className='h-8 w-14 object-contain'
                        height={32}
                        src={method.image}
                        width={56}
                      />
                    ) : (
                      <LandmarkIcon
                        className={cn(
                          'size-7',
                          isSelected ? 'text-primary' : 'text-muted-foreground'
                        )}
                      />
                    )}
                  </span>
                  <span className='min-w-0 flex-1'>
                    <span className='block text-sm font-semibold'>{label}</span>
                    {method.descriptionKey && (
                      <span className='text-muted-foreground block text-xs'>
                        {t(method.descriptionKey)}
                      </span>
                    )}
                  </span>
                  <span
                    className={cn(
                      'flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
                      isSelected ? 'border-primary' : 'border-muted-foreground/40'
                    )}
                  >
                    {isSelected && <span className='bg-primary size-2.5 rounded-full' />}
                  </span>
                </button>

                {method.value === 'atmos' && isSelected && (
                  <div className='px-3 pb-3'>
                    <SavedCardsList />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

/* ============================ ESKI KOD ============================
'use client';

import { CreditCardIcon, LandmarkIcon, WalletIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useCheckoutStore } from '@/utils/stores';

import { SavedCardsList } from './components/SavedCardsList';

const paymentOptions = [
  { value: 'online' as const, icon: LandmarkIcon, titleKey: 'Pay online by card', descKey: 'Atmos payment' },
  { value: 'cod' as const, icon: WalletIcon, titleKey: 'Cash on delivery', descKey: 'Pay upon receipt' }
];

export const PaymentMethodSelector = () => {
  const t = useTranslations();
  const { paymentOption, cashMethod, setPaymentOption, setCashMethod } = useCheckoutStore();

  return (
    <Card variant='outline'>
      <CardHeader>
        <div className='flex items-center gap-2'>
          <CreditCardIcon className='text-primary size-5' />
          <CardTitle className='md:text-xl'>{t('Payment method')}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
          {paymentOptions.map(({ value, icon: Icon, titleKey, descKey }) => (
            <button
              key={value}
              type='button'
              className={cn(
                'flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 p-6 text-center transition-colors',
                paymentOption === value
                  ? 'border-primary/50 bg-primary/5'
                  : 'border-muted hover:bg-accent/50'
              )}
              onClick={() => setPaymentOption(value)}
            >
              <Icon
                className={cn(
                  'size-8',
                  paymentOption === value ? 'text-primary' : 'text-muted-foreground'
                )}
              />
              <div className='space-y-1'>
                <div className='text-sm font-medium'>{t(titleKey)}</div>
                <div className='text-muted-foreground text-xs'>{t(descKey)}</div>
              </div>
            </button>
          ))}
        </div>

        {paymentOption === 'online' && <SavedCardsList />}

        {paymentOption === 'cod' && (
          <div className='space-y-3'>
            <p className='text-muted-foreground text-xs font-medium'>{t('Payment method on delivery')}</p>
            <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
              {([
                { value: 'cash' as const, label: t('Cash') },
                { value: 'card' as const, label: t('Card') }
              ]).map(({ value, label }) => (
                <button
                  key={value}
                  type='button'
                  className={cn(
                    'flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 p-4 text-center transition-colors',
                    cashMethod === value
                      ? 'border-primary/50 bg-primary/5'
                      : 'border-muted hover:bg-accent/50'
                  )}
                  onClick={() => setCashMethod(value)}
                >
                  <div className='text-sm font-medium'>{label}</div>
                </button>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
============================================================== */
