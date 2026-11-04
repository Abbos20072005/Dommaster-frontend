import { BaseLayout } from '@/components/layout';
import { Card, CardFooter, CardHeader } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Skeleton } from '@/components/ui/skeleton';

/** The tabs, "view all" and four cards like the ones of the news / video / article tabs. */
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
                <Card className='flex h-full flex-col' variant='outline'>
                  <Skeleton className='aspect-video w-full rounded-t-lg rounded-b-none' />
                  <CardHeader className='flex-1 gap-1.5 p-3'>
                    <Skeleton className='h-4 w-full' />
                    <Skeleton className='h-4 w-2/3' />
                  </CardHeader>
                  <CardFooter className='p-3 pt-0'>
                    <Skeleton className='h-4 w-20' />
                  </CardFooter>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <Skeleton className='h-8 w-full sm:hidden' />
      </BaseLayout>
    </section>
  );
};
