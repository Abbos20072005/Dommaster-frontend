'use client';

import { useQuery } from '@tanstack/react-query';
import { ArrowRightIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { BaseLayout } from '@/components/layout';
import { ProductList } from '@/components/modules/product';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { getAddsBrands } from '@/utils/api/requests';

import { AddsBrandsSectionLoading } from './AddsBrandsSectionLoading';

export const AddsBrandsSection = () => {
  const t = useTranslations();
  const getAddsBrandsQuery = useQuery({
    queryKey: ['addsBrands'],
    staleTime: 0,
    queryFn: () => getAddsBrands()
  });

  const addsBrands = getAddsBrandsQuery.data?.data.result || [];

  if (getAddsBrandsQuery.isLoading) return <AddsBrandsSectionLoading />;

  if (!addsBrands.length) return null;

  return addsBrands.map((brand) => (
    <section key={brand.id}>
      <BaseLayout>
        <div className='flex items-center justify-between gap-3'>
          <h2 className='text-lg font-bold md:text-2xl'>{brand.name}</h2>
          <Button asChild size='sm' variant='muted'>
            <Link href={`/brand/${brand.id}`} scroll>
              {t('View all')}
              <ArrowRightIcon />
            </Link>
          </Button>
        </div>
        <ProductList products={brand.products} />
      </BaseLayout>
    </section>
  ));
};
