import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';

export const MobileAppLinks = () => {
  const t = useTranslations();
  return (
    <div>
      <div className='border-primary-foreground/60 max-w-[330px] rounded-3xl border p-4 md:w-[330px] md:px-6 md:pt-6'>
        <p className='mb-5 max-w-[250px] font-semibold'>
          {t('Order in the new app and get bonuses')}
        </p>
        <p className='text-primary-foreground/60 hidden max-w-[250px] text-xs md:block'>
          {t('Point your camera at the QR to download the app')}.
        </p>
        <div className='mt-4 flex justify-between'>
          <Image
            alt='QR'
            className='hidden size-[145px] md:block'
            height={145}
            src='https://media.obi.ru/media/wysiwyg/footer-app/qr.png'
            width={145}
          />
          <div className='flex shrink-0 gap-2 md:flex-col'>
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
      </div>
    </div>
  );
};
