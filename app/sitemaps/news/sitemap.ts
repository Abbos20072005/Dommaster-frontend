import type { MetadataRoute } from 'next';

import { BASE_URL } from '@/utils/constants';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const res = await fetch(`${process.env.API_URL}base/news/?page_size=10000`);
  const data = (await res.json()) as NewsListResponse;
  const news = data.result.content || [];

  return news.map((item) => ({
    url: `${BASE_URL}/blogs/${item.id}`,
    // the creation date: the API gives no date of the last change
    lastModified: item.created_at
  }));
}
