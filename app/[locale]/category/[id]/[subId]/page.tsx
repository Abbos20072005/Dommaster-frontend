import type { Metadata } from 'next';

import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import React from 'react';

import { BaseLayout, MobileHeader } from '@/components/layout';
import { ProductFilterPaginated } from '@/components/ProductFilterPaginated';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { getSubCategoryById } from '@/utils/api/requests';

import { CategoryChips } from '../../_components/CategoryChips';
import { getBrandsOfItemCategories, getCatalogFilters } from '../../_lib/catalogFilters';

interface Props {
  params: Promise<{ id: string; subId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { subId } = await params;
  const subCategoryResponse = await getSubCategoryById({ id: subId });
  const subCategory = subCategoryResponse.data.result;

  return {
    title: subCategory?.name
  };
}

const SubCategoryPage = async ({ params }: Props) => {
  const t = await getTranslations();
  const { id, subId } = await params;
  const subCategoryResponse = await getSubCategoryById({ id: subId });
  const subCategory = subCategoryResponse.data.result;

  if (!subCategory) return notFound();

  // only the brands that have products in this sub-category
  const brands = await getBrandsOfItemCategories(
    subCategory.product_item_categories.map((itemCategory) => itemCategory.id)
  );

  return (
    <div>
      <MobileHeader />
      <BaseLayout className='mt-2 space-y-4 md:mt-4 md:space-y-6'>
        <Breadcrumb className='mb-2 md:mb-4'>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href='/catalog'>{t('Catalog')}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/category/${id}`}>
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
        <CategoryChips
          hrefOf={(itemId) => `/category/${id}/${subId}/${itemId}`}
          items={subCategory.product_item_categories}
        />
        {/* all products of the sub-category, with the price and brand filters */}
        <ProductFilterPaginated
          attributeCategoryIds={subCategory.product_item_categories.map((item) => item.id)}
          filters={getCatalogFilters(t, brands)}
          queries={{ sub_category: +subId }}
          hideCategories
        />
      </BaseLayout>
    </div>
  );
};

export default SubCategoryPage;
