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
import { getSubCategoryById } from '@/utils/api/requests';

interface Props {
  params: Promise<{ id: string; subId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { subId } = await params;
  const subCategoryResponse = await getSubCategoryById({ id: subId });
  const subCategory = subCategoryResponse.data.result;

  return {
    title: subCategory?.name,
    description:
      'в Санкт-Петербурге — покупайте ✅ в интернет-магазине Петрович. 🚚 Доставка за 2 часа или бесплатно на авто до 10 тонн. 👍 Возврат неиспользованного товара в течение 360 дней. Звоните круглосуточно: ☎️ +7(812)334-88-88. Качество по ISO 9001:2000.'
  };
}

const SubCategoryPage = async ({ params }: Props) => {
  const t = await getTranslations();
  const { id, subId } = await params;
  const subCategoryResponse = await getSubCategoryById({ id: subId });
  const subCategory = subCategoryResponse.data.result;

  if (!subCategory) return notFound();

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
        <div className='grid grid-cols-[repeat(auto-fill,minmax(110px,1fr))] gap-2 md:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] md:gap-4'>
          {subCategory.product_item_categories.map((itemCategory) => (
            <Link
              href={`/category/${id}/${subId}/${itemCategory.id}`}
              key={itemCategory.id}
              className='bg-muted relative flex flex-col justify-between gap-6 rounded-md p-3 md:flex-row md:gap-3'
            >
              <p className='text-xs font-medium [word-break:break-word] md:text-sm'>
                {itemCategory.name}
              </p>
              <Image
                alt={itemCategory.name}
                className='mx-auto h-15 w-22 rounded-md object-contain md:w-15'
                height={60}
                src='https://cdn.vseinstrumenti.ru/imgtmbnf/400x400/img/cats/1774.jpg?hash=20250319092945'
                width={60}
              />
            </Link>
          ))}
        </div>
      </BaseLayout>
    </div>
  );
};

export default SubCategoryPage;
