'use client';

import { useTranslations } from 'next-intl';
import React from 'react';

import { YandexMap } from '@/components/modules/location';
import { isPointInPolygon } from '@/components/modules/location/helpers';
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
import { MAP } from '@/utils/constants';

import { useAddressForm } from './hooks';

interface Props {
  defaultValues?: Address;
  onSuccess?: (data: Address) => void;
}

export const AddressForm = ({ defaultValues, onSuccess }: Props) => {
  const t = useTranslations();
  const { form, functions, state } = useAddressForm({ defaultValues, onSuccess });

  const mapRef = React.useRef<ymaps.Map>(undefined);

  const coordinates = form.watch('coordinates');
  const isInsidePolygon = !!coordinates && isPointInPolygon(coordinates, MAP.availablePolygon);

  return (
    <Form {...form}>
      <form className='space-y-4' onSubmit={form.handleSubmit(functions.onSubmit)}>
        <Button
          className={cn(
            'fixed inset-x-4 bottom-4 z-10 text-white sm:hidden',
            !form.formState.isDirty ? 'invisible' : 'visible'
          )}
          disabled={state.isPending || !form.formState.isDirty || !isInsidePolygon}
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
            disabled={state.isPending || !form.formState.isDirty || !isInsidePolygon}
            type='submit'
          >
            {state.isPending ? <Spinner /> : t('Save')}
          </Button>
        </div>
        <div className='px-4 sm:px-0'>
          <p className='text-sm'>
            {state.locationName ? (
              isInsidePolygon ? (
                <>
                  <span>{t('Address')}: </span>
                  <span className='font-semibold'>{state.locationName}</span>
                </>
              ) : (
                <span className='text-destructive font-medium'>
                  {t('Location is outside the available area')}
                </span>
              )
            ) : (
              t('Select location on the map')
            )}
          </p>
        </div>
        <FormField
          render={({ field }) => (
            <FormItem className='h-[calc(100svh-178px)] sm:h-[400px]'>
              <FormMessage />
              <FormControl>
                <YandexMap
                  className='rounded-b-md'
                  mapRef={mapRef}
                  coordinates={field.value}
                  setCoordinates={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
          name='coordinates'
          control={form.control}
        />
      </form>
    </Form>
  );
};
