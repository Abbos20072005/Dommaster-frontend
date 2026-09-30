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
              <FormItem className='flex flex-row items-center justify-start gap-2'>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(checked) => field.onChange(checked === true)}
                  />
                </FormControl>
                <FormLabel className='cursor-pointer'>{t('User')}</FormLabel>
              </FormItem>
            )}
            name='is_user'
            control={form.control}
          />
          <Button isLoading={state.isPending}>{t('Continue')}</Button>
        </form>
      </Form>
      <p className='text-muted-foreground text-center text-xs'>
        {t(
          'By continuing, you agree to the collection and processing of personal data and the user agreement'
        )}
      </p>
    </>
  );
};
