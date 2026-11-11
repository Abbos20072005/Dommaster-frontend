import { BaseLayout } from '@/components/layout';
import { Skeleton } from '@/components/ui/skeleton';
import { ProductListSkeleton } from '@/modules/product';

/** The sale block before its data is there: a title, the row of cards and the "view all" bar. */
export const DiscountProductsSkeleton = () => (
  <section>
    <BaseLayout className='px-0'>
      <div className='bg-muted rounded-2xl px-2 pt-4'>
        <div className='flex items-center justify-between px-4'>
          <div className='flex-1'>
            <Skeleton className='mb-1 h-5 w-32' />
            <Skeleton className='h-7 w-3/4 lg:h-8 lg:w-1/2' />
          </div>
          <Skeleton className='hidden h-11 w-25 md:block' />
        </div>
        <ProductListSkeleton />
        <div className='pb-4'>
          <Skeleton className='h-8 w-full md:hidden' />
        </div>
      </div>
    </BaseLayout>
  </section>
);
