import React from 'react';

import { BaseLayout, MobileHeader } from '@/components/layout';
import { ProductListSkeleton } from '@/components/modules/product';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const ProductLoading = () => {
  return (
    <>
      <MobileHeader />
      <BaseLayout className='mt-2 md:mt-4'>
        <div className='flex flex-wrap gap-2 pt-1 pb-2'>
          <Skeleton className='h-5 w-16' />
          <Skeleton className='h-5 w-40' />
          <Skeleton className='h-5 w-40' />
          <Skeleton className='h-5 w-40' />
        </div>
        <Skeleton className='mt-4 mb-6 h-8 w-3/4' />
        <div className='flex flex-col gap-4 lg:flex-row'>
          <div className='flex-1 space-y-4'>
            <Card className='hidden h-11.5 items-center px-6 md:flex' variant='outline'>
              <Skeleton className='h-5 w-32' />
            </Card>
            <Card className='md:border-border border-transparent p-0 md:p-8' variant='outline'>
              <div className='grid gap-6 md:grid-cols-[3fr_2fr]'>
                <div className='space-y-2'>
                  <Skeleton className='aspect-square' />
                  <div className='flex gap-1'>
                    <Skeleton className='h-[61.5px] w-15' />
                    <Skeleton className='h-[61.5px] w-15' />
                    <Skeleton className='h-[61.5px] w-15' />
                  </div>
                </div>
              </div>
            </Card>
          </div>
          <div className='lg:w-[360px]'>
            <Skeleton className='h-50' />
          </div>
        </div>
        <div className='mt-8'>
          <h2 className='text-lg font-bold md:text-2xl'>
            <Skeleton className='h-7 w-1/2 md:h-8' />
          </h2>
          <ProductListSkeleton />
        </div>
      </BaseLayout>
    </>
  );
};

export default ProductLoading;
