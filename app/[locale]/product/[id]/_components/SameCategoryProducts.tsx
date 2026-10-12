'use client';

import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import React from 'react';

import { ProductListSkeleton, ProductSection } from '@/modules/product';
import { getAuthorizedProductById, getProducts } from '@/utils/api/requests';

/** how many products the carousel shows */
const SIZE = 12;

/** Other products of the same (third-level) category as the open product. */
export const SameCategoryProducts = () => {
  const t = useTranslations();
  const { id } = useParams<{ id: string }>();

  // the same query as the page header — React Query shares the response
  const getProductByIdQuery = useQuery({
    queryKey: ['product', id],
    staleTime: 0,
    queryFn: () => getAuthorizedProductById({ id })
  });
  // breadcrumbs are [category, sub-category, item category]
  const breadcrumbs = getProductByIdQuery.data?.data.result.breadcrumbs;
  const itemCategoryId = breadcrumbs?.[2]?.id;
  // the page of the category: all of its products
  const categoryHref = breadcrumbs?.[2]
    ? `/category/${breadcrumbs[0].id}/${breadcrumbs[1].id}/${breadcrumbs[2].id}`
    : '/catalog';

  const getProductsQuery = useQuery({
    queryKey: ['products', 'sameCategory', itemCategoryId],
    enabled: !!itemCategoryId,
    queryFn: () => getProducts({ data: { item_category: itemCategoryId, page_size: SIZE + 1 } })
  });

  const products = getProductsQuery.data?.data.result.content
    .filter((product) => product.id !== Number(id))
    .slice(0, SIZE);

  if (getProductByIdQuery.isLoading || getProductsQuery.isLoading)
    return (
      <section className='mt-8'>
        <h2 className='text-lg font-bold md:text-2xl'>{t('More products from this category')}</h2>
        <ProductListSkeleton />
      </section>
    );

  if (!products?.length) return null;

  return (
    <section className='mt-8'>
      <ProductSection
        href={categoryHref}
        products={products}
        title={
          <h2 className='text-lg font-bold md:text-2xl'>{t('More products from this category')}</h2>
        }
      />
    </section>
  );
};
