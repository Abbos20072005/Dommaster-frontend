'use client';
import * as React from 'react';
import * as RPNInput from 'react-phone-number-input';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

type Props = Omit<React.ComponentProps<typeof Input>, 'onChange' | 'value'> &
  Omit<RPNInput.Props<typeof RPNInput.default>, 'onChange'> & {
    onChange?: (value: RPNInput.Value) => void;
  };

const PhoneInput = ({ className, onChange, ...props }: Props) => {
  return (
    <>
      {/* @ts-ignore */}
      <RPNInput.default
        limitMaxLength
        className={cn('flex', className)}
        countries={['UZ']}
        countrySelectComponent={() => null}
        inputComponent={Input}
        onChange={(value) => onChange?.(value as RPNInput.Value)}
        {...props}
      />
    </>
  );
};
PhoneInput.displayName = 'PhoneInput';

export { PhoneInput };
