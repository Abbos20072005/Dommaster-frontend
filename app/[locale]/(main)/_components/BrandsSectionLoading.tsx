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

/** The title, "view all" and the row of logos, as in `BrandsSection`. */
export const BrandsSectionLoading = () => {
  const t = useTranslations();

  return (
    <section>
      <BaseLayout>
        <div className='mb-4 flex items-center justify-between gap-3'>
          <h2 className='text-lg font-bold md:text-2xl'>{t('Only original products')}</h2>
          <Skeleton className='h-8 w-28 rounded-md' />
        </div>

        {/* Mobile */}
        <div className='overflow-x-auto md:hidden'>
          <div className='flex h-16 gap-4'>
            {Array.from({ length: 10 }).map((_, index) => (
              <Skeleton key={index} className='h-16 w-28 shrink-0 rounded-md' />
            ))}
          </div>
        </div>

        {/* Desktop */}
        <Carousel className='hidden md:block' opts={{ align: 'start' }}>
          <CarouselContent>
            {Array.from({ length: 10 }).map((_, index) => (
              <CarouselItem key={index} className='basis-50 space-y-4'>
                <Skeleton className='h-22 w-full rounded-md' />
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
