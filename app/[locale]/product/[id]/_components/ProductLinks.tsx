'use client';

import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import React from 'react';

import { ProductList } from '@/modules/product';
import { getProductLinks } from '@/utils/api/requests';

/** "Bought together" and "Alternatives": picked by the content team; an empty list hides the block. */
export const ProductLinks = () => {
  const t = useTranslations();
  const { id } = useParams<{ id: string }>();

  const getLinksQuery = useQuery({
    // under `products` so that cart changes refresh `in_cart` of these cards
    queryKey: ['products', 'links', id],
    staleTime: 0,
    queryFn: () => getProductLinks({ id })
  });

  const links = getLinksQuery.data?.data.result;
  if (!links) return null;

  const alternativesTitle =
    links.alternatives_source === 'manual' ? t('Alternatives') : t('Similar products');

  return (
    <>
      {links.related.length > 0 && (
        <section className='mt-8'>
          <h2 className='text-lg font-bold md:text-2xl'>{t('Bought together')}</h2>
          <ProductList products={links.related} />
        </section>
      )}
      {links.alternatives.length > 0 && (
        <section className='mt-8'>
          <h2 className='text-lg font-bold md:text-2xl'>{alternativesTitle}</h2>
          <ProductList products={links.alternatives} />
        </section>
      )}
    </>
  );
};
