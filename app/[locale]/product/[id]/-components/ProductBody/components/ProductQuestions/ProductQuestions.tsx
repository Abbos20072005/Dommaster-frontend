import { format } from 'date-fns';
import { useTranslations } from 'next-intl';
import React from 'react';

interface Props {
  product: Product;
}

export const ProductQuestions = ({ product }: Props) => {
  const t = useTranslations();

  return (
    <div>
      <div className='mb-8'>
        <p className='text-3xl font-bold'>{t('Customer Questions')}</p>
      </div>
      <div className='space-y-10 text-sm'>
        {product.reviews.map((review) => (
          <article key={review.id} className='space-y-3'>
            <div>
              <div className='mb-1 flex gap-2'>
                <span className='font-bold'>{review.author.full_name}</span>
              </div>
              <div className='flex'>
                <span className='text-muted-foreground text-xs italic'>
                  {format(review.published_at, 'dd MMMM yyyy')}
                </span>
              </div>
            </div>
            <p className='text-sm'>{review.comment}</p>
          </article>
        ))}
      </div>
    </div>
  );
};
