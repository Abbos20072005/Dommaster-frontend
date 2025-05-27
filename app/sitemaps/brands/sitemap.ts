import type { MetadataRoute } from 'next';

import { getBrands } from '@/utils/api/requests';
import { BASE_URL } from '@/utils/constants';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const res = await getBrands();
  const brands = res.data.result || [];

  return brands.map((brand) => ({
    url: `${BASE_URL}/brand/${brand.id}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.8,
    alternates: {
      languages: {
        en: `${BASE_URL}/en/brand/${brand.id}`,
        ru: `${BASE_URL}/ru/brand/${brand.id}`
      }
    }
  }));
}
