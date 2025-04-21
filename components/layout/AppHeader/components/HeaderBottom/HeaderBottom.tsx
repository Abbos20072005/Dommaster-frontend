'use client';

import { useQuery } from '@tanstack/react-query';
import { PercentIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { BaseLayout } from '@/components/layout';
import { Skeleton } from '@/components/ui/skeleton';
import { useDebouncedValue } from '@/hooks';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { getCategories } from '@/utils/api/requests';

import { SubCategories } from './components';

export const HeaderBottom = () => {
  const t = useTranslations();
  const [offset, setOffset] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [tab, setTab] = React.useState<number>(-1);
  const openDebounced = useDebouncedValue(open, 200);

  const getCategoriesQuery = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories()
  });

  const categories = getCategoriesQuery.data?.data.result;

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
        <nav className='flex h-5 flex-wrap justify-between gap-4 overflow-clip'>
          <Link
            href='/sale'
            className='text-primary flex items-center gap-1 text-sm font-bold text-nowrap transition-colors'
          >
            <PercentIcon className='size-4' />
            {t('Sale')}
          </Link>
          {getCategoriesQuery.isLoading
            ? Array.from({ length: 15 }).map((_, index) => (
                <Skeleton key={index} className='h-4 w-28' />
              ))
            : categories?.map((item, index) => (
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
          'bg-background invisible absolute inset-x-0 top-full z-20 scale-96 py-6 opacity-0 shadow-[0_150px_200px_rgba(0,0,0,0.2)] transition-all',
          { 'visible scale-100 opacity-100': openDebounced }
        )}
      >
        <BaseLayout>
          <div className='flex gap-20 overflow-x-auto'>
            {tab !== -1 && categories && <SubCategories category={categories[tab]} />}
          </div>
        </BaseLayout>
      </div>
    </div>
  );
};
