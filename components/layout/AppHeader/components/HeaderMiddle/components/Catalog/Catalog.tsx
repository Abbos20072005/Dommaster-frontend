import { useQuery } from '@tanstack/react-query';
import { ChevronRightIcon, MenuIcon, XIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getCategories } from '@/utils/api/requests';

import { SubCategories } from './components';

export const Catalog = () => {
  const t = useTranslations();
  const [open, setOpen] = React.useState(false);
  const [tab, setTab] = React.useState<number>(-1);

  const getCategoriesQuery = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories()
  });

  const categories = getCategoriesQuery.data?.data.result;

  return (
    <div className='relative' onMouseLeave={() => setOpen(false)}>
      <Button onClick={() => setOpen((prev) => !prev)} onMouseEnter={() => setOpen(true)}>
        {open ? <XIcon /> : <MenuIcon />}
        <span className='hidden lg:inline'>{t('Catalog')}</span>
      </Button>

      <div
        className={cn(
          'invisible absolute top-full left-0 z-50 h-[min(80vh,1000px] !translate-x-[-200px] scale-96 bg-transparent p-0 pt-2 opacity-0 shadow-none transition-all',
          { 'visible scale-100 opacity-100': open },
          tab !== -1 && 'w-[min(calc(100vw-70px),1200px)]'
        )}
        onMouseLeave={() => setTab(-1)}
      >
        <div className='bg-background gap-4 overflow-y-auto rounded-lg shadow-md'>
          <div className='flex'>
            <ul className='w-60 overflow-y-auto px-2 py-4 lg:w-72'>
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
                  <span className='flex-1 text-sm'>{item.name}</span>
                  {tab === index && <ChevronRightIcon className='size-4' />}
                </li>
              ))}
            </ul>

            {tab !== -1 && categories && <SubCategories category={categories[tab]} />}
          </div>
        </div>
      </div>
    </div>
  );
};
