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
import { PhoneInput } from '@/components/ui/phone-input';

import { useRegisterForm } from './hooks';

export const RegisterForm = () => {
  const t = useTranslations();
  const { form, state, functions } = useRegisterForm();

  return (
    <Form {...form}>
      <form className='grid gap-6' onSubmit={form.handleSubmit(functions.onSubmit)}>
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
          name='password_confirm'
          control={form.control}
        />
        <Button className='mt-2' isLoading={state.isPending}>
          {t('Register')}
        </Button>
      </form>
    </Form>
  );
};
