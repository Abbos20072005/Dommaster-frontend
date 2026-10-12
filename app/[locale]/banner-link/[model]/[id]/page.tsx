import { notFound } from 'next/navigation';

import type { Locale } from '@/i18n/routing';

import { redirect } from '@/i18n/navigation';
import { getItemCategoryById, getSubCategoryById } from '@/utils/api/requests';

interface Props {
  params: Promise<{ id: string; locale: Locale; model: string }>;
}

/**
 * A banner points at a sub-category or an item category by its id only. The site address of
 * such a category has its parents in it (`/category/{id}/{subId}/{itemId}`), so the parents are
 * looked up here and the visitor is sent to the full address.
 */
const BannerLinkPage = async ({ params }: Props) => {
  const { id, locale, model } = await params;

  if (model === 'productsubcategory') {
    const response = await getSubCategoryById({ id });
    const parentId = response.data.result?.breadcrumbs?.[0]?.id;
    redirect({ href: parentId ? `/category/${parentId}/${id}` : '/catalog', locale });
  }

  if (model === 'productitemcategory') {
    const response = await getItemCategoryById({ id });
    const [category, subCategory] = response.data.result?.breadcrumbs ?? [];
    redirect({
      href: category && subCategory ? `/category/${category.id}/${subCategory.id}/${id}` : '/catalog',
      locale
    });
  }

  return notFound();
};

export default BannerLinkPage;
