'use client';

import { UserIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { Card, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { cn, formatPhoneNumber } from '@/lib/utils';
import { useAuth } from '@/modules/auth';
import { useCheckoutStore } from '@/utils/stores';

// "Получатель" bloki: ism va telefon raqami forma maydonlarida.
// Ism profilda bo'lmasa — kiritiladi (buyurtmada profilga saqlanadi), bo'lsa — faqat ko'rsatiladi.
// Telefon raqami doim to'ldirilgan va o'zgartirib bo'lmaydi.
export const RecipientBlock = () => {
  const t = useTranslations();
  const { user, isPending } = useAuth();
  const { recipientName, recipientNameError, setRecipientName } = useCheckoutStore();

  const hasName = !!user?.full_name?.trim();
  const phone = user?.phone_number ? formatPhoneNumber(user.phone_number) : '';

  return (
    <Card className='flex items-start gap-3 p-4' variant='plain'>
      <div className='bg-muted rounded-md p-2'>
        <UserIcon className='text-primary' />
      </div>
      <div className='min-w-0 flex-1 space-y-3'>
        <CardTitle className='font-semibold'>{t('Recipient')}</CardTitle>
        {user ? (
          <div className='grid gap-3 sm:grid-cols-2'>
            <div className='space-y-1.5'>
              <Label className='text-muted-foreground text-xs' htmlFor='recipient-name'>
                {t('Name')}
              </Label>
              <Input
                className={cn(
                  hasName && 'bg-muted/60 cursor-default',
                  recipientNameError && 'border-destructive focus-visible:ring-destructive/30'
                )}
                aria-invalid={recipientNameError}
                id='recipient-name'
                maxLength={100}
                readOnly={hasName}
                value={hasName ? user.full_name : recipientName}
                autoComplete='name'
                onChange={(event) => setRecipientName(event.target.value)}
                placeholder={t('Enter your name')}
              />
              {recipientNameError && (
                <p className='text-destructive text-xs'>{t('Name is required')}</p>
              )}
            </div>
            <div className='space-y-1.5'>
              <Label className='text-muted-foreground text-xs' htmlFor='recipient-phone'>
                {t('Phone number')}
              </Label>
              <Input
                readOnly
                className='bg-muted/60 cursor-default'
                id='recipient-phone'
                tabIndex={-1}
                value={phone}
              />
            </div>
          </div>
        ) : (
          isPending && (
            <div className='grid gap-3 sm:grid-cols-2'>
              <Skeleton className='h-14 w-full' />
              <Skeleton className='h-14 w-full' />
            </div>
          )
        )}
      </div>
    </Card>
  );
};
