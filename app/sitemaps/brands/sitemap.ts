import type { MetadataRoute } from 'next';

import { BASE_URL } from '@/utils/constants';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const res = await fetch(`${process.env.API_URL}brands/`);
  const data = (await res.json()) as BrandsResponse;

  return (data.result ?? []).map((brand) => ({ url: `${BASE_URL}/brand/${brand.id}` }));
}
