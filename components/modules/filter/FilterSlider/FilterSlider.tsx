'use client';

import { useTranslations } from 'next-intl';
import { parseAsArrayOf, parseAsInteger, useQueryState } from 'nuqs';
import React from 'react';

import { Label } from '@/components/ui/label';
import { useMounted } from '@/hooks';

import { CustomSlider, NumberInput } from './components';

interface Props {
  filter: Filter;
}

export const FilterSlider = ({ filter }: Props) => {
  const t = useTranslations();
  const [sliderRange, setSliderRange] = useQueryState(
    filter.request_var,
    parseAsArrayOf(parseAsInteger).withDefault([filter.min!, filter.max!])
  );
  const [minInput, setMinInput] = React.useState<string>(String(sliderRange[0]));
  const [maxInput, setMaxInput] = React.useState<string>(String(sliderRange[1]));
  const mounted = useMounted();

  React.useEffect(() => {
    console.log(sliderRange);
    setMinInput(String(sliderRange[0]));
    setMaxInput(String(sliderRange[1]));
  }, [...sliderRange]);

  if (!mounted) return null;

  return (
    <div className='space-y-3'>
      <h3 className='text-sm font-bold'>{filter.name}</h3>
      <div className='grid grid-cols-2 gap-3'>
        <div className='grid gap-1'>
          <Label className='text-muted-foreground font-normal' htmlFor='min'>
            {t('From')}
          </Label>
          <NumberInput
            id='min'
            inputValue={minInput}
            max={sliderRange[1]}
            min={filter.min ?? undefined}
            setInputValue={setMinInput}
            value={sliderRange[0]}
            onValueChange={(value) => setSliderRange([value, sliderRange[1]])}
          />
        </div>
        <div className='grid gap-1'>
          <Label className='text-muted-foreground font-normal' htmlFor='max'>
            {t('To')}
          </Label>
          <NumberInput
            id='max'
            inputValue={maxInput}
            max={filter.max ?? undefined}
            min={sliderRange[0]}
            setInputValue={setMaxInput}
            value={sliderRange[1]}
            onValueChange={(value) => setSliderRange([sliderRange[0], value])}
          />
        </div>
      </div>
      <CustomSlider
        setInputValue={(value) => {
          setMinInput(String(value[0]));
          setMaxInput(String(value[1]));
        }}
        inputValue={[+minInput, +maxInput]}
        max={filter.max ?? undefined}
        min={filter.min ?? undefined}
        onValueChange={setSliderRange}
      />
    </div>
  );
};
