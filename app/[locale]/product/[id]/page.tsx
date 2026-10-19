import type { Metadata } from 'next';

import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import React, { cache } from 'react';

import { JsonLd } from '@/components/JsonLd';
import { BaseLayout, MobileHeader } from '@/components/layout';
import { breadcrumbJsonLd, productJsonLd } from '@/lib/jsonLd';
import { orNotFound } from '@/lib/orNotFound';
import { getProductById } from '@/utils/api/requests';

import {
  ProductBody,
  ProductHeader,
  ProductHydrate,
  ProductLinks,
  ProductViewTracker,
  RecentlyViewedProducts,
  SameCategoryProducts
} from './_components';

interface Props {
  params: Promise<{ id: string }>;
}

/** One request for the metadata and the page. A product that does not exist is a 404. */
const getProduct = cache(async (id: string) => {
  const product = (await orNotFound(getProductById({ id }))).data.result;
  if (!product?.id) notFound();
  return product;
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations();
  const { id } = await params;
  const product = await getProduct(id);
  const description = t('metadata.product.description', {
    name: product.name,
    price: product.discount_price ?? product.price,
    images: product.images.length,
    reviews: product.comments_quantity,
    questions: product.questions_quantity
  });
  const image = product.images[0]?.image;

  return {
    title: product.name,
    description,
    // the card of the link (messengers, social networks): this product, not the site
    openGraph: {
      title: product.name,
      description,
      type: 'website',
      ...(image ? { images: [{ url: image, alt: product.name }] } : {})
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description,
      ...(image ? { images: [image] } : {})
    }
  };
}

const ProductPage = async ({ params }: Props) => {
  const { id } = await params;
  const product = await getProduct(id);
  const [category, subCategory, itemCategory] = product.breadcrumbs ?? [];

  return (
    <>
      {/* first: the page is rendered with this product in the HTML (name, price, description) */}
      <ProductHydrate id={id} product={product} />
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
