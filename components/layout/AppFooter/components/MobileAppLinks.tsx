import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';

const STORES = [
  {
    name: 'Google Play',
    href: 'https://play.google.com/store/apps/details?id=uz.buildex.go',
    qr: '/footer/qr-google-play.webp',
    badge: '/footer/badge-google-play.png'
  },
  {
    name: 'App Store',
    href: 'https://apps.apple.com/uz/app/buildex-go/id6755352149',
    qr: '/footer/qr-app-store.webp',
    badge: '/footer/badge-app-store.png'
  }
];

export const MobileAppLinks = () => {
  const t = useTranslations();
  return (
    <div>
      <div className='border-primary-foreground/60 flex justify-between gap-4 overflow-hidden rounded-3xl border p-4 sm:pb-0'>
        <div>
          <p className='mb-4 max-w-[250px] font-semibold'>
            {t('Point your camera at the QR to download the app')}
          </p>
          <div className='flex shrink-0 gap-3'>
          {STORES.map((store) => (
            <a key={store.name} className='block w-[100px] text-center' href={store.href}>
              <Image
                alt={`${store.name} QR`}
                className='size-[100px] rounded-lg bg-white object-contain'
                height={100}
                src={store.qr}
                width={100}
              />
              <Image
                alt={store.name}
                className='mt-2 h-auto w-[100px]'
                height={30}
                src={store.badge}
                width={100}
              />
            </a>
          ))}
          </div>
        </div>
        {/* Telefon karta ichida, pastki qismi karta chetida kesilgan */}
        <div className='relative -mb-10 hidden aspect-[9/19] w-28 shrink-0 self-end overflow-hidden rounded-t-[26px] border-x-[5px] border-t-[5px] border-neutral-900 bg-neutral-900 sm:block'>
          <div className='absolute top-1.5 left-1/2 z-1 h-3 w-14 -translate-x-1/2 rounded-full bg-neutral-900' />
          <Image
            fill
            alt='Buildex Go'
            className='rounded-t-[22px] object-cover object-top'
            sizes='144px'
            src='/footer/app-screen.webp'
          />
        </div>
      </div>
    </div>
  );
};
