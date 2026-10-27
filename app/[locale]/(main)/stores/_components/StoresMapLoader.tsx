'use client';

import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import React from 'react';

import { Skeleton } from '@/components/ui/skeleton';

// `ymap3-components` touches `document` as soon as it is loaded: the map is loaded in the browser only
const StoresMap = dynamic(() => import('./StoresMap').then((module) => module.StoresMap), {
  ssr: false,
  loading: () => <Skeleton className='size-full rounded-xl' />
});

const MapFailed = () => {
  const t = useTranslations();
  return (
    <div className='bg-muted text-muted-foreground flex size-full items-center justify-center rounded-xl p-6 text-center text-sm'>
      {t('Map did not load')}
    </div>
  );
};

/** The map must never take the list down with it: if it fails, a short note is shown instead. */
class MapBoundary extends React.Component<{ children: React.ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? <MapFailed /> : this.props.children;
  }
}

export const StoresMapLoader = (props: React.ComponentProps<typeof StoresMap>) => (
  <MapBoundary>
    <StoresMap {...props} />
  </MapBoundary>
);
