import type { MetadataRoute } from 'next';

import { lastModified, PRODUCTS_PER_SITEMAP } from '@/lib/sitemap';
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
  if (!res.ok) throw new Error(`product/filter/ answered ${res.status}`);
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
  const products = data.result?.content ?? [];
  // an empty answer is an API failure, not a real list: fail, so no empty sitemap is cached
  if (!products.length) throw new Error(`no products for sitemap ${id}`);

  return products.map((product) => ({
    url: `${BASE_URL}/product/${product.id}`,
    lastModified: lastModified((product as { updated_at?: string }).updated_at),
    images: (product.images ?? []).map((image) => image.image).filter(Boolean)
  }));
}
