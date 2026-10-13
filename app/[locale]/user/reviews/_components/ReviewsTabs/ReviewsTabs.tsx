'use client';

import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import React from 'react';

import { cn } from '@/lib/utils';
import { getMyComments, getMyQuestions } from '@/utils/api/requests';

import { ProductComments } from '../ProductComments/ProductComments';
import { ProductQuestions } from '../ProductQuestions/ProductQuestions';
import { PendingReviews, usePendingReviews } from '../PendingReviews/PendingReviews';

type Tab = 'reviews' | 'questions' | 'pending';

/** Three tabs with counters: the reviews, the questions and the products waiting for a review. */
export const ReviewsTabs = () => {
  const t = useTranslations();
  const [tab, setTab] = React.useState<Tab>('reviews');

  const reviewsCount = useQuery({
    queryKey: ['myComments', 'count'],
    queryFn: () => getMyComments({ config: { params: { page: 1, page_size: 1 } } })
  }).data?.data.result.totalElements;
  const questionsCount = useQuery({
    queryKey: ['myQuestions', 'count'],
    queryFn: () => getMyQuestions({ config: { params: { page: 1, page_size: 1 } } })
  }).data?.data.result.totalElements;
  const pending = usePendingReviews();

  const tabs: { value: Tab; label: string; count?: number }[] = [
    { value: 'reviews', label: t('Reviews tab'), count: reviewsCount },
    { value: 'questions', label: t('Questions tab'), count: questionsCount },
    { value: 'pending', label: t('Awaiting review'), count: pending.data?.length }
  ];

  return (
    <div className='grid gap-5'>
      <div
        className='border-border inline-flex gap-1 justify-self-start rounded-[10px] border bg-[#EDF0F5] p-1'
        role='tablist'
      >
        {tabs.map((item) => (
          <button
            aria-selected={tab === item.value}
            className={cn(
              'inline-flex h-9 items-center rounded-lg px-3 text-sm font-semibold transition-colors md:px-4',
              tab === item.value
                ? 'text-foreground bg-white shadow-sm'
                : 'text-[#4A5563] hover:text-foreground'
            )}
            key={item.value}
            role='tab'
            type='button'
            onClick={() => setTab(item.value)}
          >
            {item.label}
            {item.count !== undefined && ` (${item.count})`}
          </button>
        ))}
      </div>

      {tab === 'reviews' && <ProductComments />}
      {tab === 'questions' && <ProductQuestions />}
      {tab === 'pending' && <PendingReviews query={pending} />}
    </div>
  );
};
