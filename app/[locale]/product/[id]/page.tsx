import type { Metadata } from 'next';

import { getTranslations } from 'next-intl/server';
import { notFound, permanentRedirect } from 'next/navigation';
import React, { cache } from 'react';

import { JsonLd } from '@/components/JsonLd';
import { BaseLayout, MobileHeader } from '@/components/layout';
import { breadcrumbJsonLd, productJsonLd } from '@/lib/jsonLd';
import { orNotFound } from '@/lib/orNotFound';
import { metaOverride } from '@/lib/seo';
import { categoryHref, productIdFromParam } from '@/lib/urls';
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

/**
 * One request for the metadata and the page. A product that does not exist is a 404. The address
 * is `/product/{slug}-{id}` (BLD-243): the id at its end finds the product, and any other form of
 * the address (the old `/product/{id}`, a slug of the other language, an old slug) leads to the
 * right one.
 */
const getProduct = cache(async (param: string) => {
  const id = productIdFromParam(param);
  if (!id) notFound();
  const product = (await orNotFound(getProductById({ id }))).data.result;
  if (!product?.id) notFound();
  if (product.slug && product.slug !== param) permanentRedirect(`/product/${product.slug}`);
  return product;
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations();
  const { id: param } = await params;
  const product = await getProduct(param);
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
    ...metaOverride(product),
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
  const { id: param } = await params;
  const product = await getProduct(param);
  const id = String(product.id);
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
            { name: category?.name, path: category && categoryHref(category) },
            {
              name: subCategory?.name,
              path: category && subCategory && categoryHref(category, subCategory)
            },
            {
              name: itemCategory?.name,
              path:
                category &&
                subCategory &&
                itemCategory &&
                categoryHref(category, subCategory, itemCategory)
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
