'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useQueryState } from 'nuqs';
import React from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import { paymentMethods } from '@/utils/constants/paymentMethods';

export const PaymentTypeCard = () => {
  const t = useTranslations();
  const [type, setType] = useQueryState('payment_method', { defaultValue: '1' });

  return (
    <Card variant='outline'>
      <CardHeader>
        <CardTitle className='md:text-xl'>{t('Payment methods')}</CardTitle>
      </CardHeader>
      <CardContent className='flex gap-4'>
        <RadioGroup
          className='grid w-full grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-2'
          value={type}
          onValueChange={setType}
        >
          {paymentMethods.map((item) => (
            <React.Fragment key={item.value}>
              <RadioGroupItem
                aria-label={item.label}
                className='sr-only'
                id={item.value}
                value={item.value}
              />
              <Label
                className={cn(
                  'border-muted hover:bg-secondary/5 hover:text-accent-foreground flex h-20 flex-col items-center justify-between rounded-md border-2 bg-transparent p-2 transition-colors',
                  { 'border-secondary/50': type === item.value }
                )}
                htmlFor={item.value}
              >
                <Image
                  alt={item.label}
                  className='size-full object-contain'
                  height={150}
                  src={item.image}
                  width={50}
                />
              </Label>
            </React.Fragment>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
};
