'use client';

import type { VariantProps } from 'class-variance-authority';

import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cva } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const Tabs = ({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) => {
  return (
    <TabsPrimitive.Root
      className={cn('flex flex-col gap-4', className)}
      data-slot='tabs'
      {...props}
    />
  );
};

const tabListVariants = cva(
  'bg-transparent text-muted-foreground inline-flex w-fit items-center justify-center rounded-lg',
  {
    variants: {
      variant: {
        default: 'bg-muted p-1',
        ghost: '',
        underline: 'bg-background px-2'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
);

const TabsList = ({
  className,
  variant,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> & VariantProps<typeof tabListVariants>) => {
  return (
    <TabsPrimitive.List
      className={cn(tabListVariants({ variant }), className)}
      data-slot='tabs-list'
      {...props}
    />
  );
};

const tabVariants = cva(
  "data-[state=active]:text-foreground ring-ring/10 dark:ring-ring/20 dark:outline-ring/40 outline-ring/50 relative inline-flex flex-1 items-center justify-center gap-2 rounded-none px-4 py-2 text-sm font-medium whitespace-nowrap focus-visible:ring-4 focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 aria-invalid:focus-visible:ring-0 data-[state=active]:bg-transparent data-[state=active]:shadow-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          'rounded-md ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow',
        ghost:
          'data-[state=active]:bg-muted text-foreground rounded-md border-transparent text-secondary-foreground',
        underline:
          'transition-all after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 hover:not-disabled:after:bg-tertiary after:transition-all after:bg-muted data-[state=active]:after:!bg-primary'
      },
      size: {
        default: 'h-9',
        sm: 'h-6',
        lg: 'h-11'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
);

const TabsTrigger = ({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger> & VariantProps<typeof tabVariants>) => {
  return (
    <TabsPrimitive.Trigger
      className={cn(tabVariants({ variant, size }), className)}
      data-slot='tabs-trigger'
      {...props}
    />
  );
};

const TabsContent = ({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) => {
  return (
    <TabsPrimitive.Content
      className={cn(
        'ring-ring/10 dark:ring-ring/20 dark:outline-ring/40 outline-ring/50 flex-1 transition-[color,box-shadow] focus-visible:ring-4 focus-visible:outline-1 aria-invalid:focus-visible:ring-0',
        className
      )}
      data-slot='tabs-content'
      {...props}
    />
  );
};

export { Tabs, TabsContent, TabsList, TabsTrigger };
