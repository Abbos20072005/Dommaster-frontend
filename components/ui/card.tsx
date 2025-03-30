import * as React from 'react';

import { cn } from '@/lib/utils';

const Card = ({ className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div
      className={cn('bg-card text-card-foreground rounded-xl shadow-sm', className)}
      data-slot='card'
      {...props}
    />
  );
};

const CardHeader = ({ className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div
      className={cn('flex flex-col gap-1.5 p-6', className)}
      data-slot='card-header'
      {...props}
    />
  );
};

const CardTitle = ({ className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div
      className={cn('leading-none font-semibold tracking-tight', className)}
      data-slot='card-title'
      {...props}
    />
  );
};

const CardDescription = ({ className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div
      className={cn('text-muted-foreground text-sm', className)}
      data-slot='card-description'
      {...props}
    />
  );
};

const CardContent = ({ className, ...props }: React.ComponentProps<'div'>) => {
  return <div className={cn('p-6 pt-0', className)} data-slot='card-content' {...props} />;
};

const CardFooter = ({ className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div
      className={cn('flex items-center p-6 pt-0', className)}
      data-slot='card-footer'
      {...props}
    />
  );
};

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle };
