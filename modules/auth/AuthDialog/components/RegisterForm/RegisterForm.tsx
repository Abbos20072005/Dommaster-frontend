import { useTranslations } from 'next-intl';
import React from 'react';

import type { AuthTabs } from '@/modules/auth/AuthDialog/types';

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
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import { PhoneInput } from '@/components/ui/phone-input';
import { Link } from '@/i18n/navigation';

import { useRegisterForm } from './hooks';

interface Props {
  onSuccess?: (data: RegisterResponse) => void;
  setAuthTab: (tab: AuthTabs) => void;
}

export const RegisterForm = ({ onSuccess, setAuthTab }: Props) => {
  const t = useTranslations();
  const { form, state, functions } = useRegisterForm(onSuccess);

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
              <FormItem>
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
              <FormItem>
                <FormLabel>{t('Confirm password')}</FormLabel>
                <FormControl>
                  <PasswordInput placeholder='********' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            name='confirm_password'
            control={form.control}
          />
          <Button isLoading={state.isPending}>{t('Register')}</Button>
        </form>
      </Form>
      <Button className='w-full' variant='ghost' onClick={() => setAuthTab('login')}>
        {t('Already have an account')}
      </Button>
      <Link href='/terms' className='block'>
        <p className='text-muted-foreground hover:text-foreground text-center text-xs underline'>
          {t(
            'By continuing, you agree to the collection and processing of personal data and the user agreement'
          )}
        </p>
      </Link>
    </>
  );
};
