'use client';

import React from 'react';

import type { FilterDefaultValues } from '@/modules/filter/useFilter';

import { useMounted } from '@/hooks';
import { cn } from '@/lib/utils';
import { FilterAttributes } from '../FilterAttributes/FilterAttributes';
import { FilterCategories } from '../FilterCategories';
import { FilterCheckbox } from '../FilterCheckbox/FilterCheckbox';
import { FilterRadio } from '../FilterRadio/FilterRadio';
import { FilterSkeleton } from '../FilterSkeleton';
import { FilterSlider } from '../FilterSlider/FilterSlider';
import { FilterClearButton } from './components/FilterClearButton';

interface Props extends React.ComponentProps<'div'> {
  attributeFilters?: AttributeFilter[];
  defaultValues?: FilterDefaultValues;
  filters: Filter[];
  hideCategories?: boolean;
}

export const Filter = ({
  className,
  attributeFilters,
  filters,
  hideCategories,
  defaultValues,
  ...props
}: Props) => {
  const mounted = useMounted();

  if (!mounted) return <FilterSkeleton />;

  return (
    <div className={cn(className)} {...props} aria-label='Filter' data-slot='filter'>
      <FilterClearButton defaultValues={defaultValues} />
      <div className='space-y-7'>
        {!hideCategories && <FilterCategories />}
        {filters.map((filter) => (
          <React.Fragment key={filter.name}>
            {filter.type === 'CHECKBOX' && <FilterCheckbox filter={filter} />}
            {filter.type === 'RADIO' && <FilterRadio filter={filter} />}
            {filter.type === 'SLIDER' && <FilterSlider filter={filter} />}
          </React.Fragment>
        ))}
        {!!attributeFilters?.length && <FilterAttributes filters={attributeFilters} />}
      </div>
    </div>
  );
};
