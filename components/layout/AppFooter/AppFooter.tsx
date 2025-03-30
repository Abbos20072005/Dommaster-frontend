import React from 'react';

import { BaseLayout } from '@/components/layout';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

import { Links, MobileAppLinks, Socials } from './components';

interface Props extends React.ComponentProps<'footer'> {}

export const AppFooter = ({ className, children, ...props }: Props) => {
  return (
    <footer className={cn('bg-muted py-6 md:py-10 lg:pt-14', className)} {...props}>
      <BaseLayout className='!py-0'>
        <div className='flex flex-col justify-between gap-6 lg:flex-row'>
          <div>
            <div className='mb-5'>
              <div className='mb-3 text-sm font-medium'>Возник вопрос? Звоните</div>
              <a href='tel:+998712099944' className='text-2xl font-semibold'>
                +998 71 209 99 44
              </a>
            </div>

            <Socials />
          </div>

          <Links />

          <MobileAppLinks />
        </div>

        <Separator className='my-6 md:my-10' />

        <div className='flex flex-col justify-between gap-6 lg:flex-row'>
          <p className='text-muted-foreground max-w-3xl text-center text-sm lg:text-left'>
            {new Date().getFullYear()} ©dommaster.uz. Все права защищены. Указанная стоимость
            товаров и условия их приобретения действительны по состоянию на текущую дату
          </p>
        </div>
      </BaseLayout>
    </footer>
  );
};
