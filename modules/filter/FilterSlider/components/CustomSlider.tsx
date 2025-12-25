import React from 'react';

import { Slider } from '@/components/ui/slider';

interface Props {
  inputValue: number[];
  max?: number;
  min?: number;
  onValueChange: (value: number[]) => void;
  setInputValue: (value: number[]) => void;
}

export const CustomSlider = ({ max, min, onValueChange, inputValue, setInputValue }: Props) => {
  return (
    <Slider
      className='py-1.5'
      max={max}
      min={min}
      value={inputValue}
      onValueChange={setInputValue}
      onValueCommit={onValueChange}
    />
  );
};
