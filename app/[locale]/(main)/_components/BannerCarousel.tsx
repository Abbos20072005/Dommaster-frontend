import Image from 'next/image';

import { AutoPlayCarousel } from '@/components/AutoPlayCarousel';
import { BaseLayout } from '@/components/layout';
import {
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { getBanners } from '@/utils/api/requests';

export const BannerCarousel = async () => {
  const bannersResponse = await getBanners();
  const banners = bannersResponse.data.result;

  if (!banners.length) return null;

  return (
    <BaseLayout className='px-0 md:px-4'>
      <AutoPlayCarousel delay={4000} opts={{ loop: true }}>
        <CarouselContent
          className={cn('-ml-2 md:-ml-4', { 'justify-center': banners.length === 1 })}
        >
          {(banners.length === 2 ? [...banners, ...banners] : banners).map((banner, index) => (
            <CarouselItem
              key={`${banner.id}-${index}`}
              className='basis-[calc(100%-32px)] pl-2 md:basis-full md:pl-4'
            >
              <a
                href={banner.link}
                className='block aspect-[3/1] md:aspect-[6/1]'
                rel='noreferrer noopenner'
                target='_blank'
              >
                <Image
                  alt={banner.title}
                  className='size-full rounded-lg object-cover md:hidden md:rounded-xl'
                  height={230}
                  src={banner.mobile_image}
                  width={690}
                  priority={index === 0}
                />
                <Image
                  alt={banner.title}
                  className='hidden size-full rounded-lg object-cover md:block md:rounded-xl'
                  height={413}
                  src={banner.desktop_image}
                  width={1240}
                  priority={index === 0}
                />
              </a>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='hidden size-12 md:flex' />
        <CarouselNext className='hidden size-12 md:flex' />
      </AutoPlayCarousel>
    </BaseLayout>
  );
};
