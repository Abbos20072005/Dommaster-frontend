import type { MetadataRoute } from 'next';

import { getProducts } from '@/utils/api/requests';
import { BASE_URL } from '@/utils/constants';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const productsRes = await getProducts({ data: { page: 1, page_size: 1 } });
  const productPages = Array.from({
    length: Math.ceil(productsRes.data.result.totalElements / 10000)
  }).map((_, index) => ({
    id: index + 1
  }));

  return [
    {
      url: `${BASE_URL}/sitemaps/static/sitemap.xml`,
      lastModified: new Date()
    },
    {
      url: `${BASE_URL}/sitemaps/brands/sitemap.xml`,
      lastModified: new Date()
    },
    {
      url: `${BASE_URL}/sitemaps/services/sitemap.xml`,
      lastModified: new Date()
    },
    {
      url: `${BASE_URL}/sitemaps/news/sitemap.xml`,
      lastModified: new Date()
    },
    {
      url: `${BASE_URL}/sitemaps/categories/sitemap.xml`,
      lastModified: new Date()
    },
    ...productPages?.map((product) => ({
      url: `${BASE_URL}/sitemaps/products/sitemap/${product.id}.xml`,
      lastModified: new Date()
    }))
  ];
}
