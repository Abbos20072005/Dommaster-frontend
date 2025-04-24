'use client';

import { format } from 'date-fns';
import { EditIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { ProductCommentDialog } from '@/components/modules/product';
import { Button } from '@/components/ui/button';
import { Ratings } from '@/components/ui/rating';
import { Spinner } from '@/components/ui/spinner';

import { useProductComments } from './hooks';

export const ProductComments = () => {
  const t = useTranslations();
  const { state, functions } = useProductComments();

  if (state.isLoading) {
    return (
      <div className='flex justify-center py-20'>
        <Spinner />
      </div>
    );
  }

  if (state.comments?.length === 0) {
    return (
      <div>
        <p className='text-muted-foreground text-sm'>
          {t('There are no reviews from you on the site yet')}
        </p>
      </div>
    );
  }

  return (
    <div className='space-y-6 text-sm md:space-y-10'>
      {state.comments?.map((comment) => (
        <article key={comment.id} className='space-y-3'>
          <div>
            <div className='mb-1 flex items-center gap-2'>
              <span className='font-bold'>{comment.customer.full_name}</span>
              <Ratings
                className='gap-1'
                rating={comment.product_rating}
                classNameIcon='text-secondary size-3.5'
              />
              <ProductCommentDialog asChild defaultValues={comment}>
                <Button size='iconSm' variant='ghost'>
                  <EditIcon />
                </Button>
              </ProductCommentDialog>
            </div>
            <div className='flex'>
              <span className='text-muted-foreground text-xs italic'>
                {format(comment.created_at, 'dd MMMM yyyy')}
              </span>
            </div>
          </div>
          <p className='text-sm'>{comment.comment}</p>
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
