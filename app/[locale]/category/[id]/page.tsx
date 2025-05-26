import type { Metadata } from 'next';

import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import React from 'react';

import { BaseLayout, MobileHeader } from '@/components/layout';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { Link } from '@/i18n/navigation';
import { getCategoryById } from '@/utils/api/requests';

import { MostSoldProductsSection, RecentlyViewedProducts } from './_components';

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
  const categoryResponse = await getCategoryById({ id });
  const category = categoryResponse.data.result;

  if (!category) return notFound();

  return (
    <div>
      <MobileHeader />
      <BaseLayout className='mt-2 space-y-4 md:mt-4 md:space-y-8'>
        <Breadcrumb className='mb-2 md:mb-4'>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href='/'>{t('Home')}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{category.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className='text-lg leading-8 font-bold md:text-2xl lg:text-3xl'>{category.name}</h1>
        <div className='grid grid-cols-[repeat(auto-fill,minmax(110px,1fr))] gap-2 md:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] md:gap-4'>
          {category.sub_categories.map((subCategory) => (
            <Link
              href={`/category/${id}/${subCategory.id}`}
              key={subCategory.id}
              className='bg-muted relative flex flex-col justify-between gap-6 rounded-md p-3 md:flex-row md:gap-3'
            >
              <p className='text-xs font-medium [word-break:break-word] md:text-sm'>
                {subCategory.name}
              </p>
              <Image
                alt={subCategory.name}
                className='mx-auto h-15 w-22 rounded-md object-contain md:mx-0 md:size-15'
                height={60}
                src={subCategory.image}
                width={60}
              />
            </Link>
          ))}
        </div>
        <MostSoldProductsSection />
        <RecentlyViewedProducts />
      </BaseLayout>
    </div>
  );
};

export default CategoryPage;
