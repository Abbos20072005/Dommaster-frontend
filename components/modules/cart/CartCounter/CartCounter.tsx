import { InfoIcon, MinusIcon, PlusIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { Button } from '@/components/ui/button';

interface Props {
  maxValue: number;
  value: number;
  onChange: (value: number) => void;
}

export const CartCounter = ({ value, onChange, maxValue }: Props) => {
  const t = useTranslations();
  const [inputValue, setInputValue] = React.useState<string>(String(value));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (/^\d*$/.test(newValue)) {
      setInputValue(newValue);
    }
  };

  const handleBlur = () => {
    if (inputValue === '') {
      setInputValue(String(value));
    } else if (inputValue === '0') {
      setInputValue('1');
      onChange(1);
    } else {
      onChange(Number(inputValue));
    }
  };

  const handleFocus = () => {
    setInputValue('');
  };

  const onDecrement = () => {
    if (value > 1) {
      setInputValue(String(value - 1));
      onChange(value - 1);
    }
  };

  const onIncrement = () => {
    setInputValue(String(value + 1));
    onChange(value + 1);
  };

  return (
    <div className='relative flex items-center'>
      <Button size='iconSm' variant='ghost' onClick={onDecrement}>
        <MinusIcon />
      </Button>
      <input
        className='h-full min-w-0 flex-1 text-center outline-none'
        value={inputValue}
        autoComplete='off'
        inputMode='numeric'
        onBlur={handleBlur}
        onChange={handleChange}
        onFocus={handleFocus}
      />
      {Number(inputValue) > maxValue && (
        <div className='text-destructive absolute top-full right-1 z-[2] flex items-center gap-1 text-xs'>
          <InfoIcon className='size-3' />
          {t('Only {maxValue} left', { maxValue })}
        </div>
      )}
      <Button size='iconSm' variant='ghost' onClick={onIncrement}>
        <PlusIcon />
      </Button>
    </div>
  );
};
