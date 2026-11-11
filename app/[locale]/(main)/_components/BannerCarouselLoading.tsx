import { BaseLayout } from '@/components/layout';
import { Skeleton } from '@/components/ui/skeleton';

/**
 * The place of the banner while it is on its way: the same box (3:1 on a phone, 6:1 wider) and the
 * same page padding as `BannerCarousel`. It asks nothing of the API: an async fallback held the
 * whole page back until the banners came (BLD-395).
 */
export const BannerCarouselLoading = () => (
  <BaseLayout>
    <Skeleton className='aspect-[3/1] w-full rounded-lg md:aspect-[6/1] md:rounded-xl' />
  </BaseLayout>
);
