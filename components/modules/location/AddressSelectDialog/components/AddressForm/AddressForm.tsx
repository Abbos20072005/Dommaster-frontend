'use client';

import { useTranslations } from 'next-intl';
import React from 'react';

import { LocationSelectMap } from '@/components/modules/location';
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
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';

import { useAddressForm } from './hooks';

interface Props {
  defaultValues?: Address;
  onSuccess?: (data: Address) => void;
}

export const AddressForm = ({ defaultValues, onSuccess }: Props) => {
  const t = useTranslations();
  const { form, functions, state } = useAddressForm({ defaultValues, onSuccess });

  return (
    <Form {...form}>
      <form className='space-y-4' onSubmit={form.handleSubmit(functions.onSubmit)}>
        <Button
          className={cn(
            'fixed inset-x-4 bottom-4 z-10 text-white sm:hidden',
            !form.formState.isDirty ? 'invisible' : 'visible'
          )}
          type='submit'
        >
          <Spinner show={state.isPending} />
          {t('Save')}
        </Button>
        <div className='flex items-end gap-4 px-4 sm:px-0'>
          <FormField
            render={({ field }) => (
              <FormItem className='flex-1'>
                <FormLabel>{t('Name')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('Name')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            name='name'
            control={form.control}
          />
          <Button
            className='hidden text-white sm:block'
            disabled={state.isPending || !form.formState.isDirty || !form.formState.isValid}
            type='submit'
          >
            {state.isPending ? <Spinner /> : t('Save')}
          </Button>
        </div>
        <FormField
          render={({ field }) => (
            <FormItem className='relative h-[calc(100svh-178px)] sm:h-[calc(80svh-200px)]'>
              <FormMessage />
              <FormControl>
                <LocationSelectMap value={field.value} onValueChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
          name='address'
          control={form.control}
        />
      </form>
    </Form>
  );
};
