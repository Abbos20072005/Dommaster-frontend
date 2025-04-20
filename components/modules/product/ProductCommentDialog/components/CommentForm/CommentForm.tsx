'use client';

import { useTranslations } from 'next-intl';
import React from 'react';

import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Ratings } from '@/components/ui/rating';
import { Textarea } from '@/components/ui/textarea';

import { useCommentForm } from './hooks';

interface Props {
  defaultValues?: ProductComment;
  onSuccess?: (data: ProductCommentResponse) => void;
}

export const CommentForm = ({ onSuccess, defaultValues }: Props) => {
  const t = useTranslations();
  const { form, state, functions } = useCommentForm({ onSuccess, defaultValues });

  return (
    <Form {...form}>
      <form className='space-y-4' onSubmit={form.handleSubmit(functions.onSubmit)}>
        <FormField
          render={({ field }) => (
            <FormItem className='space-y-1'>
              <FormLabel>{t('Please rate this product overall')}</FormLabel>
              <FormControl>
                <Ratings
                  rating={field.value}
                  classNameIcon='text-secondary'
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          name='product_rating'
          control={form.control}
        />
        <FormField
          render={({ field }) => (
            <FormItem className='space-y-1'>
              <FormLabel>{t('Comment')}</FormLabel>
              <FormControl>
                <Textarea placeholder={t('Full name')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          name='comment'
          control={form.control}
        />
        <div className='flex justify-end gap-2'>
          <DialogClose asChild>
            <Button variant='outline'>{t('Cancel')}</Button>
          </DialogClose>
          <Button isLoading={state.isPending}>{t('Save')}</Button>
        </div>
      </form>
    </Form>
  );
};
