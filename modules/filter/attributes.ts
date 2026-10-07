'use client';

import { useSearchParams } from 'next/navigation';
import React from 'react';

// URL parametrlari: checkbox — `f_<kalit>=a;b`, oraliq — `rf_<kalit>=min`, `rt_<kalit>=max`
export const ATTRIBUTE_CHECKBOX_PREFIX = 'f_';
export const ATTRIBUTE_FROM_PREFIX = 'rf_';
export const ATTRIBUTE_TO_PREFIX = 'rt_';
export const ATTRIBUTE_VALUE_SEPARATOR = ';';

export const isAttributeParam = (name: string) =>
  name.startsWith(ATTRIBUTE_CHECKBOX_PREFIX) ||
  name.startsWith(ATTRIBUTE_FROM_PREFIX) ||
  name.startsWith(ATTRIBUTE_TO_PREFIX);

/** URL'dagi atribut filtrlarini `product/filter` so'rovining `filters` maydoniga o'giradi */
export const useAttributeFilters = () => {
  const searchParams = useSearchParams();

  return React.useMemo(() => {
    const filters: Record<string, string[] | number> = {};

    searchParams.forEach((value, name) => {
      if (name.startsWith(ATTRIBUTE_CHECKBOX_PREFIX)) {
        const values = value.split(ATTRIBUTE_VALUE_SEPARATOR).filter(Boolean);
        if (values.length) filters[name.slice(ATTRIBUTE_CHECKBOX_PREFIX.length)] = values;
        return;
      }

      const isFrom = name.startsWith(ATTRIBUTE_FROM_PREFIX);
      if (isFrom || name.startsWith(ATTRIBUTE_TO_PREFIX)) {
        const number = Number(value.replace(',', '.'));
        if (!Number.isFinite(number) || value.trim() === '') return;
        filters[
          `${name.slice(isFrom ? ATTRIBUTE_FROM_PREFIX.length : ATTRIBUTE_TO_PREFIX.length)}_${isFrom ? 'from' : 'to'}`
        ] = number;
      }
    });

    const isActive = Object.keys(filters).length > 0;

    return { filters: isActive ? filters : undefined, isActive };
  }, [searchParams]);
};
