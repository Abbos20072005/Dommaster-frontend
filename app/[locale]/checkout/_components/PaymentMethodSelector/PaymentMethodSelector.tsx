'use client';

import { CreditCardIcon, LandmarkIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { CHECKOUT_PAYMENT_METHODS } from '@/utils/constants/checkoutPaymentMethods';
import { useCheckoutStore } from '@/utils/stores';

import { SavedCardsList } from './components/SavedCardsList';

// To'lov usuli: faqat Atmos (saqlangan karta orqali); bitta usul bo'lgani uchun u tanlangan holda turadi (BLD-549)
export const PaymentMethodSelector = () => {
  const t = useTranslations();
  const { paymentMethod, setPaymentMethod } = useCheckoutStore();
  const methods = CHECKOUT_PAYMENT_METHODS;

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
          {methods.map((method) => {
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
                    <LandmarkIcon
                      className={cn('size-7', isSelected ? 'text-primary' : 'text-muted-foreground')}
                    />
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
