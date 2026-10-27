'use client';

import { ClockIcon, MapPinIcon, NavigationIcon, PhoneIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';

import { nextOpenDate, storeDirectionsUrl, todayHours } from '@/lib/stores';
import { cn } from '@/lib/utils';

import { StoresMapLoader } from './StoresMapLoader';

/**
 * The shops as a list and on the map of Tashkent (BLD-316). They are linked: a shop chosen in the
 * list is brought to the middle of the map, a point pressed on the map marks its card. On a phone
 * the list and the map are switched. The list is in the HTML (the server renders it) and works
 * without the map.
 */
export const StoresView = ({ stores }: { stores: Store[] }) => {
  const t = useTranslations();
  const [selectedId, setSelectedId] = React.useState<number | null>(null);
  const [view, setView] = React.useState<'list' | 'map'>('list');
  const cards = React.useRef(new Map<number, HTMLElement>());

  const select = (id: number, fromMap = false) => {
    setSelectedId(id);
    // a point pressed on the map: its card is shown in the list
    if (fromMap) cards.current.get(id)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  return (
    <div className='grid gap-4'>
      {/* phone: a switch between the list and the map */}
      <div className='bg-muted grid grid-cols-2 gap-1 rounded-xl p-1 lg:hidden' role='tablist'>
        {(['list', 'map'] as const).map((value) => (
          <button
            aria-selected={view === value}
            className={cn(
              'h-10 rounded-lg text-sm font-medium transition-colors',
              view === value ? 'bg-white shadow-sm' : 'text-muted-foreground'
            )}
            key={value}
            role='tab'
            type='button'
            onClick={() => setView(value)}
          >
            {value === 'list' ? t('Stores list') : t('Stores map')}
          </button>
        ))}
      </div>

      <div className='grid gap-4 lg:grid-cols-[minmax(0,400px)_minmax(0,1fr)]'>
        <ul className={cn('grid content-start gap-3', view === 'map' && 'hidden lg:grid')}>
          {stores.map((store) => {
            const hours = todayHours(store);
            const isSelected = store.id === selectedId;

            return (
              <li
                className={cn(
                  'border-border overflow-hidden rounded-xl border bg-white transition-colors',
                  isSelected && 'border-primary ring-primary/20 ring-2'
                )}
                key={store.id}
                ref={(element) => {
                  if (element) cards.current.set(store.id, element);
                  else cards.current.delete(store.id);
                }}
              >
                {store.photo && (
                  <Image
                    alt={store.name}
                    className='h-40 w-full object-cover'
                    height={160}
                    sizes='(min-width: 1024px) 400px, 100vw'
                    src={store.photo}
                    width={400}
                  />
                )}
                <div className='grid gap-2.5 p-4 text-sm leading-5'>
                  <div className='flex flex-wrap items-center justify-between gap-2'>
                    <h2 className='text-lg leading-6 font-bold'>{store.name}</h2>
                    <span
                      className={cn(
                        'rounded px-1.5 py-0.5 text-xs font-bold',
                        store.is_open_now
                          ? 'bg-[#E6F6EC] text-[#12703C]'
                          : 'bg-[#FDECEC] text-[#B42318]'
                      )}
                    >
                      {store.is_open_now ? t('Open now') : t('Closed now')}
                    </span>
                  </div>
                  {!store.is_open_now && store.next_open && (
                    <p className='text-muted-foreground'>
                      {t('Opens next', {
                        date: nextOpenDate(store.next_open),
                        time: store.next_open.time
                      })}
                    </p>
                  )}
                  {(store.address || store.landmark) && (
                    <p className='text-muted-foreground flex items-start gap-2'>
                      <MapPinIcon className='mt-0.5 size-4 shrink-0' />
                      <span>
                        {store.address}
                        {store.address && store.landmark && ' · '}
                        {store.landmark}
                      </span>
                    </p>
                  )}
                  <p className='text-muted-foreground flex items-center gap-2'>
                    <ClockIcon className='size-4 shrink-0' />
                    {hours ? `${t('Today')}: ${hours}` : t('Day off today')}
                  </p>
                  {store.phone && (
                    <a
                      className='text-primary flex items-center gap-2 font-medium'
                      href={`tel:${store.phone.replace(/\s/g, '')}`}
                    >
                      <PhoneIcon className='size-4 shrink-0' />
                      {store.phone}
                    </a>
                  )}
                  <div className='flex flex-wrap gap-2 pt-1'>
                    <button
                      className='bg-primary/10 text-primary hover:bg-primary/15 inline-flex h-9 items-center gap-1.5 rounded-lg px-3 text-sm font-bold transition-colors'
                      type='button'
                      onClick={() => {
                        select(store.id);
                        setView('map');
                      }}
                    >
                      <MapPinIcon className='size-4' />
                      {t('Show on map')}
                    </button>
                    <a
                      className='bg-primary hover:bg-primary/90 inline-flex h-9 items-center gap-1.5 rounded-lg px-3 text-sm font-bold text-white transition-colors'
                      href={storeDirectionsUrl(store)}
                      rel='noopener noreferrer'
                      target='_blank'
                    >
                      <NavigationIcon className='size-4' />
                      {t('Get directions')}
                    </a>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <div
          className={cn(
            'h-[70vh] min-h-[360px] overflow-hidden rounded-xl lg:sticky lg:top-4 lg:h-[600px]',
            view === 'list' && 'hidden lg:block'
          )}
        >
          <StoresMapLoader
            selectedId={selectedId}
            stores={stores}
            onSelect={(id) => select(id, true)}
          />
        </div>
      </div>
    </div>
  );
};
