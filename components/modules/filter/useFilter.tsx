import { parseAsInteger, useQueryStates } from 'nuqs';

const defaultValues = {
  page: 1,
  page_size: 20,
  price_from: 0,
  price_to: 1000000,
  item_category: null,
  brand: null
};

export const useFilter = () => {
  const [filter, setFilter] = useQueryStates({
    page: parseAsInteger.withDefault(defaultValues.page).withOptions({ history: 'push' }),
    page_size: parseAsInteger.withDefault(defaultValues.page_size),
    price_from: parseAsInteger.withDefault(defaultValues.price_from),
    price_to: parseAsInteger.withDefault(defaultValues.price_to),
    item_category: parseAsInteger,
    brand: parseAsInteger
  });

  const isCleared = Object.entries(filter).every(
    ([key, value]) => value === defaultValues[key as keyof typeof filter]
  );

  const setFilterItem = <K extends keyof typeof filter>(key: K, value: (typeof filter)[K]) => {
    setFilter({ ...filter, [key]: value });
  };

  return {
    filter,
    setFilterItem,
    setFilter,
    isCleared
  };
};
