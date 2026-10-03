import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';

const STORES = [
  {
    name: 'Google Play',
    href: 'https://play.google.com/store/apps/details?id=uz.buildex.go',
    qr: '/footer/qr-google-play.webp'
  },
  {
    name: 'App Store',
    href: 'https://apps.apple.com/uz/app/buildex-go/id6755352149',
    qr: '/footer/qr-app-store.webp'
  }
];

export const MobileAppLinks = () => {
  const t = useTranslations();
  return (
    <div>
      <div className='border-primary-foreground/60 flex justify-between rounded-3xl border p-4 sm:pb-0'>
        <div className='mt-3'>
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
                <span className='mt-1 block text-xs font-medium'>{store.name}</span>
              </a>
            ))}
          </div>
        </div>
        <Image
          alt='QR'
          className='hidden size-[145px] object-contain sm:block'
          height={145}
          src='/footer/qr-code.png'
          width={145}
        />
      </div>
    </div>
  );
};
