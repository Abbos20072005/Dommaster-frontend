'use client';

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
import { Textarea } from '@/components/ui/textarea';

import { useQuestionReplyForm } from './hooks';

interface Props {
  defaultValues?: ProductQuestionReply;
  questionId: number;
  onCancel?: () => void;
  onSuccess?: (data: ProductQuestionReplyResponse) => void;
}

export const ProductQuestionReplyForm = ({
  onSuccess,
  onCancel,
  questionId,
  defaultValues
}: Props) => {
  const t = useTranslations();
  const { form, state, functions } = useQuestionReplyForm({ onSuccess, questionId, defaultValues });

  return (
    <Form {...form}>
      <form className='space-y-4' onSubmit={form.handleSubmit(functions.onSubmit)}>
        <FormField
          render={({ field }) => (
            <FormItem className='space-y-1'>
              <FormLabel>{t('Answer')}</FormLabel>
              <FormControl>
                <Textarea placeholder={t('Write your answer')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          name='answer'
          control={form.control}
        />
        <div className='flex gap-2'>
          <Button size='sm' type='button' variant='outline' onClick={onCancel}>
            {t('Cancel')}
          </Button>
          <Button size='sm' isLoading={state.isPending}>
            {t('Save')}
          </Button>
        </div>
      </form>
    </Form>
  );
};
