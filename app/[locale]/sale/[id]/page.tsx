'use client';

import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

import { BaseLayout, MobileHeader } from '@/components/layout';
import { ProductList } from '@/components/modules/product';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { getSaleById } from '@/utils/api/requests';

import SaleLoading from './loading';

const SalePage = () => {
  const t = useTranslations();
  const { id } = useParams<{ id: string }>();
  const getSaleQuery = useQuery({
    queryKey: ['sale', id],
    queryFn: () => getSaleById({ id })
  });

  const sale = getSaleQuery.data?.data.result;

  if (getSaleQuery.isLoading) return <SaleLoading />;

  if (!sale) return null;

  return (
    <div>
      <MobileHeader />
      <BaseLayout className='mt-2 md:mt-4'>
        <Breadcrumb className='mb-2 md:mb-4'>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href='/'>{t('Home')}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{sale.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className='mb-4 font-bold sm:text-lg md:text-2xl'>{sale.name}</h1>
        <ProductList products={sale.products} />
      </BaseLayout>
    </div>
  );
};

export default SalePage;
