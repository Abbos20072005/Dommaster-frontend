import type { MetadataRoute } from 'next';

import { PRODUCTS_PER_SITEMAP } from '@/lib/sitemap';
import { BASE_URL } from '@/utils/constants';

// the list is rebuilt once an hour, not on every visit of the crawler
export const revalidate = 3600;

const fetchProducts = async (page: number, pageSize: number) => {
  // the filter reads `page` and `page_size` from the body, not from the query
  const res = await fetch(`${process.env.API_URL}product/filter/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ page, page_size: pageSize })
  });
  return (await res.json()) as ProductsResponse;
};

export async function generateSitemaps() {
  const data = await fetchProducts(1, 1);
  return Array.from({
    length: Math.ceil(data.result.totalElements / PRODUCTS_PER_SITEMAP)
  }).map((_, index) => ({ id: index + 1 }));
}

export default async function sitemap({ id }: { id: number }): Promise<MetadataRoute.Sitemap> {
  const data = await fetchProducts(Number(id), PRODUCTS_PER_SITEMAP);
  const products = data.result.content || [];

  // no `lastmod`: the API does not give the date of the last change of a product
  return products.map((product) => ({
    url: `${BASE_URL}/product/${product.id}`,
    images: (product.images ?? []).map((image) => image.image).filter(Boolean)
  }));
}
