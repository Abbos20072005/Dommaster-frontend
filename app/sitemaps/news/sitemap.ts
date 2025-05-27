import type { MetadataRoute } from 'next';

import { getNewsList } from '@/utils/api/requests';
import { BASE_URL } from '@/utils/constants';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const res = await getNewsList({ config: { params: { page_size: 10000 } } });
  const news = res.data.result.content || [];

  return news.map((news) => ({
    url: `${BASE_URL}/news/${news.id}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.6,
    alternates: {
      languages: {
        en: `${BASE_URL}/en/news/${news.id}`,
        ru: `${BASE_URL}/ru/news/${news.id}`
      }
    }
  }));
}
