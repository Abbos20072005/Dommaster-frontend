import React from 'react';

import { cn } from '@/lib/utils';

interface Props extends React.ComponentProps<'div'> {
  fixed?: boolean;
}

export const BaseLayout = ({ fixed, className, ...props }: Props) => {
  return (
    <div
      className={cn(
        'mx-auto max-w-[1400px] px-4 md:px-5',
        fixed && 'flex flex-grow flex-col overflow-hidden',
        className
      )}
      {...props}
    />
  );
};
