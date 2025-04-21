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
            className='bg-muted relative block size-25 rounded-md p-2 [word-break:break-word]'
          >
            <div className='relative z-1 text-xs'>{item.name}</div>
            <Image
              alt={item.name}
              className='absolute right-0 bottom-0 rounded-lg'
              height={80}
              src={item.image}
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
                <CarouselItem key={item.id} className='basis-[215px] space-y-4 pl-2 md:pl-4'>
                  <div className='h-32'>
                    <Link
                      href={`/category/${item.id}`}
                      className='bg-muted relative block size-full rounded-md px-4 py-3'
                    >
                      <div className='relative z-1 text-sm font-semibold'>{item.name}</div>
                      <Image
                        alt={item.name}
                        className='absolute right-0 bottom-0 rounded-lg'
                        height={192}
                        src={item.image}
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
                        <div className='relative z-1 text-sm font-semibold'>{nextItem.name}</div>
                        <Image
                          alt={nextItem.name}
                          className='absolute right-0 bottom-0 rounded-lg'
                          height={192}
                          src={nextItem.image}
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
