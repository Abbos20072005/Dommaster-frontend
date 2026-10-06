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
import { getBrands, getCategoryById } from '@/utils/api/requests';

import { CategoryChips } from '../_components/CategoryChips';
import { getCatalogFilters } from '../_lib/catalogFilters';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const categoryResponse = await getCategoryById({ id });
  const category = categoryResponse.data.result;

  return {
    title: category?.name
  };
}

const CategoryPage = async ({ params }: Props) => {
  const { id } = await params;
  const t = await getTranslations();
  const [categoryResponse, brandsResponse] = await Promise.all([
    getCategoryById({ id }),
    getBrands()
  ]);
  const category = categoryResponse.data.result;

  if (!category) return notFound();

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
              <BreadcrumbPage>{category.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className='text-lg leading-8 font-bold md:text-2xl lg:text-3xl'>{category.name}</h1>
        <CategoryChips
          hrefOf={(subId) => `/category/${id}/${subId}`}
          items={category.sub_categories}
        />
        {/* all products of the category, with the price and brand filters */}
        <ProductFilterPaginated
          filters={getCatalogFilters(t, brandsResponse.data.result ?? [])}
          queries={{ category: +id }}
          hideCategories
        />
      </BaseLayout>
    </div>
  );
};

export default CategoryPage;
