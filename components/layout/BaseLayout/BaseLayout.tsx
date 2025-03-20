import React from 'react';

import { cn } from '@/lib/utils';

interface Props extends React.ComponentProps<'div'> {
  fixed?: boolean;
}

export const BaseLayout = ({ fixed, className, ...props }: Props) => {
  return (
    <div
      className={cn(
        'mx-auto max-w-[1272px] px-2 py-4 md:px-4 md:py-6',
        fixed && 'flex flex-grow flex-col overflow-hidden',
        className
      )}
      {...props}
    />
  );
};
