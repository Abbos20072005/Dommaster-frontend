'use client';

import { PercentIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { BaseLayout } from '@/components/layout';
import { categoryData } from '@/fake-data/category';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

export const HeaderBottom = () => {
  const t = useTranslations();
  const [offset, setOffset] = React.useState(0);

  React.useEffect(() => {
    const onScroll = () => {
      setOffset(document.body.scrollTop || document.documentElement.scrollTop);
    };
    document.addEventListener('scroll', onScroll, { passive: true });
    return () => document.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <BaseLayout className={cn('py-1', { 'mt-16': offset > 32 })}>
      <nav className='flex h-5 flex-wrap justify-between gap-3 overflow-clip'>
        <Link
          href='/sale'
          className='text-primary flex items-center gap-1 text-sm font-bold text-nowrap transition-colors'
        >
          <PercentIcon className='size-4' />
          {t('Sale')}
        </Link>
        {categoryData.map((item) => (
          <Link
            href={`/category/${item.id}`}
            key={item.id}
            className='hover:text-primary text-sm text-nowrap transition-colors'
          >
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </BaseLayout>
  );
};
