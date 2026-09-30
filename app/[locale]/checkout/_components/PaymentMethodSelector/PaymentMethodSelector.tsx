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
