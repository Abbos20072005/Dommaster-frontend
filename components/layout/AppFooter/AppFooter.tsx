import { useTranslations } from 'next-intl';
import React from 'react';

import { BaseLayout } from '@/components/layout';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

import { Links, MobileAppLinks, Socials } from './components';

interface Props extends React.ComponentProps<'footer'> {}

export const AppFooter = ({ className, children, ...props }: Props) => {
  const t = useTranslations();
  return (
    <footer
      className={cn(
        'bg-primary text-primary-foreground mt-10 pt-6 pb-20 md:pt-10 md:pb-10',
        className
      )}
      {...props}
    >
      <BaseLayout>
        <div className='flex flex-col justify-between gap-4 md:gap-6 lg:flex-row'>
          <div>
            <div className='mb-5'>
              <div className='mb-3 text-sm font-medium'>{t('Have a question? Call us')}</div>
              <a href='tel:+998712099944' className='text-2xl font-semibold'>
                +998 97 900 50 05
              </a>
            </div>
            <div>
              <div className='mb-2 text-sm font-medium'>{t('Receiving calls')}</div>
              <p>{t('Mon – Sun: from 07:00 – 22:00')}</p>
            </div>

            <Socials />
          </div>

          <Links />

          <MobileAppLinks />
        </div>

        <Separator className='my-6' />

        <div className='flex flex-col justify-between gap-6 lg:flex-row'>
          <p className='text-primary-foreground/60 max-w-3xl text-center text-sm lg:text-left'>
            {new Date().getFullYear()} ©buildex.uz. Все права защищены. Указанная стоимость товаров
            и условия их приобретения действительны по состоянию на текущую дату
          </p>
        </div>
      </BaseLayout>
    </footer>
  );
};
