import type { MetadataRoute } from 'next';

import { BASE_URL } from '@/utils/constants';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const res = await fetch(`${process.env.API_URL}base/news/?page_size=10000`);
  const data = (await res.json()) as NewsListResponse;
  const news = data.result.content || [];

  return news.map((news) => ({
    url: `${BASE_URL}/news/${news.id}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.6,
    alternates: {
      languages: {
        uz: `${BASE_URL}/uz/news/${news.id}`,
        en: `${BASE_URL}/en/news/${news.id}`,
        ru: `${BASE_URL}/ru/news/${news.id}`
      }
    }
  }));
}
