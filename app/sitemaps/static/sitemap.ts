import type { MetadataRoute } from 'next';

import { BASE_URL } from '@/utils/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      priority: 1,
      alternates: {
        languages: {
          uz: `${BASE_URL}/uz`,
          en: `${BASE_URL}/en`,
          ru: `${BASE_URL}/ru`
        }
      },
      lastModified: new Date(),
      changeFrequency: 'daily'
    },
    {
      url: `${BASE_URL}/about`,
      priority: 0.8,
      alternates: {
        languages: {
          uz: `${BASE_URL}/uz/about`,
          en: `${BASE_URL}/en/about`,
          ru: `${BASE_URL}/ru/about`
        }
      },
      lastModified: new Date(),
      changeFrequency: 'daily'
    },
    {
      url: `${BASE_URL}/courier-delivery`,
      priority: 0.8,
      alternates: {
        languages: {
          uz: `${BASE_URL}/uz/courier-delivery`,
          en: `${BASE_URL}/en/courier-delivery`,
          ru: `${BASE_URL}/ru/courier-delivery`
        }
      },
      lastModified: new Date(),
      changeFrequency: 'daily'
    },
    {
      url: `${BASE_URL}/payment-methods`,
      priority: 0.8,
      alternates: {
        languages: {
          uz: `${BASE_URL}/uz/payment-methods`,
          en: `${BASE_URL}/en/payment-methods`,
          ru: `${BASE_URL}/ru/payment-methods`
        }
      },
      lastModified: new Date(),
      changeFrequency: 'weekly'
    },
    {
      url: `${BASE_URL}/requisites`,
      priority: 0.8,
      alternates: {
        languages: {
          uz: `${BASE_URL}/uz/requisites`,
          en: `${BASE_URL}/en/requisites`,
          ru: `${BASE_URL}/ru/requisites`
        }
      },
      lastModified: new Date(),
      changeFrequency: 'weekly'
    },
    {
      url: `${BASE_URL}/services`,
      priority: 0.7,
      alternates: {
        languages: {
          uz: `${BASE_URL}/uz/services`,
          en: `${BASE_URL}/en/services`,
          ru: `${BASE_URL}/ru/services`
        }
      },
      lastModified: new Date(),
      changeFrequency: 'weekly'
    }
  ];
}
