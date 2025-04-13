import Image from 'next/image';

import { BaseLayout } from '@/components/layout';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { Link } from '@/i18n/navigation';

const categories = [
  {
    id: 1,
    title: 'Стройматериалы',
    image: {
      url: 'https://mini-io-api.texnomart.uz/catalog/special-category/4/aa4237cb-9bc4-4941-8535-277ca7831f48.png'
    }
  },
  {
    id: 2,
    title: 'Инструмент',
    image: {
      url: 'https://mini-io-api.texnomart.uz/catalog/special-category/5/ade607e8-e08e-40a1-85c1-b291327fe412.png'
    }
  },
  {
    id: 3,
    title: 'Электрика',
    image: {
      url: 'https://mini-io-api.texnomart.uz/catalog/special-category/7/74a09808-7198-496a-b704-158399923abd.png'
    }
  },
  {
    id: 4,
    title: 'Инженерные системы',
    image: {
      url: 'https://mini-io-api.texnomart.uz/catalog/special-category/22/1f3896fc-fbb9-4d2f-ac2e-17df4bf4959b.png'
    }
  },
  {
    id: 5,
    title: 'Финишная отделка',
    image: {
      url: 'https://mini-io-api.texnomart.uz/catalog/special-category/22/1f3896fc-fbb9-4d2f-ac2e-17df4bf4959b.png'
    }
  },
  {
    id: 6,
    title: 'Товары для дома',
    image: {
      url: 'https://mini-io-api.texnomart.uz/catalog/special-category/22/1f3896fc-fbb9-4d2f-ac2e-17df4bf4959b.png'
    }
  },
  {
    id: 7,
    title: 'Сантехника',
    image: {
      url: 'https://mini-io-api.texnomart.uz/catalog/special-category/22/1f3896fc-fbb9-4d2f-ac2e-17df4bf4959b.png'
    }
  },
  {
    id: 8,
    title: 'Крепеж',
    image: {
      url: 'https://mini-io-api.texnomart.uz/catalog/special-category/22/1f3896fc-fbb9-4d2f-ac2e-17df4bf4959b.png'
    }
  },
  {
    id: 9,
    title: 'Инженерные системы',
    image: {
      url: 'https://mini-io-api.texnomart.uz/catalog/special-category/22/1f3896fc-fbb9-4d2f-ac2e-17df4bf4959b.png'
    }
  }
];

export const PopularCategories = () => {
  return (
    <BaseLayout>
      {/* Mobile */}
      <div className='grid grid-flow-col grid-rows-2 gap-2 overflow-x-auto md:hidden'>
        {categories.map((item) => (
          <Link
            href={`/category/${item.id}`}
            key={item.id}
            className='bg-muted relative block size-25 rounded-md p-2 [word-break:break-word]'
          >
            <div className='relative z-1 text-xs'>{item.title}</div>
            <Image
              alt={item.title}
              className='absolute right-0 bottom-0 rounded-lg'
              height={80}
              src={item.image.url}
              width={80}
            />
          </Link>
        ))}
      </div>

      {/* Desktop */}
      <Carousel className='hidden md:block' opts={{ align: 'start' }}>
        <CarouselContent className='ml-2 md:-ml-4'>
          {categories
            .filter((_, index) => index % 2 === 0)
            .map((item, index) => {
              const nextItem = categories[index * 2 + 1];
              return (
                <CarouselItem key={item.id} className='basis-[192px] space-y-4 pl-2 md:pl-4'>
                  <div className='h-32'>
                    <Link
                      href={`/category/${item.id}`}
                      className='bg-muted relative block size-full rounded-md px-4 py-3'
                    >
                      <div className='relative z-1 text-sm font-semibold'>{item.title}</div>
                      <Image
                        alt={item.title}
                        className='absolute right-0 bottom-0 rounded-lg'
                        height={192}
                        src={item.image.url}
                        width={128}
                      />
                    </Link>
                  </div>
                  {nextItem && (
                    <div key={nextItem.id} className='h-32'>
                      <Link
                        href={`/category/${nextItem.id}`}
                        className='bg-muted relative block size-full rounded-md px-4 py-3'
                      >
                        <div className='relative z-1 text-sm font-semibold'>{nextItem.title}</div>
                        <Image
                          alt={nextItem.title}
                          className='absolute right-0 bottom-0 rounded-lg'
                          height={192}
                          src={nextItem.image.url}
                          width={128}
                        />
                      </Link>
                    </div>
                  )}
                </CarouselItem>
              );
            })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </BaseLayout>
  );
};
