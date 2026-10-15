import type { Metadata } from 'next';

import { getTranslations } from 'next-intl/server';
import React from 'react';

import { JsonLd } from '@/components/JsonLd';
import { BaseLayout, MobileHeader } from '@/components/layout';
import { breadcrumbJsonLd, productJsonLd } from '@/lib/jsonLd';
import { getProductById } from '@/utils/api/requests';

import {
  ProductBody,
  ProductHeader,
  ProductLinks,
  ProductViewTracker,
  RecentlyViewedProducts,
  SameCategoryProducts
} from './_components';

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

const ProductPage = async ({ params }: Props) => {
  const { id } = await params;
  // schema.org markup: the product is rendered on the server, so the crawler sees it
  const product = (await getProductById({ id }).catch(() => null))?.data.result;
  const [category, subCategory, itemCategory] = product?.breadcrumbs ?? [];

  return (
    <>
      {product && (
        <JsonLd
          data={[
            productJsonLd(product),
            breadcrumbJsonLd([
              { name: 'Buildex', path: '/' },
              { name: category?.name, path: category && `/category/${category.id}` },
              {
                name: subCategory?.name,
                path: category && subCategory && `/category/${category.id}/${subCategory.id}`
              },
              {
                name: itemCategory?.name,
                path:
                  category &&
                  subCategory &&
                  itemCategory &&
                  `/category/${category.id}/${subCategory.id}/${itemCategory.id}`
              },
              { name: product.name }
            ])
          ]}
        />
      )}
      <MobileHeader />
      <BaseLayout className='mt-2 md:mt-4'>
        <ProductViewTracker />
        <ProductHeader />
        <ProductBody />
        <ProductLinks />
        <SameCategoryProducts />
        <RecentlyViewedProducts />
      </BaseLayout>
    </>
  );
};

export default ProductPage;
