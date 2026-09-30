'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LandmarkIcon, WalletIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { SavedCardsList } from '@/app/[locale]/checkout/_components/PaymentMethodSelector/components/SavedCardsList';
import { postOrderPay, postPaymentHold } from '@/utils/api/requests';

interface Props extends React.ComponentProps<typeof DialogTrigger> {
  orderId: number;
}

type PaymentChoice = 'online' | 'cod';
type CashMethod = 'cash' | 'card';

const paymentOptions = [
  { value: 'online' as const, icon: LandmarkIcon, titleKey: 'Pay online by card', descKey: 'Atmos payment' },
  { value: 'cod' as const, icon: WalletIcon, titleKey: 'Cash on delivery', descKey: 'Pay upon receipt' }
];

export const PayOrderDialog = ({ orderId, children, ...props }: Props) => {
  const t = useTranslations();
  const queryClient = useQueryClient();
  const [open, setOpen] = React.useState(false);
  const [paymentChoice, setPaymentChoice] = React.useState<PaymentChoice | null>(null);
  const [cashMethod, setCashMethod] = React.useState<CashMethod>('cash');

  const invalidateOrders = () => {
    queryClient.invalidateQueries({ queryKey: ['orders'] });
  };

  const payOnlineMutation = useMutation({
    mutationFn: postPaymentHold,
    onSuccess: () => {
      setOpen(false);
      invalidateOrders();
    }
  });

  const payCodMutation = useMutation({
    mutationFn: postOrderPay,
    onSuccess: () => {
      setOpen(false);
      invalidateOrders();
    }
  });

  const isPending = payOnlineMutation.isPending || payCodMutation.isPending;

  const handlePay = () => {
    if (paymentChoice === 'online') {
      payOnlineMutation.mutate({ data: { order_id: orderId } });
    } else if (paymentChoice === 'cod') {
      payCodMutation.mutate({
        data: { order_id: orderId, is_web: true, payment_type: 4, payment_method: cashMethod }
      });
    }
  };

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    if (!open) {
      setPaymentChoice(null);
      setCashMethod('cash');
    }
  };

  return (
    <Dialog onOpenChange={handleOpenChange} open={open}>
      <DialogTrigger {...props}>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('Choose payment method')}</DialogTitle>
          <DialogDescription>{t('Select how you want to pay for the order')}</DialogDescription>
        </DialogHeader>

        <div className='space-y-4'>
          <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
            {paymentOptions.map(({ value, icon: Icon, titleKey, descKey }) => (
              <button
                key={value}
                type='button'
                className={cn(
                  'flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 p-6 text-center transition-colors',
                  paymentChoice === value
                    ? 'border-primary/50 bg-primary/5'
                    : 'border-muted hover:bg-accent/50'
                )}
                onClick={() => setPaymentChoice(value)}
              >
                <Icon
                  className={cn(
                    'size-8',
                    paymentChoice === value ? 'text-primary' : 'text-muted-foreground'
                  )}
                />
                <div className='space-y-1'>
                  <div className='text-sm font-medium'>{t(titleKey)}</div>
                  <div className='text-muted-foreground text-xs'>{t(descKey)}</div>
                </div>
              </button>
            ))}
          </div>

          {paymentChoice === 'online' && <SavedCardsList />}

          {paymentChoice === 'cod' && (
            <div className='space-y-3'>
              <p className='text-muted-foreground text-xs font-medium'>
                {t('Payment method on delivery')}
              </p>
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
        </div>

        <div className='flex flex-col-reverse gap-2 sm:flex-row sm:justify-end'>
          <Button
            className='w-full sm:w-auto'
            disabled={!paymentChoice}
            isLoading={isPending}
            onClick={handlePay}
          >
            {t('Pay')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
