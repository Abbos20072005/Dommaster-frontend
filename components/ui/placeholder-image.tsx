import { Slot } from '@radix-ui/react-slot';
import React from 'react';

import { Icons } from '@/components/Icons';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface PlaceholderImageProps extends React.ComponentPropsWithoutRef<'div'> {
  asChild?: boolean;
  isSkeleton?: boolean;
}

export const PlaceholderImage = ({
  isSkeleton = false,
  asChild = false,
  className,
  ...props
}: PlaceholderImageProps) => {
  const Comp = asChild ? Slot : 'div';

  return (
    <Comp className={cn('aspect-square overflow-hidden rounded-md', className)} {...props}>
      <Skeleton
        className={cn(
          'bg-muted flex size-full items-center justify-center',
          isSkeleton ? 'animate-pulse' : 'animate-none'
        )}
        aria-label='Placeholder'
        aria-roledescription='placeholder'
        role='img'
      >
        <Icons.placeholder aria-hidden='true' className='text-muted-foreground size-9' />
      </Skeleton>
    </Comp>
  );
};
