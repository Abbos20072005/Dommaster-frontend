import type { MetadataRoute } from 'next';

import { BASE_URL } from '@/utils/constants';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Google's limit is 50,000 URLs per sitemap
  const res = await fetch(`${process.env.API_URL}categories/`)
  const data = await res.json() as CategoriesResponse;
  const categories = data.result || [];

  return [
    ...categories.map((category) => ({
      url: `${BASE_URL}/category/${category.id}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.7,
      alternates: {
        languages: {
          en: `${BASE_URL}/en/category/${category.id}`,
          ru: `${BASE_URL}/ru/category/${category.id}`
        }
      }
    })),
    ...categories.flatMap((category) =>
      category.sub_categories.map((subCategory) => ({
        url: `${BASE_URL}/category/${category.id}/${subCategory.id}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.7,
        alternates: {
          languages: {
            en: `${BASE_URL}/en/category/${category.id}/${subCategory.id}`,
            ru: `${BASE_URL}/ru/category/${category.id}/${subCategory.id}`
          }
        }
      }))
    ),
    ...categories.flatMap((category) =>
      category.sub_categories.flatMap((subCategory) =>
        subCategory.product_item_categories.map((itemCategory) => ({
          url: `${BASE_URL}/category/${category.id}/${subCategory.id}/${itemCategory.id}`,
          lastModified: new Date(),
          changeFrequency: 'daily' as const,
          priority: 0.7,
          alternates: {
            languages: {
              en: `${BASE_URL}/en/category/${category.id}/${subCategory.id}/${itemCategory.id}`,
              ru: `${BASE_URL}/ru/category/${category.id}/${subCategory.id}/${itemCategory.id}`
            }
          }
        }))
      )
    )
  ];
}
