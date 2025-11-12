import type { MetadataRoute } from 'next';

import { BASE_URL } from '@/utils/constants';

export async function generateSitemaps() {
  const res = await fetch(`${process.env.API_URL}product/filter/?page_size=1`, {
    method: 'POST'
  });
  const data = (await res.json()) as ProductsResponse;
  return Array.from({
    length: Math.ceil(data.result.totalElements / 10000)
  }).map((_, index) => ({
    id: index + 1
  }));
}

export default async function sitemap({ id }: { id: number }): Promise<MetadataRoute.Sitemap> {
  // Google's limit is 50,000 URLs per sitemap
  const res = await fetch(`${process.env.API_URL}product/filter/?page=${id}&page_size=10000`, {
    method: 'POST'
  });
  const data = (await res.json()) as ProductsResponse;
  const products = data.result.content || [];

  return products.map((product) => ({
    url: `${BASE_URL}/product/${product.id}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.7,
    alternates: {
      languages: {
        uz: `${BASE_URL}/uz/product/${product.id}`,
        en: `${BASE_URL}/en/product/${product.id}`,
        ru: `${BASE_URL}/ru/product/${product.id}`
      }
    },
    images: product.images.map((image) => image.image)
  }));
}
