import type { MetadataRoute } from 'next';

import { getServices } from '@/utils/api/requests';
import { BASE_URL } from '@/utils/constants';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const res = await getServices();
  const services = res.data.result || [];

  return services.map((service) => ({
    url: `${BASE_URL}/services/${service.id}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.8,
    alternates: {
      languages: {
        en: `${BASE_URL}/en/services/${service.id}`,
        ru: `${BASE_URL}/ru/services/${service.id}`
      }
    }
  }));
}
