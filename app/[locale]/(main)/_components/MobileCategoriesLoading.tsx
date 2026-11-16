import { BaseLayout } from '@/components/layout';
import { Skeleton } from '@/components/ui/skeleton';

/**
 * The tiles of `MobileCategories` before they come, of the same size (phone: six 4:5 boxes in three
 * columns, tablet and up: six squares in a row). Without it the block appeared later and pushed the
 * whole page down by its height (a layout shift of 0.26, BLD-395).
 */
export const MobileCategoriesLoading = () => (
  <BaseLayout>
    <div className='grid grid-cols-3 gap-2 md:grid-cols-4 md:gap-3 lg:auto-cols-fr lg:grid-flow-col'>
      {Array.from({ length: 8 }).map((_, index) => (
        <Skeleton
          className={`aspect-[4/5] rounded-xl md:aspect-square md:rounded-md ${index >= 6 ? 'max-md:hidden' : ''}`}
          key={index}
        />
      ))}
    </div>
  </BaseLayout>
);
