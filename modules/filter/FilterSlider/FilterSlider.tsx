'use client';

import { useTranslations } from 'next-intl';
import { parseAsInteger, useQueryStates } from 'nuqs';
import React from 'react';

import { Label } from '@/components/ui/label';

import { CustomSlider, NumberInput } from './components';

interface Props {
  filter: Filter;
}

export const FilterSlider = ({ filter }: Props) => {
  const t = useTranslations();
  const [sliderRange, setSliderRange] = useQueryStates({
    [`${filter.request_var}_from`]: parseAsInteger.withDefault(filter.from!),
    [`${filter.request_var}_to`]: parseAsInteger.withDefault(filter.to!)
  });
  const min = sliderRange[`${filter.request_var}_from`];
  const max = sliderRange[`${filter.request_var}_to`];

  const [minInput, setMinInput] = React.useState<string>(String(min));
  const [maxInput, setMaxInput] = React.useState<string>(String(max));

  React.useEffect(() => {
    setMinInput(String(min));
    setMaxInput(String(max));
  }, [min, max]);

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
            max={max}
            min={filter.from ?? undefined}
            setInputValue={setMinInput}
            value={min}
            onValueChange={(min) =>
              setSliderRange({
                [`${filter.request_var}_from`]: min,
                [`${filter.request_var}_to`]: max
              })
            }
          />
        </div>
        <div className='grid gap-1'>
          <Label className='text-muted-foreground font-normal' htmlFor='max'>
            {t('To')}
          </Label>
          <NumberInput
            id='max'
            inputValue={maxInput}
            max={filter.to ?? undefined}
            min={min}
            setInputValue={setMaxInput}
            value={max}
            onValueChange={(max) =>
              setSliderRange({
                [`${filter.request_var}_from`]: min,
                [`${filter.request_var}_to`]: max
              })
            }
          />
        </div>
      </div>
      <CustomSlider
        setInputValue={(value) => {
          setMinInput(String(value[0]));
          setMaxInput(String(value[1]));
        }}
        inputValue={[+minInput, +maxInput]}
        max={filter.to ?? undefined}
        min={filter.from ?? undefined}
        onValueChange={([min, max]) =>
          setSliderRange({
            [`${filter.request_var}_from`]: min,
            [`${filter.request_var}_to`]: max
          })
        }
      />
    </div>
  );
};
