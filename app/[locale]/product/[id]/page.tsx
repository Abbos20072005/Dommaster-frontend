import type { Metadata } from 'next';

import { getTranslations } from 'next-intl/server';
import React from 'react';

import { BaseLayout, MobileHeader } from '@/components/layout';
import { getProductById } from '@/utils/api/requests';

import { ProductBody, ProductHeader, RecentlyViewedProducts } from './_components';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations();
  const { id } = await params;
  const productResponse = await getProductById({ id });
  const product = productResponse.data.result;

  return {
    title: product?.name,
    description: t('metadata.product.description', {
      name: product?.name,
      price: product.discount_price ?? product?.price,
      images: product?.images.length,
      reviews: product?.comments_quantity,
      questions: product?.questions_quantity
    })
  };
}

const ProductPage = () => {
  return (
    <>
      <MobileHeader />
      <BaseLayout className='mt-2 md:mt-4'>
        <ProductHeader />
        <ProductBody />
        <RecentlyViewedProducts />
      </BaseLayout>
    </>
  );
};

export default ProductPage;
