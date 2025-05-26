import { BaseLayout } from '@/components/layout';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { Skeleton } from '@/components/ui/skeleton';

export const PopularCategoriesSectionSkeleton = () => {
  return (
    <BaseLayout>
      {/* Mobile */}
      <div className='grid grid-flow-col grid-rows-2 gap-2 overflow-x-auto md:hidden'>
        {Array.from({ length: 12 }).map((_, index) => (
          <Skeleton key={index} className='size-25' />
        ))}
      </div>

      {/* Desktop */}
      <Carousel className='hidden md:block' opts={{ align: 'start' }}>
        <CarouselContent className='ml-2 md:-ml-3'>
          {Array.from({ length: 12 }).map((_, index) => (
            <CarouselItem
              key={index}
              className='basis-[135px] space-y-4 pl-2 md:pl-3 lg:basis-[149px]'
            >
              <div className='aspect-square'>
                <Skeleton className='size-full' />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </BaseLayout>
  );
};
