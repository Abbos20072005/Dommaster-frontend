import type { Metadata } from 'next';

import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react';

import { BannerCarousel } from '@/app/[locale]/(main)/_components/BannerCarousel';
import { JsonLd } from '@/components/JsonLd';
import { BaseLayout, MobileHeader } from '@/components/layout';
import { breadcrumbJsonLd } from '@/lib/jsonLd';
import { ProductFilterPaginated } from '@/components/ProductFilterPaginated';
import { getInitialProducts } from '@/components/ProductFilterPaginated/getInitialProducts';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { orNotFound } from '@/lib/orNotFound';
import { metaOverride } from '@/lib/seo';
import { categoryHref } from '@/lib/urls';
import { getSubCategoryById } from '@/utils/api/requests';

import { CategoryChips } from '../../_components/CategoryChips';
import { getBrandsOfItemCategories, getCatalogFilters } from '../../_lib/catalogFilters';

interface Props {
  params: Promise<{ id: string; subId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { subId } = await params;
  const subCategoryResponse = await orNotFound(getSubCategoryById({ id: subId }));
  const subCategory = subCategoryResponse.data.result;

  return {
    title: subCategory?.name,
    ...metaOverride(subCategory)
  };
}

const SubCategoryPage = async ({ params }: Props) => {
  const t = await getTranslations();
  const { id, subId } = await params;
  const subCategoryResponse = await orNotFound(getSubCategoryById({ id: subId }));
  const subCategory = subCategoryResponse.data.result;

  if (!subCategory) return notFound();

  // [category, sub-category]: the levels of the address (the category has the id of the address)
  const crumbs = (subCategory.breadcrumbs ?? []).slice(0, 2).map((crumb) => ({
    id: crumb.id,
    slug: crumb.slug
  }));
  const parentHref = crumbs[0] ? categoryHref(crumbs[0]) : `/category/${id}`;

  const initialProducts = await getInitialProducts({ sub_category: +subId });

  // only the brands that have products in this sub-category
  const brands = await getBrandsOfItemCategories(
    subCategory.product_item_categories.map((itemCategory) => itemCategory.id)
  );

  return (
    <div>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: t('Catalog'), path: '/catalog' },
          { name: subCategory.breadcrumbs?.[0]?.name, path: parentHref },
          { name: subCategory.name, path: categoryHref(...crumbs) }
        ])}
      />
      <MobileHeader />
      <BaseLayout className='mt-2 space-y-4 md:mt-4 md:space-y-6'>
        <Breadcrumb className='mb-2 md:mb-4'>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href='/catalog'>{t('Catalog')}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={parentHref}>
                {subCategory.breadcrumbs?.[0].name}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{subCategory.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className='text-lg leading-8 font-bold md:text-2xl lg:text-3xl'>{subCategory.name}</h1>
        <Suspense>
          <BannerCarousel bare placement='catalog' />
        </Suspense>
        <CategoryChips
          hrefOf={(item) => categoryHref(...crumbs, item)}
          items={subCategory.product_item_categories}
        />
        {/* all products of the sub-category, with the price and brand filters */}
        <ProductFilterPaginated
          attributeCategoryIds={subCategory.product_item_categories.map((item) => item.id)}
          filters={getCatalogFilters(t, brands)}
          initialProducts={initialProducts}
          queries={{ sub_category: +subId }}
          hideCategories
        />
      </BaseLayout>
    </div>
  );
};

export default SubCategoryPage;
