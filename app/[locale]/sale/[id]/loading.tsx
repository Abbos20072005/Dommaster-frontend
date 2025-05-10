import { useTranslations } from 'next-intl';
import React from 'react';

import { BaseLayout, MobileHeader } from '@/components/layout';
import { FilterSkeleton } from '@/components/modules/filter';
import { ProductListSkeleton } from '@/components/modules/product';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { Skeleton } from '@/components/ui/skeleton';

const SaleLoading = () => {
  const t = useTranslations();

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
              <BreadcrumbPage>
                <Skeleton className='h-5 w-40 md:w-60' />
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className='mb-4 font-bold sm:text-lg md:text-2xl'>
          <Skeleton className='h-6 w-60 md:h-8 md:w-80' />
        </h1>
        <div className='gap-8 lg:flex'>
          <aside className='hidden w-60 lg:block lg:w-64'>
            <FilterSkeleton />
          </aside>
          <div className='lg:flex-1'>
            <div className='mb-4 flex items-center justify-between'>
              <Skeleton className='h-8 w-48' />
              <Skeleton className='h-8 w-20 md:hidden' />
            </div>
            <ProductListSkeleton view='grid' />
          </div>
        </div>
      </BaseLayout>
    </div>
  );
};

export default SaleLoading;
