import type { VariantProps } from 'class-variance-authority';

import { cva } from 'class-variance-authority';
import { Slot as SlotPrimitive } from 'radix-ui';
import * as React from 'react';

import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        primaryFlat: 'bg-primary/10 text-primary hover:bg-primary/8',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        destructiveFlat: 'bg-destructive/10 text-destructive hover:bg-destructive/8',
        outline:
          'border text-foreground border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondaryFlat: 'bg-secondary/10 text-secondary hover:bg-secondary/8',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        muted: 'bg-muted text-foreground hover:bg-muted/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        ghostDestructive: 'hover:bg-destructive/10 text-destructive',
        link: 'text-secondary underline-offset-4 hover:underline'
      },
      size: {
        default: "h-11 px-4 py-2 has-[>svg]:px-3 [&_svg:not([class*='size-'])]:size-5",
        sm: "h-8 px-4 has-[>svg]:px-2.5 [&_svg:not([class*='size-'])]:size-4.5",
        xs: "h-6 px-4 text-xs has-[>svg]:px-2 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-13 px-6 has-[>svg]:px-4 [&_svg:not([class*='size-'])]:size-5.5",
        iconLg: "size-13 [&_svg:not([class*='size-'])]:size-5.5",
        icon: "size-11 [&_svg:not([class*='size-'])]:size-5",
        iconSm: "size-8 [&_svg:not([class*='size-'])]:size-4.5"
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

interface ButtonPropsBase
  extends React.ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {}

export type ButtonProps = ButtonPropsBase &
  (
    | { asChild: true }
    | {
        asChild?: false;
        isLoading?: boolean;
        leftSection?: React.JSX.Element;
        rightSection?: React.JSX.Element;
      }
  );
const Button = ({ className, variant, size, children, ...props }: ButtonProps) => {
  const { asChild, ...rest } = props;
  if (asChild) {
    return (
      <SlotPrimitive.Slot className={cn(buttonVariants({ variant, size, className }))} {...rest}>
        {children}
      </SlotPrimitive.Slot>
    );
  }

  const { isLoading = false, leftSection, rightSection, disabled, ...otherProps } = props;

  return (
    <button
      className={cn('relative overflow-hidden', buttonVariants({ variant, size, className }))}
      disabled={isLoading || disabled}
      {...otherProps}
    >
      <span
        className={cn(
          'absolute inset-0 flex items-center justify-center transition-transform duration-300',
          isLoading ? 'translate-y-0' : '-translate-y-full'
        )}
      >
        <Spinner />
      </span>
      <span
        className={cn(
          'flex items-center justify-center gap-2 transition-transform duration-300',
          isLoading ? 'translate-y-[150%]' : 'translate-y-0'
        )}
      >
        {children}
      </span>
    </button>
  );
};

export { Button, buttonVariants };
