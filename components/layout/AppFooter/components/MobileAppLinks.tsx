import React from 'react';

export const MobileAppLinks = () => {
  return (
    <div>
      <div className='border-primary-foreground/60 w-[330px] rounded-3xl border px-6 pt-6'>
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
          <img
            alt='QR'
            className='block size-[145px]'
            src='https://media.obi.ru/media/wysiwyg/footer-app/qr.png'
          />
          <div className='shrink-0 space-y-2'>
            <a href='#' className='block'>
              <img
                alt='App Store'
                className='h-[35px] w-[110px]'
                src='https://media.obi.ru/media/wysiwyg/footer-app/google-play.png'
              />
            </a>
            <a href='#' className='block'>
              <img
                alt='App Store'
                className='h-[35px] w-[110px]'
                src='https://media.obi.ru/media/wysiwyg/footer-app/appstore.png'
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
