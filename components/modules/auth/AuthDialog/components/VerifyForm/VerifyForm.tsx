import type { HTMLAttributes } from 'react';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Spinner } from '@/components/ui/spinner';
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
  const { form, state, functions } = useVerifyForm({ otpKey, setOtpKey, onSuccess });

  return (
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
              disabled={state.isResendPending}
              size='sm'
              type='button'
              variant='ghost'
              onClick={functions.onResendCode}
            >
              {state.isResendPending && <Spinner />}
              Resend code
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
              Back
            </Button>
            <Button className='mt-2' disabled={state.isPending} type='submit'>
              {state.isPending && <Spinner />}
              Verify
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
