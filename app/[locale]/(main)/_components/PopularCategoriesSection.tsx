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
import { getCategories } from '@/utils/api/requests';

export const PopularCategoriesSection = async () => {
  const categoriesResponse = await getCategories();
  const categories = categoriesResponse.data.result;

  return (
    <BaseLayout>
      {/* Mobile */}
      <div className='grid grid-flow-col grid-rows-2 gap-2 overflow-x-auto md:hidden'>
        {categories.map((item) => (
          <Link
            href={`/category/${item.id}`}
            key={item.id}
            className='bg-muted relative block size-25 rounded-md p-2'
          >
            <div className='relative z-1 text-xs [word-break:break-word]'>{item.name}</div>
            <Image
              alt={item.name}
              className='absolute inset-0 size-full rounded-lg object-contain'
              height={80}
              src={item.image}
              width={80}
            />
          </Link>
        ))}
      </div>

      {/* Desktop */}
      <Carousel className='hidden md:block' opts={{ align: 'start' }}>
        <CarouselContent className='ml-2 md:-ml-3'>
          {categories.map((item) => (
            <CarouselItem key={item.id} className='basis-1/8 space-y-3 pl-2 md:pl-3 lg:basis-1/9'>
              <Link
                href={`/category/${item.id}`}
                className='bg-muted relative block aspect-square rounded-md p-2.5'
              >
                <div className='relative z-1 text-xs leading-4.5 font-medium [word-break:break-word] lg:text-sm'>
                  {item.name}
                </div>
                <Image
                  alt={item.name}
                  className='absolute inset-0 size-full rounded-lg object-contain'
                  height={128}
                  src={item.image}
                  width={128}
                />
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </BaseLayout>
  );
};
