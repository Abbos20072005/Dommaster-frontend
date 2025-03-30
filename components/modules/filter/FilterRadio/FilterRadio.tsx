'use client';

import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { parseAsString, useQueryState } from 'nuqs';
import React from 'react';

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useMounted } from '@/hooks';

interface Props {
  filter: Filter;
}

export const FilterRadio = ({ filter }: Props) => {
  const t = useTranslations();
  const [selectedItem, setSelectedItem] = useQueryState(
    filter.request_var,
    parseAsString.withDefault('')
  );
  const [showAll, setShowAll] = React.useState(false);
  const mounted = useMounted();

  if (!mounted) return null;

  const COUNT_MAX = 5;

  return (
    <div className='space-y-3'>
      <h3 className='text-sm font-bold'>{filter.name}</h3>
      <div className='space-y-3'>
        <RadioGroup value={selectedItem} onValueChange={(value) => setSelectedItem(value)}>
          {filter.filter_items
            .slice(0, showAll ? filter.filter_items.length : COUNT_MAX)
            .map((item) => (
              <div key={item.value_string} className='flex items-center space-x-2'>
                <RadioGroupItem
                  id={`${item.label}-${item.value_string}`}
                  value={item.value_string}
                />
                <Label
                  className='text-sm font-normal'
                  htmlFor={`${item.label}-${item.value_string}`}
                >
                  {item.label}
                  <span className='text-muted-foreground ml-1'>({item.count})</span>
                </Label>
              </div>
            ))}
        </RadioGroup>
      </div>
      {filter.filter_items.length > COUNT_MAX && (
        <button
          className='text-secondary text-sm hover:underline'
          type='button'
          onClick={() => setShowAll((prev) => !prev)}
        >
          {showAll ? (
            <span className='flex items-center gap-1'>
              {t('Show less')} <ChevronUpIcon className='size-3' />
            </span>
          ) : (
            <span className='flex items-center gap-1'>
              {t('{count} more', { count: filter.filter_items.length - COUNT_MAX })}
              <ChevronDownIcon className='size-3' />
            </span>
          )}
        </button>
      )}
    </div>
  );
};
