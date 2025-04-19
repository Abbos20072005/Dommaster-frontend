'use client';

import { PercentIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { BaseLayout } from '@/components/layout';
import { categoryData } from '@/fake-data/category';
import { useDebouncedValue } from '@/hooks';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

import { SubCategories } from './components';

export const HeaderBottom = () => {
  const t = useTranslations();
  const [offset, setOffset] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [tab, setTab] = React.useState<number>(-1);
  const openDebounced = useDebouncedValue(open, 100);

  React.useEffect(() => {
    const onScroll = () => {
      setOffset(document.body.scrollTop || document.documentElement.scrollTop);
    };
    document.addEventListener('scroll', onScroll, { passive: true });
    return () => document.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className='relative' onMouseLeave={() => setOpen(false)}>
      <BaseLayout className={cn('py-1', { 'mt-16': offset > 32 })}>
        <nav className='flex h-5 flex-wrap justify-between gap-3 overflow-clip'>
          <Link
            href='/sale'
            className='text-primary flex items-center gap-1 text-sm font-bold text-nowrap transition-colors'
          >
            <PercentIcon className='size-4' />
            {t('Sale')}
          </Link>
          {categoryData.map((item, index) => (
            <Link
              href={`/category/${item.id}`}
              key={item.id}
              className={cn('hover:text-secondary text-sm text-nowrap transition-colors', {
                'text-secondary': tab === index && open
              })}
              onMouseEnter={() => {
                setOpen(true);
                setTab(index);
              }}
            >
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </BaseLayout>
      <div
        className={cn(
          'bg-background invisible absolute inset-x-0 top-full z-50 scale-96 py-6 opacity-0 shadow-[0_100px_100px_rgba(0,0,0,0.2)] transition-all',
          { 'visible scale-100 opacity-100': openDebounced }
        )}
      >
        <BaseLayout>
          <div className='flex gap-20 overflow-x-auto'>
            {tab !== -1 && <SubCategories category={categoryData[tab]} />}
          </div>
        </BaseLayout>
      </div>
    </div>
  );
};
