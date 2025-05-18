'use client';

import { useQuery } from '@tanstack/react-query';
import { ChevronRightIcon, MenuIcon, PercentIcon, XIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';

import { BaseLayout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
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

  // const getSalesQuery = useQuery({
  //   queryKey: ['sales'],
  //   queryFn: () => getSales()
  // });

  // const sales = getSalesQuery?.data?.data.result || [];

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
    <div
      className='relative'
      onMouseLeave={() => {
        setOpen(false);
        setTab(-1);
      }}
    >
      <BaseLayout
        className={cn('flex items-center gap-3', { 'mt-16': offset > 32 })}
        onMouseEnter={() => setOpen(true)}
      >
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Button size='sm' variant='primaryFlat'>
              <PercentIcon className='size-4' />
              {t('Sale')}
            </Button>
          </TooltipTrigger>
          <TooltipContent side='bottom'>{t('In the process of development')}</TooltipContent>
        </Tooltip>
        <Button size='sm' variant='primaryFlat' onClick={() => setOpen((prev) => !prev)}>
          {open ? <XIcon /> : <MenuIcon />}
          <div className='font-semibold'>{t('Catalog')}</div>
        </Button>
        <nav className='no-scrollbar flex min-w-0 flex-1 gap-2 overflow-x-auto'>
          {getCategoriesQuery.isLoading
            ? Array.from({ length: 15 }).map((_, index) => (
                <Skeleton key={index} className='h-8 w-28' />
              ))
            : categories?.map((item, index) => (
                <Button
                  asChild
                  key={item.id}
                  size='sm'
                  variant={tab === index ? 'secondaryFlat' : 'muted'}
                >
                  <Link
                    href={`/category/${item.id}`}
                    onClick={() => setOpen(false)}
                    onMouseEnter={() => {
                      setOpen(true);
                      setTab(index);
                    }}
                  >
                    <Image
                      alt={item.name}
                      className='size-4'
                      height={16}
                      src={item.icon}
                      width={16}
                    />
                    {item.name}
                  </Link>
                </Button>
              ))}
        </nav>
      </BaseLayout>
      <div
        className={cn(
          'bg-background invisible absolute inset-x-0 top-full z-20 h-[60vh] scale-96 opacity-0 shadow-[0_400px_1000px_rgba(0,0,0,0.3)] transition-all',
          { 'visible scale-100 opacity-100': openDebounced }
        )}
      >
        <BaseLayout className='flex h-full gap-10 py-6'>
          <div className='-ml-2 overflow-y-auto border-r'>
            <ul className='w-60 overflow-y-auto pr-2 lg:w-72'>
              {categories?.map((item, index) => (
                <li
                  key={item.id}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2',
                    tab === index && 'text-secondary bg-muted cursor-pointer rounded-md'
                  )}
                  onMouseEnter={() => setTab(index)}
                >
                  <Image
                    alt={item.name}
                    className='size-4'
                    height={16}
                    src={item.icon}
                    width={16}
                  />
                  <span className='min-w-0 flex-1 truncate text-sm'>{item.name}</span>
                  {tab === index && <ChevronRightIcon className='size-4' />}
                </li>
              ))}
            </ul>
          </div>
          {tab !== -1 && categories && (
            <SubCategories category={categories[tab]} onClose={() => setOpen(false)} />
          )}
        </BaseLayout>
      </div>
    </div>
  );
};
