import React from 'react';

import { FilterCheckbox, FilterRadio, FilterSlider } from '@/components/modules/filter';
import { filters } from '@/fake-data/filters';
import { cn } from '@/lib/utils';

const filterMap: Record<FilterType, React.ComponentType<{ filter: Filter }>> = {
  CHECKBOX: FilterCheckbox,
  RADIO: FilterRadio,
  SLIDER: FilterSlider
};

interface Props extends React.ComponentProps<'div'> {}

export const Filter = ({ className, ...props }: Props) => {
  return (
    <div className={cn('space-y-7', className)} {...props} aria-label='Filter' data-slot='filter'>
      {filters.map((filter) => {
        const FilterComponent = filterMap[filter.type];
        return <FilterComponent key={filter.name} filter={filter} />;
      })}
    </div>
  );
};
