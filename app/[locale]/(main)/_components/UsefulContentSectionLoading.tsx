import { BaseLayout } from '@/components/layout';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Skeleton } from '@/components/ui/skeleton';

export const UsefulContentSectionLoading = () => {
  return (
    <section>
      <BaseLayout className='space-y-4'>
        <div className='flex items-center justify-between'>
          <Skeleton className='h-11 w-full sm:w-[327px]' />
          <Skeleton className='hidden h-8 w-[96px] sm:block' />
        </div>
        <Carousel>
          <CarouselContent>
            {Array.from({ length: 4 }).map((_, index) => (
              <CarouselItem key={index} className='basis-[280px] md:basis-1/3 lg:basis-1/4'>
                <Skeleton className='h-[250px] w-full' />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <Skeleton className='h-8 w-full sm:hidden' />
      </BaseLayout>
    </section>
  );
};
