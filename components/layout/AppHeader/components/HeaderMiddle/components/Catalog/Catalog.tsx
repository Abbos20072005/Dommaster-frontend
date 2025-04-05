import { ChevronRightIcon, HammerIcon, MenuIcon, XIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { categoryData } from '@/fake-data/category';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

import { CatalogChild } from './components';

export const Catalog = () => {
  const t = useTranslations();
  const [open, setOpen] = React.useState(false);
  const [tab, setTab] = React.useState<string>('');

  return (
    <div className='relative' onMouseLeave={() => setOpen(false)}>
      <Button onClick={() => setOpen((prev) => !prev)} onMouseEnter={() => setOpen(true)}>
        {open ? <XIcon /> : <MenuIcon />}
        <span className='hidden lg:inline'>{t('Catalog')}</span>
      </Button>

      <div
        className={cn(
          'absolute top-full left-0 h-[min(80vh,1000px] !translate-x-[-200px] bg-transparent p-0 pt-4 shadow-none',
          !open && 'hidden',
          tab && 'w-[min(calc(100vw-70px),1200px)]'
        )}
        onMouseLeave={() => setTab('')}
      >
        <div className='bg-background gap-4 overflow-y-auto rounded-lg shadow-md'>
          <Tabs className='flex-row gap-0' value={tab} orientation='vertical'>
            <TabsList
              className='w-60 flex-col justify-start overflow-y-auto rounded-none px-2 py-4 lg:w-72'
              variant='ghost'
            >
              {categoryData.map((item) => (
                <TabsTrigger
                  key={item.id}
                  className='data-[state=active]:text-secondary w-full grow-0 gap-3'
                  value={`tab-${item.id}`}
                  variant='ghost'
                  onMouseEnter={() => setTab(`tab-${item.id}`)}
                >
                  <HammerIcon />
                  <span className='flex-1 text-start'>{item.title}</span>
                  {tab === `tab-${item.id}` && <ChevronRightIcon className='size-4' />}
                </TabsTrigger>
              ))}
            </TabsList>

            {categoryData.map((item) => (
              <TabsContent
                key={item.id}
                className='bg-background grow overflow-y-auto border-l p-6'
                value={`tab-${item.id}`}
              >
                <Link href={`/category/${item.id}`}>
                  <p className='hover:text-secondary mb-6 text-xl font-bold transition-colors'>
                    {item.title}
                  </p>
                </Link>

                <div className='grid grid-cols-2 grid-rows-1 gap-4 lg:grid-cols-3'>
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className='space-y-4'>
                      {item.children
                        .slice(
                          Math.ceil((i * item.children.length) / 3),
                          Math.ceil(((i + 1) * item.children.length) / 3)
                        )
                        .map((child) => (
                          <CatalogChild key={child.id} item={child} />
                        ))}
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
};
