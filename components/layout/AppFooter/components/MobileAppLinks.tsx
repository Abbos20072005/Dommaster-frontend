import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';

export const MobileAppLinks = () => {
  const t = useTranslations();
  return (
    <div>
      <div className='border-primary-foreground/60 flex justify-between rounded-3xl border p-4 sm:pb-0'>
        <div className='mt-3'>
          <p className='mb-5 max-w-[250px] font-semibold'>
            {t('Point your camera at the QR to download the app')}
          </p>
          <div className='flex shrink-0 gap-2'>
            <a href='#' className='block'>
              <Image
                alt='App Store'
                className='h-[35px] w-[110px]'
                height={35}
                src='https://media.obi.ru/media/wysiwyg/footer-app/google-play.png'
                width={110}
              />
            </a>
            <a href='#' className='block'>
              <Image
                alt='App Store'
                className='h-[35px] w-[110px]'
                height={35}
                src='https://media.obi.ru/media/wysiwyg/footer-app/appstore.png'
                width={110}
              />
            </a>
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
