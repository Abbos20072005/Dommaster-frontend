import { useTranslations } from 'next-intl';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { PhoneInput } from '@/components/ui/phone-input';
import { Link } from '@/i18n/navigation';

import { useLoginForm } from './hooks';

interface Props {
  onSuccess?: (data: SendOtpResponse) => void;
}

export const LoginForm = ({ onSuccess }: Props) => {
  const t = useTranslations();
  const { form, state, functions } = useLoginForm({ onSuccess });

  return (
    <>
      <DialogHeader>
        <DialogTitle className='text-2xl'>{t('Login')}</DialogTitle>
        <DialogDescription>{t('Enter your phone number to receive an SMS code')}</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form className='grid gap-4' onSubmit={form.handleSubmit(functions.onSubmit)}>
          <FormField
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('Phone number')}</FormLabel>
                <FormControl>
                  <PhoneInput placeholder='+998 XX XXX XX XX' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            name='phone_number'
            control={form.control}
          />
          <FormField
            render={({ field }) => (
              <FormItem>
                <label className='flex cursor-pointer items-start gap-2.5 text-[13px] leading-5'>
                  <Checkbox
                    checked={field.value}
                    className='mt-0.5 size-[18px] shrink-0'
                    onCheckedChange={(checked) => field.onChange(checked === true)}
                  />
                  <span>
                    {t.rich('Login consent', {
                      oferta: (chunks) => (
                        <Link
                          className='text-primary underline'
                          href='/oferta'
                          rel='noreferrer'
                          target='_blank'
                        >
                          {chunks}
                        </Link>
                      ),
                      privacy: (chunks) => (
                        <Link
                          className='text-primary underline'
                          href='/privacy'
                          rel='noreferrer'
                          target='_blank'
                        >
                          {chunks}
                        </Link>
                      )
                    })}
                  </span>
                </label>
              </FormItem>
            )}
            name='consent'
            control={form.control}
          />
          {/* the code is not sent until the customer agrees */}
          <Button disabled={!form.watch('consent')} isLoading={state.isPending}>
            {t('Continue')}
          </Button>
        </form>
      </Form>
    </>
  );
};
