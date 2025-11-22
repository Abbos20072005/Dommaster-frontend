import type { Metadata } from 'next';

import { getTranslations } from 'next-intl/server';

import { BaseLayout, MobileHeader } from '@/components/layout';
import { ProductFilterPaginated } from '@/components/ProductFilterPaginated';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { getBrands, getSaleById } from '@/utils/api/requests';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const saleResponse = await getSaleById({ id });
  const sale = saleResponse.data.result;

  return { title: sale?.name };
}

const SalePage = async ({ params }: Props) => {
  const t = await getTranslations();
  const { id } = await params;

  const saleResponse = await getSaleById({ id });
  const sale = saleResponse.data.result;

  const brandsResponse = await getBrands();
  const brands = brandsResponse.data.result || [];

  const filters: Filter[] = [
    {
      request_var: 'price',
      type: 'SLIDER',
      name: t('Price'),
      filter_items: [],
      from: 0,
      to: 100000000
    },
    {
      name: t('Brands'),
      type: 'RADIO',
      request_var: 'brand',
      filter_items: brands.map((brand) => ({
        value: String(brand.id),
        label: brand.name
      }))
    }
  ];

  if (!sale || !brands) return null;

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
        <ProductFilterPaginated filters={filters} queries={{ sale_id: sale.id }} />
      </BaseLayout>
    </div>
  );
};

export default SalePage;
