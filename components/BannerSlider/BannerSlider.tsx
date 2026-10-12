import { AutoPlayCarousel } from '@/components/AutoPlayCarousel';
import { BannerView } from '@/components/BannerView/BannerView';
import {
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';

interface Props {
  banners: Banner[];
  /** the first picture is the main one of the page: load it first */
  priority?: boolean;
}

/** Banners as a slider; one banner is shown as it is, without arrows and looping. */
export const BannerSlider = ({ banners, priority }: Props) => {
  if (!banners.length) return null;

  return (
    <AutoPlayCarousel delay={4000} opts={{ loop: banners.length > 1 }}>
      <CarouselContent
        className={cn('-ml-2 md:-ml-4', { 'justify-center': banners.length === 1 })}
        noOverflowHiddenOnMobile
      >
        {banners.map((banner, index) => (
          <CarouselItem key={`${banner.id}-${index}`} className='basis-full pl-2 md:pl-4'>
            <BannerView banner={banner} priority={priority && index === 0} />
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
};
