import { getTranslations } from 'next-intl/server';
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
import { productsData } from '@/fake-data/products';
import { getBrandById } from '@/utils/api/requests';

import { MobileFilterDrawer, ProductsSortBySelect } from './-components';

interface Props {
  params: Promise<{ id: string }>;
}

const SearchPage = async ({ params }: Props) => {
  const t = await getTranslations();
  const { id } = await params;
  const brandResponse = await getBrandById({ id });
  const brand = brandResponse.data.result;

  return (
    <div>
      <MobileHeader />
      <BaseLayout className='mt-2 md:mt-4'>
        <Breadcrumb className='mb-2 md:mb-4'>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href='/'>{t('Home')}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{brand.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className='mb-4 font-bold sm:text-lg md:text-2xl'>{brand.name}</h1>
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

export default SearchPage;
