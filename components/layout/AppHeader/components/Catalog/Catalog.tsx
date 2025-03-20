import { MenuIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { BaseLayout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from '@/i18n/routing';

import { CatalogChild } from './CatalogChild';

const catalog = [
  {
    id: 1,
    title: 'Сторойматериалы',
    children: [
      {
        id: 12,
        title: 'Окна и комплектующие',
        children: [
          {
            id: 100,
            title: 'Кирпич',
            count: 10
          },
          {
            id: 101,
            title: 'Строительные блоки',
            count: 14
          }
        ]
      },
      {
        id: 10,
        title: 'Стеновые и фасадные материалы',
        children: [
          {
            id: 100,
            title: 'Кирпич',
            count: 10
          },
          {
            id: 101,
            title: 'Строительные блоки',
            count: 14
          },
          {
            id: 102,
            title: 'Строительные блоки',
            count: 14
          }
        ]
      },
      {
        id: 14,
        title: 'Стеновые и фасадные материалы',
        children: [
          {
            id: 100,
            title: 'Кирпич',
            count: 10
          },
          {
            id: 102,
            title: 'Строительные блоки',
            count: 14
          }
        ]
      },
      {
        id: 15,
        title: 'Стеновые и фасадные материалы',
        children: [
          {
            id: 100,
            title: 'Кирпич',
            count: 10
          },
          {
            id: 101,
            title: 'Строительные блоки hello',
            count: 14
          },
          {
            id: 102,
            title: 'Строительные блоки',
            count: 14
          }
        ]
      },
      {
        id: 16,
        title: 'Стеновые и фасадные материалы',
        children: [
          {
            id: 100,
            title: 'Кирпич',
            count: 10
          },
          {
            id: 101,
            title: 'Строительные блоки ello of course',
            count: 14
          },
          {
            id: 102,
            title: 'Строительные блоки',
            count: 14
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: 'Инструмент',
    children: [
      {
        id: 20,
        title: 'Ручной инструмент',
        children: [
          {
            id: 200,
            title: 'Зажимные инструменты и устройства',
            count: 10
          },
          {
            id: 201,
            title: 'Строительные блоки',
            count: 14
          }
        ]
      }
    ]
  },
  {
    id: 21,
    title: 'Строительные блоки',
    children: [
      {
        id: 20,
        title: 'Ручной инструмент',
        children: [
          {
            id: 200,
            title: 'Зажимные инструменты и устройства',
            count: 10
          },
          {
            id: 201,
            title: 'Строительные блоки',
            count: 14
          }
        ]
      }
    ]
  }
];

export const Catalog = () => {
  const t = useTranslations();
  const [tab, setTab] = React.useState(`tab-${catalog[0].id}`);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>
          <MenuIcon />
          <span className='hidden lg:inline'>{t('Catalog')}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className='h-[calc(100vh-90px)] w-screen rounded-none border-none p-0 shadow-[0_2px_2px_0_#445c821f,-1px_4px_10px_0_#445c821a,0_-2px_10px_0_#445c820d]'>
        <BaseLayout className='grid h-full gap-4 overflow-y-auto !py-0'>
          <Tabs
            className='h-full w-full flex-row p-0'
            defaultValue='tab-1'
            value={tab}
            orientation='vertical'
          >
            <TabsList className='h-full w-52 flex-col justify-start gap-1 border-r bg-transparent py-6 pr-4 pl-0 lg:w-64'>
              {catalog.map((item) => (
                <TabsTrigger
                  asChild
                  key={item.id}
                  className='data-[state=active]:bg-muted w-full justify-start px-4 py-2.5 data-[state=active]:shadow-none'
                  value={`tab-${item.id}`}
                  onMouseEnter={() => setTab(`tab-${item.id}`)}
                >
                  <Link href={`catalog/${item.id}`}>{item.title}</Link>
                </TabsTrigger>
              ))}
            </TabsList>
            {catalog.map((item) => (
              <TabsContent key={item.id} className='grow py-8 pl-6' value={`tab-${item.id}`}>
                <Link href={`catalog/${item.id}`}>
                  <p className='mb-6 text-3xl font-bold'>{item.title}</p>
                </Link>
                <div className='columns-3 gap-6 space-y-6 lg:columns-4'>
                  {item.children.map((child) => (
                    <CatalogChild key={child.id} item={child} />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </BaseLayout>
      </PopoverContent>
    </Popover>
  );
};
