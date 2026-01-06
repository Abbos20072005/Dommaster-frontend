import type { HTMLAttributes } from 'react';

import { useTranslations } from 'next-intl';
import React from 'react';

import { Button } from '@/components/ui/button';
import { DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { cn } from '@/lib/utils';

import { useVerifyForm } from './hooks';

interface Props extends HTMLAttributes<HTMLDivElement> {
  otpKey: string;
  onCancel?: () => void;
  onSuccess?: (data: VerifyResponse) => void;
  setOtpKey: (otpKey: string) => void;
}

export const VerifyForm = ({
  otpKey,
  setOtpKey,
  className,
  onCancel,
  onSuccess,
  ...props
}: Props) => {
  const t = useTranslations();
  const { form, state, functions } = useVerifyForm({ otpKey, setOtpKey, onSuccess });

  return (
    <>
      <DialogHeader className='mb-6'>
        <DialogTitle className='text-2xl'>{t('Verify')}</DialogTitle>
        <DialogDescription>{t('We have send sms code to your phone number')}.</DialogDescription>
      </DialogHeader>
      <div className={cn('grid gap-6', className)} {...props}>
        <Form {...form}>
          <form className='grid gap-3' onSubmit={form.handleSubmit(functions.onSubmit)}>
            <FormField
              render={({ field }) => (
                <FormItem className='flex flex-col items-center'>
                  <FormControl>
                    <InputOTP maxLength={5} {...field} className='flex justify-center'>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              name='otp_code'
              control={form.control}
            />
            {state.showResetButton ? (
              <Button
                className='mx-auto w-fit'
                size='sm'
                type='button'
                variant='ghost'
                isLoading={state.isResendPending}
                onClick={functions.onResendCode}
              >
                {t('Resend code')}
              </Button>
            ) : (
              <div className='text-muted-foreground h-8 text-center'>
                {state.minutesLeftToNewReset}:{state.secondsLeftToNewReset}
              </div>
            )}
            <div className='grid grid-cols-2 gap-3'>
              <Button
                className='mt-2'
                disabled={state.isPending}
                type='button'
                variant='outline'
                onClick={onCancel}
              >
                {t('Back')}
              </Button>
              <Button className='mt-2' type='submit' isLoading={state.isPending}>
                {t('Verify')}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};
