import { useTranslations } from 'next-intl';
import React from 'react';

import { Button } from '@/components/ui/button';
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

import { useForgotPasswordForm } from './hooks';

interface Props {
  onSuccess?: (data: ForgotPasswordResponse) => void;
}

export const ForgotPasswordForm = ({ onSuccess }: Props) => {
  const t = useTranslations();
  const { form, state, functions } = useForgotPasswordForm({ onSuccess });

  return (
    <>
      <DialogHeader>
        <DialogTitle className='text-2xl'>{t('Forgot password')}</DialogTitle>
        <DialogDescription>
          {t('A password reset code will be sent to your phone number')}
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form className='grid gap-4' onSubmit={form.handleSubmit(functions.onSubmit)}>
          <FormField
            render={({ field }) => (
              <FormItem className='min-h-40'>
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
          <Button className='mt-2' isLoading={state.isPending}>
            {t('Get code')}
          </Button>
        </form>
      </Form>
    </>
  );
};
