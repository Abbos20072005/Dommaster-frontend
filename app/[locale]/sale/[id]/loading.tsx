import { useTranslations } from 'next-intl';
import React from 'react';

import { BaseLayout, MobileHeader } from '@/components/layout';
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
                <Skeleton className='h-5 w-20' />
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className='mb-4 font-bold sm:text-lg md:text-2xl'>
          <Skeleton className='h-6 w-32 md:h-8' />
        </h1>
        <ProductListSkeleton view='grid' />
      </BaseLayout>
    </div>
  );
};

export default SaleLoading;
