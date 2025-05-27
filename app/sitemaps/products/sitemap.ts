import type { MetadataRoute } from 'next';

import { getProducts } from '@/utils/api/requests';
import { BASE_URL } from '@/utils/constants';

export async function generateSitemaps() {
  const products = await getProducts({ data: { page: 1, page_size: 10000 } });

  return Array.from({ length: products.data.result.totalPages }).map((_, index) => ({
    id: index + 1
  }));
}

export default async function sitemap({ id }: { id: number }): Promise<MetadataRoute.Sitemap> {
  // Google's limit is 50,000 URLs per sitemap
  const res = await getProducts({ data: { page: id, page_size: 10000 } });
  const products = res.data.result.content || [];

  return products.map((product) => ({
    url: `${BASE_URL}/product/${product.id}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.7,
    alternates: {
      languages: {
        en: `${BASE_URL}/en/product/${product.id}`,
        ru: `${BASE_URL}/ru/product/${product.id}`
      }
    },
    images: product.images.map((image) => image.image)
  }));
}
