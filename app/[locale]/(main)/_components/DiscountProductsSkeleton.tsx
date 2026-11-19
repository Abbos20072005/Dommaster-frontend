import { BaseLayout } from '@/components/layout';
import { Skeleton } from '@/components/ui/skeleton';
import { ProductListSkeleton } from '@/modules/product';

/** The sale block before its data is there: a title, the row of cards and the "view all" bar. */
export const DiscountProductsSkeleton = () => (
  <section>
    <BaseLayout className='px-0'>
      <div className='rounded-2xl bg-[#D4E6F6] px-3 pt-3'>
        <div className='flex items-center justify-between px-1'>
          <div className='flex flex-1 items-center gap-3'>
            <Skeleton className='h-7 w-1/2 lg:h-8 lg:w-1/3' />
            <Skeleton className='h-5 w-32' />
          </div>
          <Skeleton className='hidden h-11 w-25 md:block' />
        </div>
        <ProductListSkeleton hideCart onDark />
        <div className='-mt-[15px] pb-px'>
          <Skeleton className='h-8 w-full md:hidden' />
        </div>
      </div>
    </BaseLayout>
  </section>
);
