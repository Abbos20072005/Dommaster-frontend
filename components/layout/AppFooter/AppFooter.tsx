import { useTranslations } from 'next-intl';
import React from 'react';

import { BaseLayout } from '@/components/layout/BaseLayout';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { CONTACT_PHONE, CONTACT_PHONE_HREF } from '@/utils/constants';

import { Links, MobileAppLinks, Socials } from './components';

interface Props extends React.ComponentProps<'footer'> {}

export const AppFooter = ({ className, children, ...props }: Props) => {
  const t = useTranslations();
  return (
    <footer
      className={cn(
        'text-primary-foreground mt-6 pb-24 md:mt-10 md:bg-[#002478] md:pt-10 md:pb-10',
        className
      )}
      {...props}
    >
      {/* a phone has no dark footer, but the pages of the company, the delivery and the legal
          texts must stay reachable: a light compact version of the same links */}
      <BaseLayout className='text-foreground md:hidden'>
        <div className='space-y-5 border-t pt-6'>
          <div>
            <div className='text-muted-foreground mb-1 text-sm'>{t('Have a question? Call us')}</div>
            <a href={CONTACT_PHONE_HREF} className='inline-block py-1 text-lg font-semibold'>
              {CONTACT_PHONE}
            </a>
            <p className='text-muted-foreground text-sm'>{t('Mon – Sun: from 07:00 – 22:00')}</p>
          </div>
          <Links />
          <p className='text-muted-foreground text-xs'>
            {new Date().getFullYear()} ©buildex.uz. {t('Footer copyright')}
          </p>
        </div>
      </BaseLayout>
      <BaseLayout className='hidden md:block'>
        <div className='flex flex-col justify-between gap-4 md:gap-6 lg:flex-row'>
          <div>
            <div className='mb-5'>
              <div className='mb-3 text-sm font-medium'>{t('Have a question? Call us')}</div>
              <a href={CONTACT_PHONE_HREF} className='text-2xl font-semibold'>
                {CONTACT_PHONE}
              </a>
            </div>
            <div>
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
            {new Date().getFullYear()} ©buildex.uz. {t('Footer copyright')}
          </p>
        </div>
      </BaseLayout>
    </footer>
  );
};
