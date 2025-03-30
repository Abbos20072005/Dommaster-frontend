import React from 'react';

import { Input } from '@/components/ui/input';
import { useDebouncedValue } from '@/hooks/useDeboucedValue';

interface Props extends React.ComponentProps<typeof Input> {
  inputValue: string;
  max?: number;
  min?: number;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  onValueChange: (value: number) => void;
}

export const NumberInput = ({
  max,
  min,
  onValueChange,
  inputValue,
  setInputValue,
  ...props
}: Props) => {
  const debouncedValue = useDebouncedValue(inputValue, 500);

  React.useEffect(() => {
    const parsedValue = Number.parseInt(debouncedValue, 10);
    if (!Number.isNaN(parsedValue)) {
      onValueChange(parsedValue);
    }
  }, [debouncedValue]);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (/^\d*$/.test(newValue)) {
      setInputValue(newValue);
    }
  };

  return (
    <Input
      {...props}
      size='sm'
      value={inputValue}
      autoComplete='off'
      inputMode='numeric'
      onChange={onInputChange}
    />
  );
};
