'use client';

import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';

import { BaseLayout } from '@/components/layout';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';

const banners = [
  {
    id: 1,
    image: {
      url: 'https://mini-io-api.texnomart.uz/newcontent/slider/353/xAv9zeSr5NdTLAtVxLqpQibPdMIkwBNylsl0JafB.webp'
    }
  },
  {
    id: 2,
    image: {
      url: 'https://mini-io-api.texnomart.uz/newcontent/slider/352/Tgo003ulJyVrqnTMs0KmKdEdgwc0Z8cYaJEXTEA0.webp'
    }
  },
  {
    id: 3,
    image: {
      url: 'https://mini-io-api.texnomart.uz/newcontent/slider/359/EMaIRCiVucM3636IX6vhOhlIyyUmwPxjAIS43NvS.webp'
    }
  }
];

export const BannerCarousel = () => {
  return (
    <BaseLayout className='px-0 md:px-4'>
      <Carousel plugins={[Autoplay({ delay: 4000 })]} opts={{ loop: true }}>
        <CarouselContent className='-ml-2 md:-ml-4'>
          {banners.map((banner) => (
            <CarouselItem key={banner.id} className='basis-[90%] pl-2 md:basis-full md:pl-4'>
              <a
                href={banner.image.url}
                className='block aspect-[3/1]'
                rel='noreferrer noopenner'
                target='_blank'
              >
                <Image
                  alt='banner'
                  className='size-full rounded-lg object-cover md:rounded-xl'
                  height={400}
                  src={banner.image.url}
                  width={1200}
                />
              </a>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='hidden size-12 md:flex' />
        <CarouselNext className='hidden size-12 md:flex' />
      </Carousel>
    </BaseLayout>
  );
};
