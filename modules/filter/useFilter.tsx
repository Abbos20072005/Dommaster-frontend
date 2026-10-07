'use client';

import { useSearchParams } from 'next/navigation';
import { parseAsInteger, useQueryStates } from 'nuqs';

import { usePathname, useRouter } from '@/i18n/navigation';

import { isAttributeParam } from './attributes';

export interface FilterDefaultValues {
  brand?: number | null;
  item_category?: number | null;
  page?: number;
  page_size?: number;
  price_from?: number;
  price_to?: number;
  sale_id?: number | null;
}

export const useFilter = (defaultValues?: FilterDefaultValues) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const values: Required<FilterDefaultValues> = {
    page: 1,
    page_size: 20,
    price_from: 0,
    price_to: 100000000,
    item_category: null,
    brand: null,
    sale_id: null,
    ...defaultValues
  };

  const [filter, setFilter] = useQueryStates(
    {
      page: parseAsInteger.withDefault(values.page).withOptions({ history: 'push' }),
      page_size: parseAsInteger.withDefault(values.page_size),
      price_from: parseAsInteger.withDefault(values.price_from),
      price_to: parseAsInteger.withDefault(values.price_to),
      item_category: parseAsInteger,
      brand: parseAsInteger,
      sale_id: parseAsInteger
    },
    { shallow: false }
  );

  const hasAttributes = [...searchParams.keys()].some(isAttributeParam);

  const isCleared =
    !hasAttributes &&
    Object.entries(filter).every(([key, value]) => value === values[key as keyof typeof filter]);

  const setFilterItem = <K extends keyof typeof filter>(key: K, value: (typeof filter)[K]) => {
    setFilter({ ...filter, [key]: value });
  };

  // Hamma filtr (narx, brend va atributlar) bitta URL almashtirishda tozalanadi
  const onReset = () => {
    const params = new URLSearchParams(searchParams.toString());
    [...params.keys()].filter(isAttributeParam).forEach((key) => params.delete(key));
    (Object.keys(filter) as (keyof typeof filter)[]).forEach((key) => params.delete(key));
    (['item_category', 'brand', 'sale_id'] as const).forEach((key) => {
      if (values[key] != null) params.set(key, String(values[key]));
    });

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
  };

  return {
    filter,
    setFilterItem,
    setFilter,
    isCleared,
    onReset
  };
};
