import { BaseLayout } from '@/components/layout';
import { Skeleton } from '@/components/ui/skeleton';
import { getBanners } from '@/utils/api/requests';

export const BannerCarouselLoading = async () => {
  const bannersResponse = await getBanners();
  const banners = bannersResponse.data.result;

  if (!banners.length) return null;

  return (
    <BaseLayout className='px-6 md:px-4'>
      <Skeleton className='aspect-[3/1] w-full rounded-lg md:rounded-xl' />
    </BaseLayout>
  );
};
