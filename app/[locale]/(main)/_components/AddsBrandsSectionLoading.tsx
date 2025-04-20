import React from 'react';

import { BaseLayout } from '@/components/layout';
import { ProductListSkeleton } from '@/components/modules/product';
import { Skeleton } from '@/components/ui/skeleton';

export const AddsBrandsSectionLoading = () => {
  return (
    <>
      {Array.from({ length: 2 }).map((_, index) => (
        <section key={index}>
          <BaseLayout>
            <h2 className='text-lg font-bold md:text-2xl'>
              <Skeleton className='h-7 w-1/2 md:h-8' />
            </h2>
            <ProductListSkeleton />
          </BaseLayout>
        </section>
      ))}
    </>
  );
};
