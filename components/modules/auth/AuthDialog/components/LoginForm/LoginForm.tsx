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
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import { PhoneInput } from '@/components/ui/phone-input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import type { AuthTabs } from '../../types';

import { useLoginForm } from './hooks';

interface Props {
  onSuccess?: (data: LoginResponse) => void;
  setAuthTab: (tab: AuthTabs) => void;
}

export const LoginForm = ({ onSuccess, setAuthTab }: Props) => {
  const t = useTranslations();
  const [tab, setTab] = React.useState<'email' | 'phone'>('phone');
  const { form, state, functions } = useLoginForm({ onSuccess, withEmail: tab === 'email' });

  return (
    <>
      <DialogHeader>
        <DialogTitle className='text-2xl'>{t('Login')}</DialogTitle>
        <DialogDescription>{t('Login to continue')}</DialogDescription>
      </DialogHeader>
      <Tabs value={tab} onValueChange={setTab as any}>
        <TabsList className='w-full'>
          <TabsTrigger className='flex-1' value='phone'>
            {t('By phone')}
          </TabsTrigger>
          <TabsTrigger className='flex-1' value='email'>
            {t('By E-mail')}
          </TabsTrigger>
        </TabsList>
        <Form {...form}>
          <form className='grid gap-4' onSubmit={form.handleSubmit(functions.onSubmit)}>
            <TabsContent asChild value='phone'>
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
            </TabsContent>
            <TabsContent asChild value='email'>
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
            </TabsContent>
            <FormField
              render={({ field }) => (
                <FormItem>
                  <div className='flex items-center justify-between'>
                    <FormLabel>{t('Password')}</FormLabel>
                    <button
                      className='text-secondary h-4 text-sm hover:underline'
                      type='button'
                      onClick={() => setAuthTab?.('forgotPassword')}
                    >
                      {t('Forgot password?')}
                    </button>
                  </div>
                  <FormControl>
                    <PasswordInput placeholder='********' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              name='password'
              control={form.control}
            />
            <Button className='mt-2' isLoading={state.pending.login}>
              {t('Login')}
            </Button>
          </form>
        </Form>
      </Tabs>
      <Button className='w-full' variant='ghost' onClick={() => setAuthTab('register')}>
        {t('Register')}
      </Button>
    </>
  );
};
