import { getTranslations } from 'next-intl/server';
import React from 'react';

import { BaseLayout, MobileHeader } from '@/components/layout';
import { ProductList } from '@/components/modules/product';
import { productsData } from '@/fake-data/products';

import { ProductBody, ProductCart, ProductHeader } from './-components';

interface Props {
  params: Promise<{ id: string }>;
}

const ProductPage = async ({ params }: Props) => {
  const t = await getTranslations();
  const { id } = await params;

  const product = productsData.find((item) => item.id === +id);

  if (!product) return <div>Product not found</div>;

  return (
    <>
      <MobileHeader />
      <BaseLayout className='mt-2 md:mt-4'>
        <ProductHeader />
        <div className='gap-4 md:flex'>
          <div className='flex-1'>
            <ProductBody />
          </div>
          <div className='lg:w-[360px]'>
            <ProductCart product={product} />
          </div>
        </div>
        <div className='mt-8'>
          <h2 className='text-lg font-bold md:text-2xl'>{t('Frequently bought together')}</h2>
          <ProductList products={productsData} />
        </div>
      </BaseLayout>
    </>
  );
};

export default ProductPage;
