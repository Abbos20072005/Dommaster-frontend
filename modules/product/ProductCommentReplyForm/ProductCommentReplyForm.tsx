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

import { useCommentReplyForm } from './hooks';

interface Props {
  commentId: number;
  defaultValues?: ProductCommentReply;
  onCancel?: () => void;
  onSuccess?: (data: ProductCommentReplyResponse) => void;
}

export const ProductCommentReplyForm = ({
  onSuccess,
  onCancel,
  commentId,
  defaultValues
}: Props) => {
  const t = useTranslations();
  const { form, state, functions } = useCommentReplyForm({ onSuccess, commentId, defaultValues });

  return (
    <Form {...form}>
      <form className='space-y-4' onSubmit={form.handleSubmit(functions.onSubmit)}>
        <FormField
          render={({ field }) => (
            <FormItem className='space-y-1'>
              <FormLabel>{t('Comment')}</FormLabel>
              <FormControl>
                <Textarea placeholder={t('Write your comment')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          name='reply_comment'
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
