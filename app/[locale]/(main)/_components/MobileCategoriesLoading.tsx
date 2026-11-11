import { BaseLayout } from '@/components/layout';
import { Skeleton } from '@/components/ui/skeleton';

/**
 * The tiles of `MobileCategories` before they come: six 4:5 boxes in three columns. Without it the
 * block appeared later and pushed the whole page down by its height (a layout shift of 0.26, BLD-395).
 */
export const MobileCategoriesLoading = () => (
  <BaseLayout className='md:hidden'>
    <div className='grid grid-cols-3 gap-2'>
      {Array.from({ length: 6 }).map((_, index) => (
        <Skeleton className='aspect-[4/5] rounded-xl' key={index} />
      ))}
    </div>
  </BaseLayout>
);
