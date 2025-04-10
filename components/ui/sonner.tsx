'use client';

import type { ToasterProps } from 'sonner';

import { Toaster as Sonner } from 'sonner';

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className='toaster group z-60'
      closeButton
      position='top-center'
      toastOptions={{
        classNames: {
          toast:
            'group toast border group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
          closeButton: 'border group-[.toast]:bg-background group-[.toast]:text-foreground'
        }
      }}
      {...props}
    />
  );
};

export { Toaster };
