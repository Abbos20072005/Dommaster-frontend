import type { MetadataRoute } from 'next';

import { languagePair } from '@/lib/sitemap';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const res = await fetch(`${process.env.API_URL}base/news/?page_size=10000`);
  const data = (await res.json()) as NewsListResponse;
  const news = data.result.content || [];

  return news.flatMap((item) => {
    const path = `/blogs/${item.id}`;
    // the creation date: the API gives no date of the last change
    return languagePair({ ru: path, uz: path }, { lastModified: item.created_at });
  });
}
