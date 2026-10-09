'use client';

import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { parseAsArrayOf, parseAsFloat, parseAsInteger, parseAsString, useQueryStates } from 'nuqs';
import React from 'react';

import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import {
  ATTRIBUTE_CHECKBOX_PREFIX,
  ATTRIBUTE_FROM_PREFIX,
  ATTRIBUTE_TO_PREFIX,
  ATTRIBUTE_VALUE_SEPARATOR
} from '../attributes';

const COUNT_MAX = 6;

// Narx alohida slider bilan ishlaydi; qiymati yo'q filtr ko'rsatilmaydi
const isVisible = (filter: AttributeFilter) => {
  if (filter.key === 'price') return false;
  if (filter.type === 'checkbox') return (filter.values?.length ?? 0) > 1;
  if (filter.type === 'range') {
    return filter.min != null && filter.max != null && filter.min !== filter.max;
  }
  return false;
};

const AttributeCheckbox = ({ filter }: { filter: AttributeFilter }) => {
  const t = useTranslations();
  const param = `${ATTRIBUTE_CHECKBOX_PREFIX}${filter.key}`;
  const [state, setState] = useQueryStates(
    {
      [param]: parseAsArrayOf(parseAsString, ATTRIBUTE_VALUE_SEPARATOR).withDefault([]),
      page: parseAsInteger
    },
    { shallow: false, history: 'replace' }
  );
  const [showAll, setShowAll] = React.useState(false);

  const selected = (state[param] as string[] | undefined) ?? [];
  const values = filter.values ?? [];
  const visible = showAll ? values : values.slice(0, COUNT_MAX);

  const onToggle = (value: string, checked: boolean) => {
    const next = checked ? [...selected, value] : selected.filter((item) => item !== value);
    setState({ [param]: next.length ? next : null, page: null });
  };

  return (
    <div className='space-y-3'>
      <h3 className='text-sm font-bold'>
        {filter.label}
        {filter.unit && <span className='text-muted-foreground font-normal'>, {filter.unit}</span>}
      </h3>
      <div className='space-y-3'>
        {visible.map((item) => {
          const id = `${param}-${item.value}`;

          return (
            <div key={item.value} className='flex items-center gap-2'>
              <Checkbox
                checked={selected.includes(item.value)}
                id={id}
                onCheckedChange={(checked) => onToggle(item.value, checked === true)}
              />
              <Label className='text-sm font-normal' htmlFor={id}>
                {item.value}
                <span className='text-muted-foreground ml-1'>({item.count})</span>
              </Label>
            </div>
          );
        })}
      </div>
      {values.length > COUNT_MAX && (
        <button
          className='text-secondary flex items-center gap-1 text-sm hover:underline'
          type='button'
          onClick={() => setShowAll((prev) => !prev)}
        >
          {showAll ? (
            <>
              {t('Show less')} <ChevronUpIcon className='size-3' />
            </>
          ) : (
            <>
              {t('{count} more', { count: values.length - COUNT_MAX })}
              <ChevronDownIcon className='size-3' />
            </>
          )}
        </button>
      )}
    </div>
  );
};

const AttributeRange = ({ filter }: { filter: AttributeFilter }) => {
  const t = useTranslations();
  const fromParam = `${ATTRIBUTE_FROM_PREFIX}${filter.key}`;
  const toParam = `${ATTRIBUTE_TO_PREFIX}${filter.key}`;
  const [state, setState] = useQueryStates(
    { [fromParam]: parseAsFloat, [toParam]: parseAsFloat, page: parseAsInteger },
    { shallow: false, history: 'replace' }
  );

  const from = state[fromParam] as number | null;
  const to = state[toParam] as number | null;
  const [fromInput, setFromInput] = React.useState(from == null ? '' : String(from));
  const [toInput, setToInput] = React.useState(to == null ? '' : String(to));

  // URL tashqaridan o'zgarsa (tozalash tugmasi, orqaga) inputlar ham yangilanadi
  React.useEffect(() => {
    setFromInput(from == null ? '' : String(from));
    setToInput(to == null ? '' : String(to));
  }, [from, to]);

  const commit = (param: string, input: string) => {
    const number = Number(input.replace(',', '.'));
    const value = input.trim() === '' || !Number.isFinite(number) ? null : number;
    setState({ [param]: value, page: null });
  };

  return (
    <div className='space-y-3'>
      <h3 className='text-sm font-bold'>
        {filter.label}
        {filter.unit && <span className='text-muted-foreground font-normal'>, {filter.unit}</span>}
      </h3>
      <div className='grid grid-cols-2 gap-3'>
        <div className='grid gap-1'>
          <Label className='text-muted-foreground font-normal' htmlFor={fromParam}>
            {t('From')}
          </Label>
          <Input
            id={fromParam}
            inputMode='decimal'
            placeholder={String(filter.min)}
            value={fromInput}
            onBlur={() => commit(fromParam, fromInput)}
            onChange={(e) => setFromInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && commit(fromParam, fromInput)}
          />
        </div>
        <div className='grid gap-1'>
          <Label className='text-muted-foreground font-normal' htmlFor={toParam}>
            {t('To')}
          </Label>
          <Input
            id={toParam}
            inputMode='decimal'
            placeholder={String(filter.max)}
            value={toInput}
            onBlur={() => commit(toParam, toInput)}
            onChange={(e) => setToInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && commit(toParam, toInput)}
          />
        </div>
      </div>
    </div>
  );
};

interface Props {
  filters: AttributeFilter[];
}

export const FilterAttributes = ({ filters }: Props) => (
  <>
    {filters
      .filter(isVisible)
      .map((filter) =>
        filter.type === 'checkbox' ? (
          <AttributeCheckbox key={filter.key} filter={filter} />
        ) : (
          <AttributeRange key={filter.key} filter={filter} />
        )
      )}
  </>
);
