'use client';

import { format } from 'date-fns';
import { EditIcon, StarIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Ratings } from '@/components/ui/rating';
import { Spinner } from '@/components/ui/spinner';
import { AuthDialog, useAuth } from '@/modules/auth';
import { ProductCommentDialog } from '@/modules/product';

import { CommentReplies } from './components/CommentReplies/CommentReplies';
import { useProductComments } from './hooks';

interface Props {
  product: Product;
}

export const ProductComments = ({ product }: Props) => {
  const t = useTranslations();
  const { state, functions } = useProductComments(product);
  const { user } = useAuth();

  if (state.isLoading) {
    return (
      <div className='flex justify-center py-20'>
        <Spinner />
      </div>
    );
  }

  if (state.comments?.length === 0) {
    return (
      <div className='flex flex-col items-center'>
        <p className='mb-3 hidden text-3xl font-bold md:block'>{t('Customer reviews')}</p>
        <p className='text-muted-foreground mb-6 text-sm'>
          {t('Be the first to review this product')}
        </p>
        {user ? (
          <ProductCommentDialog asChild>
            <Button>{t('Write a review')}</Button>
          </ProductCommentDialog>
        ) : (
          <AuthDialog asChild>
            <Button>{t('Write a review')}</Button>
          </AuthDialog>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className='flex flex-col gap-4 md:flex-row'>
        <div className='flex-1'>
          <div className='mb-4 md:mb-8'>
            <p className='hidden text-3xl font-bold md:block'>{t('Customer reviews')}</p>
            <div className='flex items-center gap-3 pt-3'>
              <Ratings
                className='gap-1'
                rating={product.rating}
                classNameIcon='text-secondary size-3.5'
              />
              {!!product.rating && (
                <p className='text-muted-foreground space-x-1 text-sm italic'>
                  <span>
                    {product.comments_quantity} {t('reviews')}
                  </span>
                  <span>|</span>
                  <span>{t('{count} out of 5', { count: String(product.rating.toFixed(1)) })}</span>
                </p>
              )}
            </div>
          </div>
          {!product.is_commented && (
            <div className='mb-4 md:mb-8'>
              {user ? (
                <ProductCommentDialog asChild>
                  <Button>{t('Write a review')}</Button>
                </ProductCommentDialog>
              ) : (
                <AuthDialog asChild>
                  <Button>{t('Write a review')}</Button>
                </AuthDialog>
              )}
            </div>
          )}
        </div>
        {product.comment_ratings && product.comments_quantity && (
          <div className='mb-6 w-full basis-1/3 space-y-1'>
            {Object.entries(product.comment_ratings)
              .sort(([a], [b]) => +b - +a)
              .map(([key, value]) => (
                <div key={key} className='flex items-center gap-1'>
                  <StarIcon className='text-primary size-5 fill-current' />
                  <span className='mr-1'>{key}</span>
                  <Progress value={(value / product.comments_quantity) * 100} />
                </div>
              ))}
          </div>
        )}
      </div>
      <div className='space-y-3 divide-y text-sm md:space-y-5'>
        {state.comments?.map((comment) => (
          <article key={comment.id} className='space-y-3 pb-3 md:pb-5'>
            <div>
              <div className='mb-1 flex items-center gap-2'>
                <span className='font-bold'>{comment.customer.full_name}</span>
                <Ratings
                  className='gap-1'
                  rating={comment.product_rating}
                  classNameIcon='text-secondary size-3.5'
                />
                {user?.id === comment.customer.id && (
                  <ProductCommentDialog asChild defaultValues={comment}>
                    <Button size='iconSm' variant='ghost'>
                      <EditIcon />
                    </Button>
                  </ProductCommentDialog>
                )}
              </div>
              <div className='flex'>
                <span className='text-muted-foreground text-xs italic'>
                  {format(comment.created_at, 'dd MMMM yyyy')}
                </span>
              </div>
            </div>
            {comment.images.length > 0 && (
              <div className='flex gap-2'>
                {comment.images.map((image) => (
                  <Image
                    key={image.id}
                    alt={product.name}
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
