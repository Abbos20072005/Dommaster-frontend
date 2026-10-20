import { getLocale } from 'next-intl/server';

import { Link } from '@/i18n/navigation';

interface Sub {
  id: number;
  name?: string | null;
}

interface Category {
  id: number;
  name?: string | null;
  sub_categories?: Sub[];
}

const getJson = async <T,>(path: string, locale: string): Promise<T | undefined> => {
  try {
    // the menu changes rarely: it is asked once an hour, not on every visit
    const res = await fetch(`${process.env.API_URL}${path}`, {
      headers: { 'Accept-Language': locale },
      next: { revalidate: 3600 }
    });
    return res.ok ? ((await res.json()) as T) : undefined;
  } catch {
    return undefined;
  }
};

/**
 * The catalog menu (2 levels) as plain links in the HTML. The visible menu is loaded by the
 * browser (JS), so a crawler that does not run JS would not see it and could not reach the
 * categories from any page (BLD-239). Hidden from the screen and from assistive technology
 * (it only repeats the visible menu).
 */
export const CrawlerNav = async () => {
  const locale = await getLocale();
  const list = await getJson<{ result?: Category[] }>('categories/?is_main=true', locale);
  const categories = (list?.result ?? []).filter((category) => category.name);

  const details = await Promise.all(
    categories.map((category) =>
      getJson<{ result?: Category }>(`categories/${category.id}`, locale)
    )
  );

  if (!categories.length) return null;

  return (
    <nav aria-hidden className='sr-only'>
      <ul>
        {categories.map((category, index) => (
          <li key={category.id}>
            <Link href={`/category/${category.id}`} tabIndex={-1}>
              {category.name}
            </Link>
            <ul>
              {(details[index]?.result?.sub_categories ?? [])
                .filter((sub) => sub.name)
                .map((sub) => (
                  <li key={sub.id}>
                    <Link href={`/category/${category.id}/${sub.id}`} tabIndex={-1}>
                      {sub.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  );
};
