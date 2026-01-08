import type { MetadataRoute } from 'next';

import { BASE_URL } from '@/utils/constants';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const res = await fetch(`${process.env.API_URL}categories/`);
  const data = (await res.json()) as CategoriesResponse;
  const categories = data.result || [];

  return categories.map((category) => ({
    url: `${BASE_URL}/category/${category.id}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.7,
    alternates: {
      languages: {
        uz: `${BASE_URL}/uz/category/${category.id}`,
        en: `${BASE_URL}/en/category/${category.id}`,
        ru: `${BASE_URL}/ru/category/${category.id}`
      }
    }
  }));
}
