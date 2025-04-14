import { cn } from '@/lib/utils';

const Skeleton = ({ className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-black/5', className)}
      data-slot='skeleton'
      {...props}
    />
  );
};

export { Skeleton };
