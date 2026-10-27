'use client';

import { useTranslations } from 'next-intl';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { Link } from '@/i18n/navigation';
import { useIsPro } from '@/modules/pro';

/** The PRO section is only for PRO customers: the others see a short note, not an error. */
export const ProProjectsOnly = ({ children }: { children: React.ReactNode }) => {
  const t = useTranslations();
  const { isPro, isLoading } = useIsPro();

  if (isLoading) {
    return (
      <div className='flex items-center justify-center py-20'>
        <Spinner />
      </div>
    );
  }

  if (!isPro) {
    return (
      <div className='border-border grid justify-items-center gap-2 rounded-xl border bg-white px-6 py-14 text-center'>
        <span className='text-xl font-bold'>{t('PRO only title')}</span>
        <span className='text-muted-foreground max-w-md text-sm'>{t('PRO only text')}</span>
        <Button asChild className='mt-3'>
          <Link href='/user/dashboard'>{t('My cabinet')}</Link>
        </Button>
      </div>
    );
  }

  return children;
};
