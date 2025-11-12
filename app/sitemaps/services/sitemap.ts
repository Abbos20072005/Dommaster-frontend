import type { MetadataRoute } from 'next';

import { BASE_URL } from '@/utils/constants';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const res = await fetch(`${process.env.API_URL}services/`);
  const data = (await res.json()) as ServicesResponse;
  const services = data.result || [];

  return services.map((service) => ({
    url: `${BASE_URL}/services/${service.id}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.8,
    alternates: {
      languages: {
        uz: `${BASE_URL}/uz/services/${service.id}`,
        en: `${BASE_URL}/en/services/${service.id}`,
        ru: `${BASE_URL}/ru/services/${service.id}`
      }
    }
  }));
}
