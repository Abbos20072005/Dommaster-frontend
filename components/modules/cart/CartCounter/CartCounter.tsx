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
  const [inputValue, setInputValue] = React.useState<number>(value);
  const inputValueDebounced = useDebouncedValue(inputValue, 500);

  React.useEffect(() => {
    if (inputValueDebounced <= maxValue) onChange(inputValueDebounced);
  }, [inputValueDebounced]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (/^\d*$/.test(newValue)) {
      setInputValue(Number.parseInt(newValue));
    }
  };

  const handleBlur = () => {
    setInputValue(maxValue);
  };

  const onDecrement = () => {
    setInputValue((prev) => prev - 1);
  };

  const onIncrement = () => {
    setInputValue((prev) => prev + 1);
  };

  return (
    <div className={cn('relative h-8', className)} {...props}>
      <Button
        className='absolute inset-y-0 left-0'
        disabled={inputValue <= minValue}
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
        onBlur={handleBlur}
        onChange={handleChange}
        onFocus={(e) => e.target.select()}
      />
      {inputValue > maxValue && (
        <div className='text-destructive absolute top-full right-1 z-[2] flex items-center gap-1 text-xs'>
          <InfoIcon className='size-3' />
          {t('Only {maxValue} left', { maxValue })}
        </div>
      )}
      <Button
        className='absolute inset-y-0 right-0'
        disabled={inputValue >= maxValue}
        size='iconSm'
        variant='ghost'
        onClick={onIncrement}
      >
        <PlusIcon />
      </Button>
    </div>
  );
};
