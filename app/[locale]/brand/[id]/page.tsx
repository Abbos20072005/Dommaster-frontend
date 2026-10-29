import type { Metadata } from 'next';

import { getLocale, getTranslations } from 'next-intl/server';
import { notFound, permanentRedirect } from 'next/navigation';
import { cache } from 'react';

import { JsonLd } from '@/components/JsonLd';
import { BaseLayout, MobileHeader } from '@/components/layout';
import { breadcrumbJsonLd } from '@/lib/jsonLd';
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
import { orNotFound } from '@/lib/orNotFound';
import { matchBrandSlug, toLanguage } from '@/lib/catalogTree';
import { hasText, sanitizeHtml } from '@/lib/sanitizeHtml';
import { htmlToText, metaOverride } from '@/lib/seo';
import { categoryHref } from '@/lib/urls';
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
      const href = categoryHref(category, subCategory, itemCategory);
      const existing = byHref.get(href);
      if (existing) existing.count += 1;
      else byHref.set(href, { name: itemCategory.name, href, count: 1 });
    }

    return [...byHref.values()].sort((a, b) => b.count - a.count).slice(0, 12);
  } catch {
    return [];
  }
};

/**
 * One lookup for the metadata and the page. The address is `/brand/{slug}` (BLD-243); the slug
 * of the other language, an old numeric address or any other form leads to the right one.
 */
const getBrand = cache(async (param: string) => {
  const slug = decodeURIComponent(param);
  let id: string | number = slug;
  if (!/^\d+$/.test(slug)) {
    const match = await matchBrandSlug(slug, toLanguage(await getLocale()));
    if (!match) notFound();
    id = match.id;
  }
  const brand = (await orNotFound(getBrandById({ id }))).data.result;
  if (!brand?.id) notFound();
  if (brand.slug && brand.slug !== slug) permanentRedirect(`/brand/${brand.slug}`);
  return brand;
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const brand = await getBrand((await params).id);
  if (!brand?.name) return {};
  const t = await getTranslations();

  // the brand's own text when the admin panel has one, else a template (not the home page text)
  return {
    // `absolute`: the title already ends with the site name; the global suffix is not added
    // (it repeated "купить в Ташкенте" and, in uz, held the forbidden claim "best prices")
    title: { absolute: t('Brand meta title', { brand: brand.name }) },
    description:
      htmlToText(brand.description) || t('Brand meta description', { brand: brand.name }),
    ...metaOverride(brand)
  };
}

const SearchPage = async ({ params }: Props) => {
  const t = await getTranslations();
  const brand = await getBrand((await params).id);
  const initialProducts = await getInitialProducts({ brand: brand.id });
  // the categories of the brand: those of its products (the API has no such list)
  const categories = await getBrandCategories(brand.id);
  const description = sanitizeHtml(brand.description);
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
      <JsonLd
        data={breadcrumbJsonLd([
          { name: t('Home'), path: '/' },
          { name: t('Brands'), path: '/brands' },
          { name: brand.name }
        ])}
      />
      <MobileHeader />
      <BaseLayout className='mt-2 md:mt-4'>
        <Breadcrumb className='mb-2 md:mb-4'>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href='/'>{t('Home')}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href='/brands'>{t('Brands')}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{brand.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className='mb-4 font-bold sm:text-lg md:text-2xl'>{brand.name}</h1>
        {/* the short text of the brand (BLD-248): limited HTML like the category text, nothing when empty */}
        {hasText(description) && (
          <div
            className='prose prose-sm md:prose-base mb-4 max-w-3xl'
            dangerouslySetInnerHTML={{ __html: description }}
          />
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
