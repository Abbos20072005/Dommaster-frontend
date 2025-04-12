import { ChevronRightIcon, HammerIcon, MenuIcon, XIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { Button } from '@/components/ui/button';
import { categoryData } from '@/fake-data/category';
import { cn } from '@/lib/utils';

import { SubCategories } from './components';

export const Catalog = () => {
  const t = useTranslations();
  const [open, setOpen] = React.useState(false);
  const [tab, setTab] = React.useState<number>(-1);

  return (
    <div className='relative' onMouseLeave={() => setOpen(false)}>
      <Button onClick={() => setOpen((prev) => !prev)} onMouseEnter={() => setOpen(true)}>
        {open ? <XIcon /> : <MenuIcon />}
        <span className='hidden lg:inline'>{t('Catalog')}</span>
      </Button>

      <div
        className={cn(
          'absolute top-full left-0 z-50 h-[min(80vh,1000px] !translate-x-[-200px] bg-transparent p-0 pt-4 shadow-none',
          !open && 'hidden',
          tab !== -1 && 'w-[min(calc(100vw-70px),1200px)]'
        )}
        onMouseLeave={() => setTab(-1)}
      >
        <div className='bg-background gap-4 overflow-y-auto rounded-lg shadow-md'>
          <div className='flex'>
            <ul className='w-60 overflow-y-auto px-2 py-4 lg:w-72'>
              {categoryData.map((item, index) => (
                <li
                  key={item.id}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2',
                    tab === index && 'text-secondary bg-muted cursor-pointer rounded-md'
                  )}
                  onMouseEnter={() => setTab(index)}
                >
                  <HammerIcon className='size-4' />
                  <span className='flex-1 text-sm'>{item.title}</span>
                  {tab === index && <ChevronRightIcon className='size-4' />}
                </li>
              ))}
            </ul>

            {tab !== -1 && <SubCategories subCategory={categoryData[tab]} />}
          </div>
        </div>
      </div>
    </div>
  );
};
