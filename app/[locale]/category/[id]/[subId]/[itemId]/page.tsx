import type { Metadata } from 'next';

import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import React from 'react';

import { BaseLayout, MobileHeader } from '@/components/layout';
import { Filter } from '@/components/modules/filter';
import { ProductList } from '@/components/modules/product';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { categoryData } from '@/fake-data/category';
import { productsData } from '@/fake-data/products';

import { MobileFilterDrawer, ProductsSortBySelect } from './-components';

interface Props {
  params: Promise<{ id: string; subId: string; itemId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const catalog = categoryData.find((item) => item.id === +id);

  return {
    title: catalog?.title,
    description:
      'в Санкт-Петербурге — покупайте ✅ в интернет-магазине Петрович. 🚚 Доставка за 2 часа или бесплатно на авто до 10 тонн. 👍 Возврат неиспользованного товара в течение 360 дней. Звоните круглосуточно: ☎️ +7(812)334-88-88. Качество по ISO 9001:2000.'
  };
}

const ItemCategoryPage = async ({ params }: Props) => {
  const { id, subId, itemId } = await params;
  const t = await getTranslations();

  const itemCategory = categoryData
    .find((item) => item.id === +id)
    ?.sub_categories.find((item) => item.id === +subId)
    ?.product_item_categories.find((item) => item.id === +itemId);

  if (!itemCategory) return notFound();

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
                {itemCategory.breadcrumbs[0].title}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/category/${id}/${subId}`}>
                {itemCategory.breadcrumbs[1].title}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{itemCategory.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className='text-lg leading-8 font-bold md:text-2xl lg:text-3xl'>
          {itemCategory.title}
        </h1>
        <div className='gap-8 lg:flex'>
          <aside className='hidden w-52 lg:block xl:w-60'>
            <Filter />
          </aside>
          <div className='lg:flex-1'>
            <div className='mb-4 flex items-center justify-between'>
              <ProductsSortBySelect />
              <MobileFilterDrawer />
            </div>
            <ProductList view='grid' products={productsData} />
          </div>
        </div>
      </BaseLayout>
    </div>
  );
};

export default ItemCategoryPage;
