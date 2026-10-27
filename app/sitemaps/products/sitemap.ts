import type { MetadataRoute } from 'next';

import { lastModified, PRODUCTS_PER_SITEMAP } from '@/lib/sitemap';
import { productHref } from '@/lib/urls';
import { BASE_URL } from '@/utils/constants';

// the files are made when the crawler asks (and kept for an hour by the fetch cache), not at
// the build: 30 files built at once overload the API and it answers with errors
export const dynamic = 'force-dynamic';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchProducts = async (page: number, pageSize: number) => {
  let lastError: unknown;
  // the API sometimes fails under load: a few tries, and an error (not an empty list) at the end
  for (let attempt = 0; attempt < 4; attempt++) {
    try {
      // the filter reads `page` and `page_size` from the body, not from the query
      const res = await fetch(`${process.env.API_URL}product/filter/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page, page_size: pageSize }),
        next: { revalidate: 3600 }
      });
      if (!res.ok) throw new Error(`product/filter/ answered ${res.status}`);
      return (await res.json()) as ProductsResponse;
    } catch (error) {
      lastError = error;
      await wait(1500 * (attempt + 1));
    }
  }
  throw lastError;
};

export async function generateSitemaps() {
  const data = await fetchProducts(1, 1);
  return Array.from({
    length: Math.ceil(data.result.totalElements / PRODUCTS_PER_SITEMAP)
  }).map((_, index) => ({ id: index + 1 }));
}

// Next.js 16 gives `id` as a promise (a number in the older versions): `await` takes both
export default async function sitemap(props: {
  id: Promise<number | string> | number | string;
}): Promise<MetadataRoute.Sitemap> {
  const id = Number(await props.id);
  const data = await fetchProducts(id, PRODUCTS_PER_SITEMAP);

  return (data.result?.content ?? []).map((product) => ({
    url: `${BASE_URL}${productHref(product)}`,
    lastModified: lastModified((product as { updated_at?: string }).updated_at),
    images: (product.images ?? []).map((image) => image.image).filter(Boolean)
  }));
}
