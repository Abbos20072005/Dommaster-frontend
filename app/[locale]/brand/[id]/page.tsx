import type { Metadata } from 'next';

import { getTranslations } from 'next-intl/server';

import { BaseLayout, MobileHeader } from '@/components/layout';
import { ProductFilterPaginated } from '@/components/ProductFilterPaginated';
import { getInitialProducts } from '@/components/ProductFilterPaginated/getInitialProducts';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { Link } from '@/i18n/navigation';
import { getBrandById, getProducts } from '@/utils/api/requests';

interface Props {
  params: Promise<{ id: string }>;
}

/** The item categories of the brand's products (up to 100 of them are looked at). */
const getBrandCategories = async (brandId: number) => {
  try {
    const { data } = await getProducts({ data: { brand: brandId, page_size: 100 } });
    const byHref = new Map<string, { name: string; href: string; count: number }>();

    for (const product of data.result.content ?? []) {
      const [category, subCategory, itemCategory] = product.breadcrumbs ?? [];
      if (!category || !subCategory || !itemCategory?.name) continue;
      const href = `/category/${category.id}/${subCategory.id}/${itemCategory.id}`;
      const existing = byHref.get(href);
      if (existing) existing.count += 1;
      else byHref.set(href, { name: itemCategory.name, href, count: 1 });
    }

    return [...byHref.values()].sort((a, b) => b.count - a.count).slice(0, 12);
  } catch {
    return [];
  }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const brandResponse = await getBrandById({ id });
  const brand = brandResponse.data.result;

  return { title: brand?.name };
}

const SearchPage = async ({ params }: Props) => {
  const t = await getTranslations();
  const { id } = await params;
  const brandResponse = await getBrandById({ id });
  const brand = brandResponse.data.result;
  const initialProducts = await getInitialProducts({ brand: brand.id });
  // the categories of the brand: those of its products (the API has no such list)
  const categories = await getBrandCategories(brand.id);
  // const salesResponse = await getSales();
  // const sales = salesResponse.data.result;

  const filters: Filter[] = [
    {
      request_var: 'price',
      type: 'SLIDER',
      name: t('Price'),
      filter_items: [],
      from: 0,
      to: 100000000
    }
    // {
    //   name: t('Sales'),
    //   type: 'RADIO',
    //   request_var: 'sale_id',
    //   filter_items: sales.map((sale) => ({
    //     value: String(sale.id),
    //     label: sale.name
    //   }))
    // }
  ];

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
              <BreadcrumbPage>{brand.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className='mb-4 font-bold sm:text-lg md:text-2xl'>{brand.name}</h1>
        {brand.description && (
          <p className='text-muted-foreground mb-4 max-w-3xl text-sm leading-6 md:text-base'>
            {brand.description}
          </p>
        )}
        {categories.length > 0 && (
          <nav aria-label={t('Categories')} className='mb-4 flex flex-wrap gap-2'>
            {categories.map((category) => (
              <Link
                href={category.href}
                key={category.href}
                className='border-border hover:bg-muted rounded-full border bg-white px-3.5 py-1.5 text-sm'
              >
                {category.name}
              </Link>
            ))}
          </nav>
        )}
        <ProductFilterPaginated
          filterDefaultValues={{ brand: brand.id }}
          filters={filters}
          initialProducts={initialProducts}
          queries={{ brand: brand.id }}
        />
      </BaseLayout>
    </div>
  );
};

export default SearchPage;
