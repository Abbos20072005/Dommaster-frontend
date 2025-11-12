import type { MetadataRoute } from 'next';

import { BASE_URL } from '@/utils/constants';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const res = await fetch(`${process.env.API_URL}brands/`);
  const data = (await res.json()) as BrandsResponse;

  return data.result.map((brand) => ({
    url: `${BASE_URL}/brand/${brand.id}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.8,
    alternates: {
      languages: {
        uz: `${BASE_URL}/uz/brand/${brand.id}`,
        en: `${BASE_URL}/en/brand/${brand.id}`,
        ru: `${BASE_URL}/ru/brand/${brand.id}`
      }
    }
  }));
}
