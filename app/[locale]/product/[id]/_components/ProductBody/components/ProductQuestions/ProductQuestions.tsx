'use client';

import { format } from 'date-fns';
import { EditIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { QuestionReplies } from '@/app/[locale]/product/[id]/_components/ProductBody/components/ProductQuestions/components/QuestionReplies/QuestionReplies';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { AuthDialog, useAuth } from '@/modules/auth';
import { ProductQuestionDialog } from '@/modules/product';

import { useProductQuestions } from './hooks';

interface Props {
  product: Product;
}

export const ProductQuestions = ({ product }: Props) => {
  const t = useTranslations();
  const { state, functions } = useProductQuestions(product);
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
      <div className='flex flex-col items-center'>
        <p className='mb-3 hidden text-3xl font-bold md:block'>{t('Customer questions')}</p>
        <p className='text-muted-foreground mb-6 text-sm'>
          {t('Be the first to ask a question about this product')}
        </p>
        {user ? (
          <ProductQuestionDialog asChild>
            <Button>{t('Ask a question')}</Button>
          </ProductQuestionDialog>
        ) : (
          <AuthDialog asChild>
            <Button>{t('Ask a question')}</Button>
          </AuthDialog>
        )}
      </div>
    );
  }

  return (
    <div>
      <p className='mb-4 hidden text-3xl font-bold md:mb-8 md:block'>{t('Customer questions')}</p>
      <div className='mb-4 md:mb-8'>
        {user ? (
          <ProductQuestionDialog asChild>
            <Button>{t('Ask a question')}</Button>
          </ProductQuestionDialog>
        ) : (
          <AuthDialog asChild>
            <Button>{t('Ask a question')}</Button>
          </AuthDialog>
        )}
      </div>
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
    </div>
  );
};
