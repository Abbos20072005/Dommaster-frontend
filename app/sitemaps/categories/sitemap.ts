import type { MetadataRoute } from 'next';

import { languagePair, lastModified } from '@/lib/sitemap';
import { categoryHref } from '@/lib/urls';

// the list is rebuilt once an hour, not on every visit of the crawler
export const revalidate = 3600;

type Language = 'ru' | 'uz';

const getJson = async <T>(path: string, language: Language) =>
  (await (
    await fetch(`${process.env.API_URL}${path}`, { headers: { 'Accept-Language': language } })
  ).json()) as T;

/**
 * The categories of one language: the main ones, the sub-categories and the item categories,
 * keyed by their ids (`3`, `3/12`, `3/12/40`) so the two languages can be paired.
 */
const collect = async (language: Language) => {
  const list = await getJson<CategoriesResponse>('categories/', language);
  const categories = list.result || [];

  // the sub-categories come with the main category (9 requests, not one per sub-category)
  const details = await Promise.all(
    categories.map(async (category) => {
      try {
        return await getJson<CategoryResponse>(`categories/${category.id}`, language);
      } catch {
        return undefined;
      }
    })
  );

  const pages = new Map<string, { href: string; updatedAt?: string }>();
  categories.forEach((category, index) => {
    if (!category.name) return;
    pages.set(`${category.id}`, {
      href: categoryHref(category),
      updatedAt: (category as { updated_at?: string }).updated_at
    });
    for (const sub of details[index]?.result?.sub_categories ?? []) {
      // an empty category is not worth indexing (it shows "no products found")
      const items = (sub.product_item_categories ?? []).filter(
        (item) => (item as { product_amount?: number }).product_amount !== 0
      );
      if (!items.length) continue;
      pages.set(`${category.id}/${sub.id}`, {
        href: categoryHref(category, sub),
        updatedAt: (sub as { updated_at?: string }).updated_at
      });
      for (const item of items) {
        pages.set(`${category.id}/${sub.id}/${item.id}`, {
          href: categoryHref(category, sub, item),
          updatedAt: (item as { updated_at?: string }).updated_at
        });
      }
    }
  });
  return pages;
};

/** All the categories at their Russian and Uzbek addresses, with hreflang. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [ru, uz] = await Promise.all([collect('ru'), collect('uz')]);

  return [...ru].flatMap(([key, page]) =>
    languagePair(
      { ru: page.href, uz: uz.get(key)?.href },
      { lastModified: lastModified(page.updatedAt) }
    )
  );
}
