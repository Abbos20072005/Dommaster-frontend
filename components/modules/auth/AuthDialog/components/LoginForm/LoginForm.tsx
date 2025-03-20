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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { useLoginForm } from './hooks';

export const LoginForm = () => {
  const t = useTranslations();
  const [tab, setTab] = React.useState<'email' | 'phone'>('email');
  const { form, state, functions } = useLoginForm(tab === 'email');

  return (
    <Tabs value={tab} onValueChange={setTab as any}>
      <TabsList className='mb-2 w-full'>
        <TabsTrigger className='flex-1' value='email'>
          {t('By E-mail')}
        </TabsTrigger>
        <TabsTrigger className='flex-1' value='phone'>
          {t('By phone')}
        </TabsTrigger>
      </TabsList>
      <Form {...form}>
        <form className='grid gap-6' onSubmit={form.handleSubmit(functions.onSubmit)}>
          <TabsContent asChild value='phone'>
            <FormField
              render={({ field }) => (
                <FormItem className='space-y-1'>
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
          </TabsContent>
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
          <Button className='mt-2' isLoading={state.pending.login}>
            {t('Login')}
          </Button>
        </form>
      </Form>
    </Tabs>
  );
};
