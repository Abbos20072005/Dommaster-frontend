'use client';

import React from 'react';

import { useMounted } from '@/hooks';
import { cn } from '@/lib/utils';
import {
  FilterCategories,
  FilterCheckbox,
  FilterRadio,
  FilterSkeleton,
  FilterSlider
} from '@/modules/filter';

import { FilterClearButton } from './components/FilterClearButton';

interface Props extends React.ComponentProps<'div'> {
  filters: Filter[];
  hideCategories?: boolean;
}

export const Filter = ({ className, filters, hideCategories, ...props }: Props) => {
  const mounted = useMounted();

  if (!mounted) return <FilterSkeleton />;

  return (
    <div className={cn(className)} {...props} aria-label='Filter' data-slot='filter'>
      <FilterClearButton />
      <div className='space-y-7'>
        {!hideCategories && <FilterCategories />}
        {filters.map((filter) => (
          <React.Fragment key={filter.name}>
            {filter.type === 'CHECKBOX' && <FilterCheckbox filter={filter} />}
            {filter.type === 'RADIO' && <FilterRadio filter={filter} />}
            {filter.type === 'SLIDER' && <FilterSlider filter={filter} />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
