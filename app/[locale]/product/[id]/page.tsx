import type { Metadata } from 'next';

import { getLocale, getTranslations } from 'next-intl/server';
import { unstable_cache } from 'next/cache';
import { notFound, permanentRedirect } from 'next/navigation';
import React, { cache } from 'react';

import { JsonLd } from '@/components/JsonLd';
import { BaseLayout, MobileHeader } from '@/components/layout';
import { toLanguage } from '@/lib/catalogTree';
import { breadcrumbJsonLd, productJsonLd } from '@/lib/jsonLd';
import { withLocale } from '@/lib/localePath';
import { orNotFound } from '@/lib/orNotFound';
import { metaOverride } from '@/lib/seo';
import { categoryHref, productIdFromParam } from '@/lib/urls';
import { getProductById, getProducts } from '@/utils/api/requests';

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
  if (product.slug && product.slug !== param) {
    permanentRedirect(withLocale(`/product/${product.slug}`, await getLocale()));
  }
  return product;
});

/** how many neighbours the page asks for: the carousel shows 12, and one of them may be this product */
const SAME_CATEGORY_SIZE = 13;

/**
 * The other products of a third-level category, kept for five minutes per language: the block
 * "Другие товары из этой категории" is drawn with them on the server (BLD-426).
 */
const getSameCategory = unstable_cache(
  async (itemCategory: number, language: 'ru' | 'uz') => {
    const response = await getProducts({
      data: { item_category: itemCategory, page_size: SAME_CATEGORY_SIZE },
      config: { headers: { 'Accept-Language': language } }
    });
    return response.data;
  },
  ['product-same-category'],
  { revalidate: 300 }
);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations();
  const { id: param } = await params;
  const product = await getProduct(param);
  const override = metaOverride(product);
  // "{name} — buy in Tashkent | Buildex", like the category and brand pages: the old site suffix
  // made the title 123-132 characters long (BLD-424)
  const title = override.title?.absolute ?? t('Product meta title', { name: product.name });
  const description =
    override.description ??
    t('metadata.product.description', {
      name: product.name,
      price: product.discount_price ?? product.price
    });
  const image = product.images[0]?.image;

  return {
    title: { absolute: title },
    description,
    // the card of the link (messengers, social networks): this product, not the site
    openGraph: {
      title,
      description,
      type: 'website',
      ...(image ? { images: [{ url: image, alt: product.name }] } : {})
    },
    twitter: {
      card: 'summary_large_image',
      title,
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
  // a failed request must not break the product page: the block then loads in the browser
  const sameCategory = itemCategory
    ? await getSameCategory(itemCategory.id, toLanguage(await getLocale())).catch(() => null)
    : null;

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
        <SameCategoryProducts initial={sameCategory} />
        <RecentlyViewedProducts />
      </BaseLayout>
    </>
  );
};

export default ProductPage;
