import type { MetadataRoute } from 'next';

import { BASE_URL } from '@/utils/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      priority: 1,
      lastModified: new Date(),
      changeFrequency: 'daily'
    },
    {
      url: `${BASE_URL}/about`,
      priority: 0.8,
      lastModified: new Date(),
      changeFrequency: 'daily'
    },
    {
      url: `${BASE_URL}/courier-delivery`,
      priority: 0.8,
      lastModified: new Date(),
      changeFrequency: 'daily'
    },
    {
      url: `${BASE_URL}/payment-methods`,
      priority: 0.8,
      lastModified: new Date(),
      changeFrequency: 'weekly'
    },
    {
      url: `${BASE_URL}/requisites`,
      priority: 0.8,
      lastModified: new Date(),
      changeFrequency: 'weekly'
    },
    {
      url: `${BASE_URL}/services`,
      priority: 0.7,
      lastModified: new Date(),
      changeFrequency: 'weekly'
    }
  ];
}
