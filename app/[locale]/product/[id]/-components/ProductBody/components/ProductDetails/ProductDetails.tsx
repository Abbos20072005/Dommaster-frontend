import { useTranslations } from 'next-intl';
import React from 'react';

interface Props {
  description: Product['description'];
}

export const ProductDetails = ({ description }: Props) => {
  const t = useTranslations();
  if (!description) return null;

  return (
    <div>
      <p className='mb-8 text-3xl font-bold'>{t('Details')}</p>
      <div dangerouslySetInnerHTML={{ __html: description }} />
    </div>
  );
};
