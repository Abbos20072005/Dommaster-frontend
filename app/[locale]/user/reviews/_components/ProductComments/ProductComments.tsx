'use client';

import { useFormatDate } from '@/hooks';
import { MessageSquareIcon, PencilIcon, StarIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { ProductCommentDialog } from '@/modules/product';

import { CommentReplies } from './components';
import { useProductComments } from './hooks';

export const ProductComments = () => {
  const t = useTranslations();
  const formatDate = useFormatDate();
  const { state, functions } = useProductComments();

  if (state.isLoading) {
    return (
      <div className='grid gap-3' aria-busy='true'>
        {[0, 1].map((index) => (
          <Skeleton key={index} className='h-40 w-full rounded-xl' />
        ))}
      </div>
    );
  }

  if (!state.comments?.length) {
    return (
      <div className='border-border grid justify-items-center gap-2 rounded-xl border bg-white px-6 py-14 text-center'>
        <span className='bg-primary/10 text-primary mb-2 flex size-14 items-center justify-center rounded-full'>
          <MessageSquareIcon className='size-6' />
        </span>
        <h2 className='text-xl leading-[26px] font-bold'>{t('No reviews yet title')}</h2>
        <p className='max-w-[440px] text-sm leading-5 text-[#4A5563]'>{t('No reviews yet text')}</p>
        <Link
          href='/user/orders/history'
          className='bg-primary hover:bg-primary/90 mt-3 inline-flex h-11 items-center rounded-lg px-5 text-sm font-bold text-white'
        >
          {t('Purchase history')}
        </Link>
      </div>
    );
  }

  return (
    <div className='grid gap-3'>
      {state.comments.map((comment) => (
        <article
          key={comment.id}
          className='border-border grid gap-4 rounded-xl border bg-white p-5 pb-3'
        >
          <div className='grid gap-2.5'>
            <div className='flex items-center gap-3'>
              <span className='flex gap-0.5'>
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon
                    key={star}
                    className={cn(
                      'size-4',
                      star <= comment.product_rating
                        ? 'fill-secondary text-secondary'
                        : 'fill-[#E1E5EB] text-[#E1E5EB]'
                    )}
                  />
                ))}
              </span>
              <span className='text-muted-foreground text-[13px] leading-[18px]'>
                {formatDate(comment.created_at, 'dd MMMM yyyy')}
              </span>
            </div>
            {comment.comment && (
              <p className='max-w-[780px] text-[15px] leading-[22px] text-pretty'>
                {comment.comment}
              </p>
            )}
            {comment.images.length > 0 && (
              <div className='flex gap-2 overflow-x-auto'>
                {comment.images.map((image) => (
                  <span
                    key={image.id}
                    className='border-border relative size-[72px] shrink-0 overflow-hidden rounded-lg border'
                  >
                    <Image
                      fill
                      alt={comment.comment || 'Buildex'}
                      className='object-cover'
                      sizes='72px'
                      src={image.image}
                    />
                  </span>
                ))}
              </div>
            )}
          </div>
          <CommentReplies comment={comment} />
          <div className='-ml-3 flex gap-1'>
            <ProductCommentDialog asChild defaultValues={comment}>
              <Button className='text-primary hover:bg-primary/5' size='sm' variant='ghost'>
                <PencilIcon />
                {t('Edit')}
              </Button>
            </ProductCommentDialog>
          </div>
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
