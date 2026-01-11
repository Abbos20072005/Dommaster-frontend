'use client';

import { parseAsInteger, useQueryStates } from 'nuqs';

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

  const isCleared = Object.entries(filter).every(
    ([key, value]) => value === values[key as keyof typeof filter]
  );

  const setFilterItem = <K extends keyof typeof filter>(key: K, value: (typeof filter)[K]) => {
    setFilter({ ...filter, [key]: value });
  };

  const onReset = () => {
    setFilter(values);
  };

  return {
    filter,
    setFilterItem,
    setFilter,
    isCleared,
    onReset
  };
};
