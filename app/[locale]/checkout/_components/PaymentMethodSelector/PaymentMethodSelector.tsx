'use client';

import { CreditCardIcon, LandmarkIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { DELIVERY_TYPE } from '@/utils/constants';
import { CHECKOUT_PAYMENT_METHODS } from '@/utils/constants/checkoutPaymentMethods';
import { useCheckoutStore } from '@/utils/stores';

import { SavedCardsList } from './components/SavedCardsList';

// To'lov usullari: Uzum, Click, Payme, Naqd va eng oxirida Atmos (saqlangan karta orqali)
export const PaymentMethodSelector = () => {
  const t = useTranslations();
  const { deliveryType, paymentMethod, setPaymentMethod } = useCheckoutStore();
  const isPickup = deliveryType === DELIVERY_TYPE.Pickup;
  // every method works for a pickup too; cash is paid to the courier or in the shop
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
                        {isPickup && method.value === 'cash'
                          ? t('Pay at the store')
                          : t(method.descriptionKey)}
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
