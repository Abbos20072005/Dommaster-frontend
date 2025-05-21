'use client';

import * as ProgressPrimitive from '@radix-ui/react-progress';
import * as React from 'react';

import { cn } from '@/lib/utils';

const Progress = ({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) => {
  return (
    <ProgressPrimitive.Root
      className={cn('bg-muted relative h-2 w-full overflow-hidden rounded-full', className)}
      data-slot='progress'
      {...props}
    >
      <ProgressPrimitive.Indicator
        className='bg-secondary h-full w-full flex-1 transition-all'
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
        data-slot='progress-indicator'
      />
    </ProgressPrimitive.Root>
  );
};

export { Progress };
