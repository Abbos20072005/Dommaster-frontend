'use client';

import { BanIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DialogClose } from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { LocationSelectMap } from '@/modules/location/LocationSelectMap';

import { useAddressForm } from './hooks';

interface Props {
  defaultValues?: Address;
  onSuccess?: (data: Address) => void;
}

/** The map with the search on the left; the name, the street and "make default" on the right. */
export const AddressForm = ({ defaultValues, onSuccess }: Props) => {
  const t = useTranslations();
  const { form, functions, state } = useAddressForm({ defaultValues, onSuccess });

  const address = form.watch('address');
  const outside = form.formState.errors.address?.message;

  return (
    <Form {...form}>
      <form className='grid gap-5' onSubmit={form.handleSubmit(functions.onSubmit)}>
        <div className='grid gap-5 px-4 sm:px-6 md:grid-cols-2'>
          <div className='grid content-start gap-3'>
            <FormField
              render={({ field }) => (
                <FormItem className='relative h-[300px] overflow-hidden rounded-xl border md:h-[400px]'>
                  <FormControl>
                    <LocationSelectMap value={field.value} onValueChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
              name='address'
              control={form.control}
            />
            {outside ? (
              <div
                className='flex gap-3 rounded-lg bg-[#FDECEC] p-3 text-[#B42318]'
                role='alert'
              >
                <BanIcon className='mt-0.5 size-5 shrink-0' />
                <span className='grid gap-0.5 text-[13px] leading-[18px]'>
                  <span className='text-sm font-bold'>{t('We do not deliver here yet')}</span>
                  <span>
                    {address?.location_name ? `${address.location_name}. ` : ''}
                    {t('Choose another address or pick up the order')}
                  </span>
                </span>
              </div>
            ) : (
              <div className='grid gap-0.5 text-[13px] leading-[18px]'>
                <span>
                  <span className='text-muted-foreground'>{t('Marker')}:</span>{' '}
                  <span className='font-bold'>{address?.location_name || '—'}</span>
                </span>
                <span className='text-muted-foreground'>{t('Tap the map to move the marker')}</span>
              </div>
            )}
          </div>

          <div className='grid content-start gap-4'>
            <FormField
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-bold'>{t('Address name')}</FormLabel>
                  <FormControl>
                    <Input
                      className='h-11'
                      placeholder={t('Address name placeholder')}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              name='name'
              control={form.control}
            />
            <FormField
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-bold'>{t('Street and house')}</FormLabel>
                  <FormControl>
                    <Input
                      className='h-11'
                      placeholder={t('Street and house placeholder')}
                      value={field.value.location_name}
                      onChange={(event) =>
                        field.onChange({ ...field.value, location_name: event.target.value })
                      }
                    />
                  </FormControl>
                  <FormDescription>{t('Filled in by the map marker')}</FormDescription>
                </FormItem>
              )}
              name='address'
              control={form.control}
            />
            <div className='grid grid-cols-2 gap-x-3 gap-y-4'>
              {(
                [
                  ['apartment', 'Apartment / office'],
                  ['intercom', 'Intercom'],
                  ['entrance', 'Entrance'],
                  ['floor', 'Floor']
                ] as const
              ).map(([name, label]) => (
                <FormField
                  key={name}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='font-bold'>{t(label)}</FormLabel>
                      <FormControl>
                        <Input className='h-11' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                  name={name}
                  control={form.control}
                />
              ))}
            </div>
            <FormField
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-bold'>{t('Courier comment')}</FormLabel>
                  <FormControl>
                    <Textarea
                      maxLength={500}
                      placeholder={t('Courier comment placeholder')}
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>{t('Courier comment hint')}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
              name='courier_comment'
              control={form.control}
            />
            <FormField
              render={({ field }) => (
                <FormItem>
                  <label className='flex w-fit cursor-pointer items-center gap-2.5 text-sm leading-5'>
                    <Checkbox
                      checked={field.value}
                      className='size-[18px] shrink-0'
                      disabled={defaultValues?.is_default}
                      onCheckedChange={(checked) => field.onChange(checked === true)}
                    />
                    <span>{t('Make default')}</span>
                  </label>
                </FormItem>
              )}
              name='is_default'
              control={form.control}
            />
          </div>
        </div>

        <div className='border-border flex justify-end gap-3 border-t px-4 py-4 sm:px-6'>
          <DialogClose asChild>
            <Button className='h-11 px-5' type='button' variant='muted'>
              {t('Cancel')}
            </Button>
          </DialogClose>
          <Button
            className='h-11 px-5 text-white'
            disabled={!form.formState.isValid}
            type='submit'
            isLoading={state.isPending}
          >
            {t('Save address')}
          </Button>
        </div>
      </form>
    </Form>
  );
};
