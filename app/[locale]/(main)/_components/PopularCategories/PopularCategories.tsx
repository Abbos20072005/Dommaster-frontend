import { MoveRightIcon } from 'lucide-react';
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
    <BaseLayout className='px-0 pt-2 pb-0 md:px-4 md:!py-0'>
      <Carousel opts={{ align: 'start' }}>
        <CarouselContent className='ml-2 md:-ml-4'>
          {categories.map((item) => (
            <CarouselItem key={item.id} className='h-32 basis-[192px] pl-2 md:pl-4'>
              <Link
                href={`/catalog/${item.id}`}
                className='relative block size-full rounded-md px-4 py-3'
              >
                <div className='text-sm font-semibold'>{item.title}</div>
                <Image
                  alt={item.title}
                  className='bg-muted absolute inset-0 z-[-1] size-full rounded-lg'
                  height={192}
                  src={item.image.url}
                  width={128}
                />
              </Link>
            </CarouselItem>
          ))}
          <CarouselItem className='h-32 basis-[192px]'>
            <Link
              href='/catalog'
              className='bg-muted relative flex size-full items-center justify-center gap-2 rounded-md px-4 py-3'
            >
              <div className='text-sm font-semibold'>Все категории</div>
              <MoveRightIcon />
            </Link>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </BaseLayout>
  );
};
