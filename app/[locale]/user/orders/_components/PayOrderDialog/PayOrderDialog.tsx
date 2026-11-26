'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LandmarkIcon } from 'lucide-react';
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
import { Button } from '@/components/ui/button';
import { SavedCardsList } from '@/app/[locale]/checkout/_components/PaymentMethodSelector/components/SavedCardsList';
import { trackPurchaseOnce } from '@/lib/analytics';
import { postPaymentHold } from '@/utils/api/requests';

interface Props extends React.ComponentProps<typeof DialogTrigger> {
  orderId: number;
}

/** Pays an order that is not paid yet: only online by card (Atmos), already chosen (BLD-549). */
export const PayOrderDialog = ({ orderId, children, ...props }: Props) => {
  const t = useTranslations();
  const queryClient = useQueryClient();
  const [open, setOpen] = React.useState(false);

  const payOnlineMutation = useMutation({
    mutationFn: postPaymentHold,
    onSuccess: () => {
      // `purchase`: an order paid later is a purchase when it is paid (once per order)
      void trackPurchaseOnce(orderId);
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    }
  });

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger {...props}>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('Choose payment method')}</DialogTitle>
          <DialogDescription>{t('Select how you want to pay for the order')}</DialogDescription>
        </DialogHeader>

        <div className='space-y-4'>
          <div className='border-primary/50 bg-primary/5 flex items-center gap-3 rounded-xl border-2 p-4'>
            <LandmarkIcon className='text-primary size-8 shrink-0' />
            <div className='space-y-1'>
              <div className='text-sm font-medium'>{t('Pay online by card')}</div>
              <div className='text-muted-foreground text-xs'>{t('Atmos payment')}</div>
            </div>
          </div>

          <SavedCardsList />
        </div>

        <div className='flex flex-col-reverse gap-2 sm:flex-row sm:justify-end'>
          <Button
            className='w-full sm:w-auto'
            isLoading={payOnlineMutation.isPending}
            onClick={() => payOnlineMutation.mutate({ data: { order_id: orderId } })}
          >
            {t('Pay')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
