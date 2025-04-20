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
import { Textarea } from '@/components/ui/textarea';

import { useQuestionForm } from './hooks';

interface Props {
  defaultValues?: ProductQuestion;
  onSuccess?: (data: ProductQuestionResponse) => void;
}

export const QuestionForm = ({ onSuccess, defaultValues }: Props) => {
  const t = useTranslations();
  const { form, state, functions } = useQuestionForm({ onSuccess, defaultValues });

  return (
    <Form {...form}>
      <form className='space-y-4' onSubmit={form.handleSubmit(functions.onSubmit)}>
        <FormField
          render={({ field }) => (
            <FormItem className='space-y-1'>
              <FormLabel>{t('Question')}</FormLabel>
              <FormControl>
                <Textarea placeholder={`${t('Enter your question')}...`} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          name='question'
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
