import type { Metadata } from 'next';

import { getTranslations } from 'next-intl/server';
import React, { Suspense } from 'react';

import { BaseLayout, MobileHeader } from '@/components/layout';
import { ProductListSkeleton } from '@/components/modules/product';
import { productsData } from '@/fake-data/products';
import { getProductById } from '@/utils/api/requests';

import { ProductBody, ProductCart, ProductHeader, RecentlyViewedProducts } from './_components';

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
      reviews: product?.comments_quantity
    })
  };
}

const ProductPage = async ({ params }: Props) => {
  const t = await getTranslations();
  const { id } = await params;
  const productResponse = await getProductById({ id });

  const product = productResponse.data.result || productsData.find((item) => item.id === +id);

  if (!product) return <div>Product not found</div>;

  return (
    <>
      <MobileHeader />
      <BaseLayout className='mt-2 md:mt-4'>
        <ProductHeader product={product} />
        <div className='flex flex-col gap-4 lg:flex-row'>
          <div className='flex-1'>
            <ProductBody product={product} />
          </div>
          <div className='lg:w-[360px]'>
            <ProductCart product={product} />
          </div>
        </div>
        <div className='mt-8'>
          <h2 className='text-lg font-bold md:text-2xl'>{t('Frequently bought together')}</h2>
          <Suspense fallback={<ProductListSkeleton />}>
            <RecentlyViewedProducts />
          </Suspense>
        </div>
      </BaseLayout>
    </>
  );
};

export default ProductPage;
