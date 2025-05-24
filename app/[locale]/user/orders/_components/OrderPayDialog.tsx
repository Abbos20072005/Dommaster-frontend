'use client';

import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import { postOrderPay } from '@/utils/api/requests';
import { paymentMethods } from '@/utils/constants/paymentMethods';

interface Props extends React.ComponentProps<typeof DialogTrigger> {
  children: React.ReactNode;
  orderId: number;
}

export const OrderPayDialog = ({ orderId, children, ...props }: Props) => {
  const t = useTranslations();
  const [method, setMethod] = React.useState('1');
  const [_, setOpen] = React.useState(false);

  const postOrderPayMutation = useMutation({
    mutationFn: postOrderPay,
    onSuccess: ({ data }) => {
      setOpen(false);
      window.location.replace(data.result);
    }
  });

  const onPay = () => {
    postOrderPayMutation.mutate({
      data: { order_id: orderId, payment_type: +method, is_web: true }
    });
  };

  return (
    <Dialog onOpenChange={setOpen}>
      <DialogTrigger {...props}>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('Payment method')}</DialogTitle>
          <DialogDescription>
            {t('Please choose a payment method to pay for your order')}
          </DialogDescription>
        </DialogHeader>
        <RadioGroup
          className='grid w-full grid-cols-3 gap-2'
          value={method}
          onValueChange={setMethod}
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
                  { 'border-secondary/50': method === item.value }
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
        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline'>{t('Cancel')}</Button>
          </DialogClose>
          <Button isLoading={postOrderPayMutation.isPending} onClick={onPay}>
            {t('Pay')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
