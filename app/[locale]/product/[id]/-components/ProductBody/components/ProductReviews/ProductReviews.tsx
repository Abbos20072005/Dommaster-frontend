import { format } from 'date-fns';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';

import { Ratings } from '@/components/ui/rating';

interface Props {
  product: Product;
}

export const ProductReviews = ({ product }: Props) => {
  const t = useTranslations();

  return (
    <div>
      <div className='mb-8'>
        <p className='text-3xl font-bold'>{t('Customer Reviews')}</p>
        <div className='flex items-center gap-3 pt-3'>
          <Ratings
            className='gap-1'
            rating={product.rating}
            classNameIcon='text-secondary size-3.5'
          />
          <p className='text-muted-foreground space-x-1 text-sm italic'>
            <span>
              {product.reviews_count} {t('reviews')}
            </span>
            <span>|</span>
            <span>{t('{count} out of 5', { count: String(product.rating) })}</span>
          </p>
        </div>
      </div>
      <div className='space-y-10 text-sm'>
        {product.reviews.map((review) => (
          <article key={review.id} className='space-y-3'>
            <div>
              <div className='mb-1 flex gap-2'>
                <span className='font-bold'>{review.author.full_name}</span>
                <Ratings
                  className='gap-1'
                  rating={review.rating}
                  classNameIcon='text-secondary size-3.5'
                />
              </div>
              <div className='flex'>
                <span className='text-muted-foreground text-xs italic'>
                  {format(review.published_at, 'dd MMMM yyyy')}
                </span>
              </div>
            </div>
            {review.images.length > 0 && (
              <div className='flex gap-2'>
                {review.images.map((image) => (
                  <Image
                    key={image}
                    alt={product.name}
                    className='h-35 w-40 rounded-md object-cover'
                    height={140}
                    src={image}
                    width={160}
                  />
                ))}
              </div>
            )}
            <p className='text-sm'>{review.comment}</p>
          </article>
        ))}
      </div>
    </div>
  );
};
