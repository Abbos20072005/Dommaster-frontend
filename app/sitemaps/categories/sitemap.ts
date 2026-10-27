import type { MetadataRoute } from 'next';

import { lastModified } from '@/lib/sitemap';
import { categoryHref } from '@/lib/urls';
import { BASE_URL } from '@/utils/constants';

// the list is rebuilt once an hour, not on every visit of the crawler
export const revalidate = 3600;

/** All the categories: the main ones, the sub-categories and the item categories. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const api = process.env.API_URL;
  const list = (await (await fetch(`${api}categories/`)).json()) as CategoriesResponse;
  const categories = list.result || [];

  // the sub-categories come with the main category (9 requests, not one per sub-category)
  const details = await Promise.all(
    categories.map(async (category) => {
      try {
        return (await (await fetch(`${api}categories/${category.id}`)).json()) as CategoryResponse;
      } catch {
        return undefined;
      }
    })
  );

  const urls: MetadataRoute.Sitemap = [];
  categories.forEach((category, index) => {
    if (!category.name) return;
    urls.push({
      url: `${BASE_URL}${categoryHref(category)}`,
      lastModified: lastModified((category as { updated_at?: string }).updated_at)
    });
    for (const sub of details[index]?.result?.sub_categories ?? []) {
      // an empty category is not worth indexing (it shows "no products found")
      const items = (sub.product_item_categories ?? []).filter(
        (item) => (item as { product_amount?: number }).product_amount !== 0
      );
      if (!items.length) continue;
      urls.push({
        url: `${BASE_URL}${categoryHref(category, sub)}`,
        lastModified: lastModified((sub as { updated_at?: string }).updated_at)
      });
      for (const item of items) {
        urls.push({
          url: `${BASE_URL}${categoryHref(category, sub, item)}`,
          lastModified: lastModified((item as { updated_at?: string }).updated_at)
        });
      }
    }
  });

  return urls;
}
