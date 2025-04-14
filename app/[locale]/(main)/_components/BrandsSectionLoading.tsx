import { useTranslations } from 'next-intl';

import { BaseLayout } from '@/components/layout';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { Skeleton } from '@/components/ui/skeleton';

export const BrandsSectionLoading = () => {
  const t = useTranslations();

  return (
    <section>
      <BaseLayout>
        <h2 className='mb-4 text-lg font-bold md:text-2xl'>{t('Only original products')}</h2>

        {/* Mobile */}
        <div className='overflow-x-auto md:hidden'>
          <div className='flex h-9 gap-2'>
            {Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className='block h-9 rounded-md'>
                <Skeleton className='size-full min-w-22' />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop */}
        <Carousel className='hidden md:block' opts={{ align: 'start' }}>
          <CarouselContent>
            {Array.from({ length: 10 }).map((_, index) => (
              <CarouselItem key={index} className='basis-50 space-y-4'>
                <Skeleton className='size-full h-22 min-w-22' />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </BaseLayout>
    </section>
  );
};
