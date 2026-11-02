import type { MetadataRoute } from 'next';

import { languagePair, lastModified } from '@/lib/sitemap';
import { brandHref } from '@/lib/urls';

export const revalidate = 3600;

const fetchBrands = async (language: 'ru' | 'uz') => {
  const res = await fetch(`${process.env.API_URL}brands/`, {
    headers: { 'Accept-Language': language }
  });
  return ((await res.json()) as BrandsResponse).result ?? [];
};

/** Every brand at its Russian and Uzbek address (the slugs differ by language; the id pairs them). */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [ru, uz] = await Promise.all([fetchBrands('ru'), fetchBrands('uz')]);
  const uzById = new Map(uz.map((brand) => [brand.id, brand]));

  return ru.flatMap((brand) => {
    const other = uzById.get(brand.id);
    return languagePair(
      { ru: brandHref(brand), uz: other ? brandHref(other) : null },
      { lastModified: lastModified((brand as { updated_at?: string }).updated_at) }
    );
  });
}
