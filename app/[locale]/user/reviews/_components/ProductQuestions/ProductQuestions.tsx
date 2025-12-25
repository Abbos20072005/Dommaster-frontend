'use client';

import { format } from 'date-fns';
import { EditIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { useAuth } from '@/modules/auth';
import { ProductQuestionDialog } from '@/modules/product';

import { QuestionReplies } from './components/QuestionReplies/QuestionReplies';
import { useProductQuestions } from './hooks';

export const ProductQuestions = () => {
  const t = useTranslations();
  const { state, functions } = useProductQuestions();
  const { user } = useAuth();

  if (state.isLoading) {
    return (
      <div className='flex justify-center py-20'>
        <Spinner />
      </div>
    );
  }

  if (state.questions?.length === 0) {
    return (
      <div>
        <p className='text-muted-foreground mb-6 text-sm'>
          {t('There are no questions from you on the site yet')}
        </p>
      </div>
    );
  }

  return (
    <div className='space-y-6 text-sm md:space-y-10'>
      {state.questions?.map((question) => (
        <article key={question.id} className='space-y-3'>
          <div>
            <div className='mb-1 flex items-center gap-2'>
              <span className='font-bold'>{question.customer.full_name}</span>
              {user?.id === question.customer.id && (
                <ProductQuestionDialog asChild defaultValues={question}>
                  <Button size='iconSm' variant='ghost'>
                    <EditIcon />
                  </Button>
                </ProductQuestionDialog>
              )}
            </div>
            <div className='flex'>
              <span className='text-muted-foreground text-xs italic'>
                {format(question.created_at, 'dd MMMM yyyy')}
              </span>
            </div>
          </div>
          <p className='text-sm'>{question.question}</p>
          <QuestionReplies question={question} />
        </article>
      ))}
      {state.hasNextPage && (
        <Button
          className='w-full'
          disabled={state.isFetchingNextPage}
          size='sm'
          variant='outline'
          onClick={functions.onLoadMore}
        >
          <Spinner show={state.isFetchingNextPage} />
          {t('Load more')}
        </Button>
      )}
    </div>
  );
};
