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
import { Input } from '@/components/ui/input';
import { PhoneInput } from '@/components/ui/phone-input';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';

import { usePersonalInfoForm } from './hooks';

interface Props {
  defaultValues?: User;
  disabled?: boolean;
}

export const PersonalInfoForm = ({ defaultValues, disabled }: Props) => {
  const t = useTranslations();
  const { form, state, functions } = usePersonalInfoForm({ defaultValues, disabled });

  return (
    <Form {...form}>
      <form className='space-y-4' onSubmit={form.handleSubmit(functions.onSubmit)}>
        <div className='grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4'>
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
              <FormItem className='space-y-1'>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input placeholder='john@example.com' {...field} />
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
        </div>
        <div className='flex justify-end'>
          <Button
            className={cn({
              'invisible opacity-0': !form.formState.isDirty
            })}
            disabled={state.isPending}
            type='submit'
          >
            {state.isPending && <Spinner />}
            {t('Save')}
          </Button>
        </div>
      </form>
    </Form>
  );
};
