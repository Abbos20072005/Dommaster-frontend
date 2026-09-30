'use client';

import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { PasswordInput } from '@/components/ui/password-input';

import { useSecurityForm } from './hooks';

export const SecurityForm = () => {
  const t = useTranslations();
  const { form, state, functions } = useSecurityForm();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(functions.onSubmit)}>
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
        <FormField
          render={({ field }) => (
            <FormItem className='space-y-1'>
              <FormLabel>{t('Confirm password')}</FormLabel>
              <FormControl>
                <PasswordInput placeholder='********' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          name='passwordConfirm'
          control={form.control}
        />
        <Button type='submit' isLoading={state.isPending}>
          {t('Save')}
        </Button>
      </form>
    </Form>
  );
};
