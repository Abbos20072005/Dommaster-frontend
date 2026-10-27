import { getLocale } from 'next-intl/server';

import { Link } from '@/i18n/navigation';
import { getCatalogTree, toLanguage } from '@/lib/catalogTree';

/**
 * The catalog menu (2 levels) as plain links in the HTML. The visible menu is loaded by the
 * browser (JS), so a crawler that does not run JS would not see it and could not reach the
 * categories from any page (BLD-239). Hidden from the screen and from assistive technology
 * (it only repeats the visible menu).
 */
export const CrawlerNav = async () => {
  const tree = await getCatalogTree(toLanguage(await getLocale())).catch(() => []);
  if (!tree.length) return null;

  return (
    <nav aria-hidden className='sr-only'>
      <ul>
        {tree.map((category) => (
          <li key={category.id}>
            <Link href={`/catalog/${category.slug}`} tabIndex={-1}>
              {category.name}
            </Link>
            <ul>
              {category.subs.map((sub) => (
                <li key={sub.id}>
                  <Link href={`/catalog/${category.slug}/${sub.slug}`} tabIndex={-1}>
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
