import Image from 'next/image';

import { AutoPlayCarousel } from '@/components/AutoPlayCarousel';
import { BaseLayout } from '@/components/layout';
import {
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { getBanners } from '@/utils/api/requests';

export const BannerCarousel = async () => {
  const bannersResponse = await getBanners();
  const banners = bannersResponse.data.result;

  if (!banners.length) return null;

  return (
    <BaseLayout className='px-0 md:px-4'>
      <AutoPlayCarousel delay={4000} opts={{ loop: true }}>
        <CarouselContent className='-ml-2 md:-ml-4'>
          {banners.map((banner, index) => (
            <CarouselItem key={banner.id} className='basis-[90%] pl-2 md:basis-full md:pl-4'>
              <a
                href={banner.link}
                className='block aspect-[3/1]'
                rel='noreferrer noopenner'
                target='_blank'
              >
                <Image
                  alt='banner'
                  className='size-full rounded-lg object-cover md:rounded-xl'
                  height={413}
                  src={banner.image}
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
