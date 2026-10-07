import type { Metadata } from 'next';

import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

import { BaseLayout, MobileHeader } from '@/components/layout';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { Link } from '@/i18n/navigation';
import { getBrands } from '@/utils/api/requests';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return { title: t('Only original products'), description: t('metadata.pages.brands') };
}

const BrandsPage = async () => {
  const t = await getTranslations();
  const brandsResponse = await getBrands();
  const brands = brandsResponse.data.result;

  return (
    <div>
      <MobileHeader />
      <BaseLayout className='mt-2 space-y-6 md:mt-4'>
        <Breadcrumb className='mb-2 md:mb-4'>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href='/'>{t('Home')}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{t('Only original products')}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className='text-xl font-bold md:text-3xl'>{t('Only original products')}</h1>
        <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4 lg:grid-cols-5 xl:grid-cols-6'>
          {brands.map((brand) => (
            <Link
              key={brand.id}
              className='hover:border-primary/50 flex flex-col items-center justify-center gap-2 rounded-xl border p-4 transition-colors'
              href={`/brand/${brand.id}?brand=${brand.id}`}
            >
              <Image
                alt={brand.name || 'Buildex'}
                className='h-16 w-full object-contain'
                height={64}
                src={brand.image}
                width={160}
              />
              {brand.name && (
                <span className='line-clamp-1 text-center text-sm font-medium'>{brand.name}</span>
              )}
            </Link>
          ))}
        </div>
      </BaseLayout>
    </div>
  );
};

export default BrandsPage;
