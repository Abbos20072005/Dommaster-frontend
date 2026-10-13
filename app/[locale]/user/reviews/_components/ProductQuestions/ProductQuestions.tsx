'use client';

import { useFormatDate } from '@/hooks';
import { CircleHelpIcon, PencilIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Link } from '@/i18n/navigation';
import { useAuth } from '@/modules/auth';
import { ProductQuestionDialog } from '@/modules/product';

import { QuestionReplies } from './components/QuestionReplies/QuestionReplies';
import { useProductQuestions } from './hooks';

export const ProductQuestions = () => {
  const t = useTranslations();
  const formatDate = useFormatDate();
  const { state, functions } = useProductQuestions();
  const { user } = useAuth();

  if (state.isLoading) {
    return (
      <div className='grid gap-3' aria-busy='true'>
        {[0, 1].map((index) => (
          <Skeleton key={index} className='h-32 w-full rounded-xl' />
        ))}
      </div>
    );
  }

  if (!state.questions?.length) {
    return (
      <div className='border-border grid justify-items-center gap-2 rounded-xl border bg-white px-6 py-14 text-center'>
        <span className='bg-primary/10 text-primary mb-2 flex size-14 items-center justify-center rounded-full'>
          <CircleHelpIcon className='size-6' />
        </span>
        <h2 className='text-xl leading-[26px] font-bold'>{t('No questions yet title')}</h2>
        <p className='max-w-[440px] text-sm leading-5 text-[#4A5563]'>
          {t('No questions yet text')}
        </p>
        <Link
          href='/catalog'
          className='bg-primary hover:bg-primary/90 mt-3 inline-flex h-11 items-center rounded-lg px-5 text-sm font-bold text-white'
        >
          {t('Go to catalog')}
        </Link>
      </div>
    );
  }

  return (
    <div className='grid gap-3'>
      {state.questions.map((question) => (
        <article
          key={question.id}
          className='border-border grid gap-4 rounded-xl border bg-white p-5'
        >
          <div className='grid gap-1'>
            <span className='text-muted-foreground text-[13px] leading-[18px]'>
              {t('Your question')} · {formatDate(question.created_at, 'dd MMMM yyyy')}
            </span>
            <p className='max-w-[780px] text-[15px] leading-[22px] text-pretty'>
              {question.question}
            </p>
          </div>
          {question.reply_count === 0 && (
            <span className='text-muted-foreground text-[13px] leading-[18px]'>
              {t('Answer will appear here')}
            </span>
          )}
          <QuestionReplies question={question} />
          {!!user && user.id === question.customer?.id && (
            <div className='-ml-3 flex gap-1'>
              <ProductQuestionDialog asChild defaultValues={question}>
                <Button className='text-primary hover:bg-primary/5' size='sm' variant='ghost'>
                  <PencilIcon />
                  {t('Edit')}
                </Button>
              </ProductQuestionDialog>
            </div>
          )}
        </article>
      ))}
      {state.hasNextPage && (
        <Button
          className='w-full'
          size='sm'
          variant='outline'
          isLoading={state.isFetchingNextPage}
          onClick={functions.onLoadMore}
        >
          {t('Load more')}
        </Button>
      )}
    </div>
  );
};
