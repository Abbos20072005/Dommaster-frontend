import type { Metadata } from 'next';

import { getTranslations } from 'next-intl/server';
import React from 'react';

import { JsonLd } from '@/components/JsonLd';
import { BaseLayout, MobileHeader } from '@/components/layout';
import { ProductFilterPaginated } from '@/components/ProductFilterPaginated';
import {
  getInitialProducts,
  parsePage
} from '@/components/ProductFilterPaginated/getInitialProducts';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { categoryMetadata } from '@/lib/categoryMeta';
import { breadcrumbJsonLd } from '@/lib/jsonLd';
import type { FilterPageDetail } from '@/lib/filterPages';
import { filterPagePath } from '@/lib/filterPages';
import { categoryHref } from '@/lib/urls';

interface Props {
  page: FilterPageDetail;
  /** `?page=N`: the page of the list, rendered on the server too */
  searchParams?: Promise<{ page?: string }>;
}

/** The title, the description and the share cards of a filter page (from the 2nd page of the list: the number). */
export const filterLandingMetadata = (
  page: FilterPageDetail,
  pageParam: string | undefined
): Promise<Metadata> => {
  // the API gives the H1 when the admin panel has no title: then the site name is added as on the other pages
  const ownTitle = page.meta_title.trim() && page.meta_title.trim() !== page.title.trim();
  const source = {
    name: page.title,
    meta_title: ownTitle ? page.meta_title : null,
    meta_description: page.meta_description
  };
  return categoryMetadata({ source, page: parsePage(pageParam) });
};

/**
 * A filter landing page (brand × category, brand × sub-category, a size ...): the H1, the products
 * of `product_filter`, and the short text of the page under them. The levels it belongs to are in
 * the breadcrumbs, so a visitor goes up to the category.
 */
const FilterLandingPage = async ({ page, searchParams }: Props) => {
  const t = await getTranslations();
  const pageNumber = parsePage((await searchParams)?.page);

  // `filters` of the page is the definition of the list; an empty one must not wipe the visitor's own
  const { filters, ...scope } = page.product_filter;
  const queries: Partial<ProductRequest> = {
    ...scope,
    ...(Object.keys(filters ?? {}).length ? { filters } : {})
  };
  const initialProducts = await getInitialProducts(queries, pageNumber);

  const crumbs = page.breadcrumbs.map((crumb, index) => ({
    name: crumb.name,
    path: categoryHref(...page.breadcrumbs.slice(0, index + 1))
  }));

  const priceFilter: Filter = {
    request_var: 'price',
    type: 'SLIDER',
    name: t('Price'),
    filter_items: [],
    from: 0,
    to: 100000000
  };

  return (
    <div>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: t('Catalog'), path: '/catalog' },
          ...crumbs,
          { name: page.title, path: filterPagePath(page) }
        ])}
      />
      <MobileHeader />
      <BaseLayout className='mt-2 space-y-4 md:mt-4 md:space-y-6'>
        <Breadcrumb className='mb-2 md:mb-4'>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href='/catalog'>{t('Catalog')}</BreadcrumbLink>
            </BreadcrumbItem>
            {crumbs.map((crumb) => (
              <React.Fragment key={crumb.path}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href={crumb.path}>{crumb.name}</BreadcrumbLink>
                </BreadcrumbItem>
              </React.Fragment>
            ))}
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{page.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className='text-lg leading-8 font-bold md:text-2xl lg:text-3xl'>{page.title}</h1>
        <ProductFilterPaginated
          filters={[priceFilter]}
          initialPage={pageNumber}
          initialProducts={initialProducts}
          queries={queries}
          hideCategories
        />
        {page.text.trim() && (
          <p className='text-muted-foreground max-w-4xl text-sm leading-6 whitespace-pre-line md:text-base'>
            {page.text.trim()}
          </p>
        )}
      </BaseLayout>
    </div>
  );
};

export default FilterLandingPage;
