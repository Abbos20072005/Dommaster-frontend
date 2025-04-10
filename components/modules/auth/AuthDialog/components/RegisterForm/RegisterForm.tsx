import { useTranslations } from 'next-intl';
import React from 'react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import { PhoneInput } from '@/components/ui/phone-input';

import { useRegisterForm } from './hooks';

interface Props {
  onSuccess?: (data: RegisterResponse) => void;
}

export const RegisterForm = ({ onSuccess }: Props) => {
  const t = useTranslations();
  const { form, state, functions } = useRegisterForm(onSuccess);

  return (
    <Form {...form}>
      <form className='grid gap-6' onSubmit={form.handleSubmit(functions.onSubmit)}>
        <FormField
          render={({ field }) => (
            <FormItem className='space-y-1'>
              <FormLabel>{t('Full name')}</FormLabel>
              <FormControl>
                <Input placeholder={t('Full name')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          name='full_name'
          control={form.control}
        />
        <FormField
          render={({ field }) => (
            <FormItem className='flex-1 space-y-1'>
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
            <FormItem className='space-y-1'>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input type='email' placeholder='john@example.com' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          name='email'
          control={form.control}
        />
        <FormField
          render={({ field }) => (
            <FormItem className='space-y-1'>
              <FormLabel>{t('Password')}</FormLabel>
              <FormControl>
                <PasswordInput placeholder='********' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          name='password'
          control={form.control}
        />
        <Button className='mt-2' isLoading={state.isPending}>
          {t('Register')}
        </Button>
      </form>
    </Form>
  );
};
