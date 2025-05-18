import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';

export const Links = () => {
  const t = useTranslations();

  return (
    <div className='flex gap-6 md:gap-9 lg:gap-8 xl:gap-x-20'>
      <div>
        <p className='mb-3 text-lg font-semibold'>{t('About us')}</p>
        <ul>
          <li>
            <Link
              href='/about'
              className='hover:text-secondary inline-block text-sm leading-[200%] transition-colors'
            >
              {t('About company')}
            </Link>
          </li>
          <li>
            <Link
              href='/requisites'
              className='hover:text-secondary inline-block text-sm leading-[200%] transition-colors'
            >
              {t('Requisites')}
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <p className='mb-3 text-lg font-semibold'>{t('Delivery and lifting')}</p>
        <ul>
          <li>
            <a
              href='/courier-delivery'
              className='hover:text-secondary inline-block text-sm leading-[200%] transition-colors'
            >
              {t('Delivery by courier')}
            </a>
          </li>
          <li>
            <Link
              href='/payment-methods'
              className='hover:text-secondary inline-block text-sm leading-[200%] transition-colors'
            >
              {t('Payment methods')}
            </Link>
          </li>
          <li>
            <button className='hover:text-secondary inline-block text-sm leading-[200%] transition-colors'>
              {t('Check order status')}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};
