'use client';

import { format } from 'date-fns';
import { EditIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Ratings } from '@/components/ui/rating';
import { Spinner } from '@/components/ui/spinner';
import { ProductCommentDialog } from '@/modules/product';

import { CommentReplies } from './components';
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
          {comment.images.length > 0 && (
            <div className='flex gap-2 overflow-x-auto'>
              {comment.images.map((image) => (
                <Image
                  key={image.id}
                  alt={comment.comment}
                  className='size-20 rounded-md object-cover'
                  height={140}
                  src={image.image}
                  width={160}
                />
              ))}
            </div>
          )}
          <p className='text-sm'>{comment.comment}</p>
          <CommentReplies comment={comment} />
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
