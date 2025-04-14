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

  return (
    <section>
      <BaseLayout>
        <h2 className='mb-4 text-lg font-bold md:text-2xl'>{t('Only original products')}</h2>

        {/* Mobile */}
        <div className='overflow-x-auto md:hidden'>
          <div className='flex h-9 gap-2'>
            {brands.map((item) => (
              <Link href={`/brand/${item.id}`} key={item.id} className='block h-9 rounded-md'>
                <Image
                  alt={item.name}
                  className='size-full min-w-22 object-contain p-1'
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
                <Link href={`/brand/${item.id}`} key={item.id} className='block h-22 rounded-md'>
                  <Image
                    alt={item.name}
                    className='size-full object-contain py-2'
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
