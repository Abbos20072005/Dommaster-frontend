import { InfoIcon, MinusIcon, PlusIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { Button } from '@/components/ui/button';
import { useDebouncedValue } from '@/hooks';
import { cn } from '@/lib/utils';

interface Props extends Omit<React.ComponentProps<'div'>, 'onChange'> {
  maxValue: number;
  minValue?: number;
  value: number;
  onChange: (value: number) => void;
}

export const CartCounter = ({
  value,
  onChange,
  maxValue,
  minValue = 0,
  className,
  ...props
}: Props) => {
  const t = useTranslations();
  const [inputValue, setInputValue] = React.useState<string>(value.toString());
  const [buttonValue, setButtonValue] = React.useState<number>(value);

  const debouncedButtonValue = useDebouncedValue(buttonValue, 500);

  // Update from button click (debounced)
  React.useEffect(() => {
    if (!Number.isNaN(debouncedButtonValue)) {
      if (Number(inputValue) !== value) onChange(debouncedButtonValue);
    }
  }, [debouncedButtonValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (/^\d*$/.test(newValue)) {
      setInputValue(newValue);
    }
  };

  const onBlur = () => {
    const parsed = Number.parseInt(inputValue);
    if (Number.isNaN(parsed)) {
      setInputValue(value.toString()); // Revert to current value
    } else {
      const clamped = Math.max(minValue, Math.min(parsed, maxValue));
      setInputValue(clamped.toString());
      if (Number(inputValue) !== value) onChange(clamped); // Immediate update on blur
    }
  };

  const onDecrement = () => {
    const parsed = Number.parseInt(inputValue) || value;
    const next = Math.max(minValue, parsed - 1);
    setInputValue(next.toString());
    setButtonValue(next);
  };

  const onIncrement = () => {
    const parsed = Number.parseInt(inputValue) || value;
    const next = Math.min(maxValue, parsed + 1);
    setInputValue(next.toString());
    setButtonValue(next);
  };

  const numericValue = Number.parseInt(inputValue);

  return (
    <div className={cn('relative h-8', className)} {...props}>
      <Button
        className='absolute inset-y-0 left-0 aspect-square h-full w-auto'
        disabled={numericValue <= minValue}
        size='iconSm'
        variant='ghost'
        onClick={onDecrement}
      >
        <MinusIcon />
      </Button>
      <input
        className='h-full w-full px-8 text-center outline-none'
        value={inputValue}
        autoComplete='off'
        inputMode='decimal'
        onBlur={onBlur}
        onChange={handleChange}
        onFocus={(e) => e.target.select()}
      />
      {numericValue > maxValue && (
        <div className='text-destructive absolute top-full right-1 z-[2] flex items-center gap-1 text-xs'>
          <InfoIcon className='size-3' />
          {t('Only {maxValue} left', { maxValue })}
        </div>
      )}
      <Button
        className='absolute inset-y-0 right-0 aspect-square h-full w-auto'
        disabled={numericValue >= maxValue}
        size='iconSm'
        variant='ghost'
        onClick={onIncrement}
      >
        <PlusIcon />
      </Button>
    </div>
  );
};
