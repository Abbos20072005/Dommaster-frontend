import { getTranslations } from 'next-intl/server';
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
import { getBrands } from '@/utils/api/requests';

export const BrandsSection = async () => {
  const t = await getTranslations();
  const brandsResponse = await getBrands();
  const brands = brandsResponse.data.result;

  if (!brands.length) return null;

  return (
    <section>
      <BaseLayout>
        <h2 className='mb-4 text-lg font-bold md:text-2xl'>{t('Only original products')}</h2>

        {/* Mobile */}
        <div className='overflow-x-auto md:hidden'>
          <div className='flex h-16 gap-4'>
            {brands.map((item) => (
              <Link
                href={`/brand/${item.id}?brand=${item.id}`}
                key={item.id}
                className='flex h-16 w-28 shrink-0 items-center justify-center rounded-md'
              >
                <Image
                  alt={item.name || 'Buildex'}
                  className='h-12 w-24 object-contain'
                  height={36}
                  src={item.image}
                  width={88}
                />
              </Link>
            ))}
          </div>
        </div>

        {/* Desktop */}
        <Carousel className='hidden md:block' opts={{ align: 'start' }}>
          <CarouselContent>
            {brands.map((item) => (
              <CarouselItem key={item.id} className='basis-50 space-y-4'>
                <Link
                  href={`/brand/${item.id}?brand=${item.id}`}
                  key={item.id}
                  className='flex h-22 items-center justify-center rounded-md'
                >
                  <Image
                    alt={item.name || 'Buildex'}
                    className='h-16 w-36 object-contain'
                    height={36}
                    src={item.image}
                    width={88}
                  />
                </Link>
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
