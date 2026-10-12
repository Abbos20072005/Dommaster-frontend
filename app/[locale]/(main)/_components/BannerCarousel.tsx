import { AutoPlayCarousel } from '@/components/AutoPlayCarousel';
import { BannerView } from '@/components/BannerView/BannerView';
import { BaseLayout } from '@/components/layout';
import {
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { getBanners } from '@/utils/api/requests';

interface Props {
  /** the place on the site: the top of the home page by default, `catalog` for the category pages */
  placement?: BannerPlacement;
  /** no own page padding: the carousel lies inside a layout that already has it */
  bare?: boolean;
}

export const BannerCarousel = async ({ placement = 'site_home', bare }: Props) => {
  const bannersResponse = await getBanners({ config: { params: { placement, platform: 'site' } } });
  const banners = bannersResponse.data.result;

  // no banner — no place for it either
  if (!banners.length) return null;

  const carousel = (
    <AutoPlayCarousel delay={4000} opts={{ loop: banners.length > 1 }}>
      <CarouselContent
        className={cn('-ml-2 md:-ml-4', { 'justify-center': banners.length === 1 })}
        noOverflowHiddenOnMobile
      >
        {banners.map((banner, index) => (
          <CarouselItem key={`${banner.id}-${index}`} className='basis-full pl-2 md:pl-4'>
            <BannerView banner={banner} priority={placement === 'site_home' && index === 0} />
          </CarouselItem>
        ))}
      </CarouselContent>
      {banners.length > 1 && (
        <>
          <CarouselPrevious className='hidden size-12 md:flex' />
          <CarouselNext className='hidden size-12 md:flex' />
        </>
      )}
    </AutoPlayCarousel>
  );

  if (bare) return <div className='overflow-hidden'>{carousel}</div>;

  return <BaseLayout className='overflow-hidden'>{carousel}</BaseLayout>;
};
