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
import { PasswordInput } from '@/components/ui/password-input';

import { useResetPasswordForm } from './hooks';

interface Props {
  resetToken: string;
  onSuccess?: (data: RegisterResponse) => void;
}

export const ResetPasswordForm = ({ onSuccess, resetToken }: Props) => {
  const t = useTranslations();
  const { form, state, functions } = useResetPasswordForm({ onSuccess, resetToken });

  return (
    <>
      <DialogHeader>
        <DialogTitle className='text-2xl'>{t('Register')}</DialogTitle>
        <DialogDescription>{t('Enter your credentials to register')}</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form className='grid gap-4' onSubmit={form.handleSubmit(functions.onSubmit)}>
          <FormField
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('New password')}</FormLabel>
                <FormControl>
                  <PasswordInput placeholder='********' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            name='new_password'
            control={form.control}
          />
          <FormField
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('Confirm new password')}</FormLabel>
                <FormControl>
                  <PasswordInput placeholder='********' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            name='confirm_new_password'
            control={form.control}
          />
          <Button isLoading={state.isPending}>{t('Register')}</Button>
        </form>
      </Form>
    </>
  );
};
