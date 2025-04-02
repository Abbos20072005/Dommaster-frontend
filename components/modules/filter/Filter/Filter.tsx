'use client';

import React from 'react';

import { FilterCheckbox, FilterRadio, FilterSlider } from '@/components/modules/filter';
import { filters } from '@/fake-data/filters';
import { cn } from '@/lib/utils';

import { FilterClearButton } from './components/FilterClearButton';

const filterMap: Record<FilterType, React.ComponentType<{ filter: Filter }>> = {
  CHECKBOX: FilterCheckbox,
  RADIO: FilterRadio,
  SLIDER: FilterSlider
};

interface Props extends React.ComponentProps<'div'> {}

export const Filter = ({ className, ...props }: Props) => {
  return (
    <div className={cn(className)} {...props} aria-label='Filter' data-slot='filter'>
      <FilterClearButton />
      <div className='space-y-7'>
        {filters.map((filter) => {
          const FilterComponent = filterMap[filter.type];
          return <FilterComponent key={filter.name} filter={filter} />;
        })}
      </div>
    </div>
  );
};
