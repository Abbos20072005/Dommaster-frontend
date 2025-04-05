import Image from 'next/image';
import React from 'react';

export const MobileAppLinks = () => {
  return (
    <div>
      <div className='border-primary-foreground/60 max-w-[330px] rounded-3xl border px-6 pt-6 md:w-[330px]'>
        <p className='mb-5 font-semibold'>
          Заказывайте в новом
          <br />
          приложении и получайте
          <br />
          бонусы
        </p>
        <p className='text-primary-foreground/60 text-xs'>
          Наведите камеру на QR,
          <br /> чтобы скачать приложение.
        </p>
        <div className='mt-4 flex justify-between'>
          <Image
            alt='QR'
            className='hidden size-[145px] md:block'
            height={145}
            src='https://media.obi.ru/media/wysiwyg/footer-app/qr.png'
            width={145}
          />
          <div className='mb-4 flex shrink-0 gap-2 md:flex-col'>
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
