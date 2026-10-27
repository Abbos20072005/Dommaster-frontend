/**
 * The catalog (categories, sub-categories, item categories) and the brands with their slugs,
 * for turning an address into ids and the other way round (BLD-243). It is plain `fetch` with a
 * memory cache, so it works in the proxy (middleware), in the pages and in the sitemaps.
 * The slugs are written in the language of the request (`krepezh` in ru, `mahkamlagichlar` in uz).
 */

export type Slugged = { id: number; slug: string; name: string };
export type TreeSub = Slugged & { items: Slugged[] };
export type TreeCategory = Slugged & { subs: TreeSub[] };

/** the languages that have their own slugs; any other locale uses the Russian ones */
const LANGUAGES = ['ru', 'uz'] as const;
type Language = (typeof LANGUAGES)[number];

export const toLanguage = (locale?: string | null): Language => (locale === 'uz' ? 'uz' : 'ru');

const TTL = 60 * 60 * 1000;
const cache = new Map<string, { at: number; value: Promise<unknown> }>();

/** One request per hour for each key; a failed request is not kept. */
const cached = <T>(key: string, load: () => Promise<T>): Promise<T> => {
  const hit = cache.get(key);
  if (hit && Date.now() - hit.at < TTL) return hit.value as Promise<T>;
  const value = load().catch((error) => {
    cache.delete(key);
    throw error;
  });
  cache.set(key, { at: Date.now(), value });
  return value;
};

export const fetchApi = async <T>(path: string, language: Language): Promise<T | undefined> => {
  try {
    const res = await fetch(`${process.env.API_URL}${path}`, {
      headers: { 'Accept-Language': language }
    });
    return res.ok ? ((await res.json()) as T) : undefined;
  } catch {
    return undefined;
  }
};

const named = (item: { id: number; slug?: string | null; name?: string | null }): Slugged | null =>
  item.slug ? { id: item.id, slug: item.slug, name: item.name ?? '' } : null;

export const getCatalogTree = (language: Language): Promise<TreeCategory[]> =>
  cached(`tree:${language}`, async () => {
    const list = await fetchApi<{ result?: Category[] }>('categories/?is_main=true', language);
    if (!list?.result) throw new Error('categories are not available');

    const details = await Promise.all(
      list.result.map((category) =>
        fetchApi<{ result?: Category }>(`categories/${category.id}`, language)
      )
    );

    const tree: TreeCategory[] = [];
    list.result.forEach((category, index) => {
      const node = named(category);
      if (!node) return;
      const subs: TreeSub[] = [];
      for (const sub of details[index]?.result?.sub_categories ?? []) {
        const subNode = named(sub);
        if (!subNode) continue;
        subs.push({
          ...subNode,
          items: (sub.product_item_categories ?? []).flatMap((item) => named(item) ?? [])
        });
      }
      tree.push({ ...node, subs });
    });
    return tree;
  });

export const getBrandList = (language: Language): Promise<Slugged[]> =>
  cached(`brands:${language}`, async () => {
    const data = await fetchApi<{ result?: Brand[] }>('brands/', language);
    if (!data?.result) throw new Error('brands are not available');
    return data.result.flatMap((brand) => named(brand) ?? []);
  });

export interface CatalogMatch {
  /** ids from the top: [category], [category, sub] or [category, sub, item] */
  ids: number[];
  /** the address in the language of the request */
  path: string;
}

const pathOf = (levels: Slugged[]) => `/catalog/${levels.map((level) => level.slug).join('/')}`;

/** `/catalog/{a}/{b}/{c}`: the slugs of any of the languages lead to the same category. */
export const matchCatalogSlugs = async (
  slugs: string[],
  language: Language
): Promise<CatalogMatch | null> => {
  if (!slugs.length || slugs.length > 3) return null;

  for (const candidate of [language, ...LANGUAGES.filter((item) => item !== language)]) {
    const tree = await getCatalogTree(candidate).catch(() => []);
    const category = tree.find((node) => node.slug === slugs[0]);
    const sub = slugs[1] ? category?.subs.find((node) => node.slug === slugs[1]) : undefined;
    const item = slugs[2] ? sub?.items.find((node) => node.slug === slugs[2]) : undefined;
    const levels = [category, sub, item].slice(0, slugs.length);
    if (levels.some((level) => !level)) continue;

    const ids = (levels as Slugged[]).map((level) => level.id);
    return { ids, path: (await catalogPathByIds(ids, language)) ?? pathOf(levels as Slugged[]) };
  }
  return null;
};

/** The new address of a category given by the old ids (`/category/{id}/{subId}/{itemId}`). */
export const catalogPathByIds = async (
  ids: number[],
  language: Language
): Promise<string | null> => {
  const tree = await getCatalogTree(language).catch(() => []);
  const category = tree.find((node) => node.id === ids[0]);
  const sub = ids[1] ? category?.subs.find((node) => node.id === ids[1]) : undefined;
  const item = ids[2] ? sub?.items.find((node) => node.id === ids[2]) : undefined;
  const levels = [category, sub, item].slice(0, ids.length);
  return levels.length && levels.every(Boolean) ? pathOf(levels as Slugged[]) : null;
};

/** `/brand/{slug}`: the slug of any language leads to the brand; `slug` is the one of the language. */
export const matchBrandSlug = async (
  slug: string,
  language: Language
): Promise<{ id: number; slug: string } | null> => {
  for (const candidate of [language, ...LANGUAGES.filter((item) => item !== language)]) {
    const found = (await getBrandList(candidate).catch(() => [])).find((brand) => brand.slug === slug);
    if (!found) continue;
    const own = (await getBrandList(language).catch(() => [])).find((brand) => brand.id === found.id);
    return { id: found.id, slug: own?.slug ?? found.slug };
  }
  return null;
};

export const brandSlugById = async (id: number, language: Language) =>
  (await getBrandList(language).catch(() => [])).find((brand) => brand.id === id)?.slug ?? null;

/** the address of a product from its id (the answer of the product detail holds the slug) */
export const productSlugById = async (id: number, language: Language) => {
  const data = await fetchApi<{ result?: Product }>(`products/${id}/`, language);
  return data?.result?.slug ?? null;
};
