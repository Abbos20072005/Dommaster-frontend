import type { Metadata } from 'next';

import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
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
import { Link } from '@/i18n/navigation';

import { MobileFilterDrawer, ProductsSortBySelect } from './-components';

interface Props {
  params: Promise<{ id: string }>;
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
function deepSearchCatalog(
  items: Category[],
  predicate: (item: Category) => boolean
): Category | null {
  for (const item of items) {
    if (predicate(item)) {
      return item;
    }
    if (item.children) {
      const found = deepSearchCatalog(item.children, predicate);
      if (found) return found;
    }
  }
  return null;
}

const CategoryPage = async ({ params }: Props) => {
  const { id } = await params;
  const t = await getTranslations();

  const category = deepSearchCatalog(categoryData, (item) => item.id === +id);

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
            {category.breadcrumbs?.map((item) => (
              <React.Fragment key={item.id}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {item.url ? (
                    <BreadcrumbLink href={item.url}>{item.title}</BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage>{item.title}</BreadcrumbPage>
                  )}
                </BreadcrumbItem>
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className='text-xl leading-8 font-bold md:text-2xl lg:text-3xl'>{category.title}</h1>
        {!!category.children.length && (
          <div className='grid grid-cols-[repeat(auto-fill,minmax(110px,1fr))] gap-2 md:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] md:gap-4'>
            {category.children.map((item) => (
              <Link
                href={`/category/${item.id}`}
                key={item.id}
                className='bg-muted relative flex flex-col justify-between gap-6 rounded-md p-3 md:flex-row md:gap-3'
              >
                <p className='text-xs font-medium [word-break:break-word] md:text-sm'>
                  {item.title}
                </p>
                <Image
                  alt={item.title}
                  className='mx-auto h-15 w-22 rounded-md object-contain md:w-15'
                  height={60}
                  src='https://cdn.vseinstrumenti.ru/imgtmbnf/400x400/img/cats/1774.jpg?hash=20250319092945'
                  width={60}
                />
              </Link>
            ))}
          </div>
        )}
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

export default CategoryPage;
