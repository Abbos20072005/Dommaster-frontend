import { MinusIcon, PlusIcon } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';

interface Props {
  maxValue: number;
  minValue?: number;
  value: number;
  onChange: (value: number) => void;
}

export const CartCounter = ({ value, onChange, minValue = 1, maxValue }: Props) => {
  const onValueChange = (value: number) => {
    if (value < minValue || value > maxValue) return;
    onChange(value);
  };

  return (
    <div className='flex items-center'>
      <Button size='iconSm' variant='ghost' onClick={() => onValueChange(value - 1)}>
        <MinusIcon />
      </Button>
      <input
        className='h-full min-w-0 flex-1 text-center outline-none'
        min={String(minValue)}
        value={String(value ?? '')}
        onChange={(e) => onValueChange(Number(e.target.value))}
        onFocus={(e) => e.target.select()}
      />
      <Button size='iconSm' variant='ghost' onClick={() => onValueChange(value + 1)}>
        <PlusIcon />
      </Button>
    </div>
  );
};
