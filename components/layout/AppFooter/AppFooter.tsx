import { CommandIcon } from 'lucide-react';
import React from 'react';

import { Separator } from '@/components/ui/separator';
import { Link } from '@/i18n/routing';
import { cn } from '@/lib/utils';

interface Props extends React.ComponentProps<'footer'> {}

export const AppFooter = ({ className, children, ...props }: Props) => {
  return (
    <footer className={cn('bg-muted border-t', className)} {...props}>
      <div className='mx-auto max-w-7xl px-4 py-10 md:py-20'>
        <div className='flex flex-col items-start justify-between gap-8 md:gap-12 lg:flex-row'>
          <div>
            <Link href='/' className='flex items-center gap-2'>
              <CommandIcon />
              <span className='text-2xl font-medium'>CDE</span>
            </Link>
            <p className='text-muted-foreground mt-6 text-lg font-medium'>
              The best platform for learning.
            </p>
          </div>
          <div className='flex flex-col gap-6 md:gap-12 lg:flex-row'>
            <Link href='/courses' className='hover:text-primary text-xl font-medium'>
              Courses
            </Link>
            <Link href='/profile' className='hover:text-primary text-xl font-medium'>
              Profile
            </Link>
            <Link href='/history' className='hover:text-primary text-xl font-medium'>
              History
            </Link>
          </div>
        </div>

        <Separator className='my-6 md:my-10' />

        <div className='flex flex-col justify-between gap-6 lg:flex-row'>
          <p>© 2025 Platform «CDE»</p>
        </div>
      </div>
    </footer>
  );
};
