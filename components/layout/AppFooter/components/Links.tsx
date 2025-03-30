import { useTranslations } from 'next-intl';

export const Links = () => {
  const t = useTranslations();

  return (
    <div className='col-span-2 grid grid-cols-2 gap-6 md:gap-9 lg:gap-x-20 xl:gap-x-36'>
      <div className='row-span-2'>
        <p className='mb-3 text-lg font-semibold'>{t('Company')}</p>
        <ul>
          <li>
            <a
              href='#'
              className='hover:text-secondary inline-block text-sm leading-[200%] transition-colors'
            >
              Юридическим лицам
            </a>
          </li>
          <li>
            <a
              href='#'
              className='hover:text-secondary inline-block text-sm leading-[200%] transition-colors'
            >
              О Техномарт
            </a>
          </li>
          <li>
            <a
              href='#'
              className='hover:text-secondary inline-block text-sm leading-[200%] transition-colors'
            >
              Юридическим лицам
            </a>
          </li>
          <li>
            <a
              href='#'
              className='hover:text-secondary inline-block text-sm leading-[200%] transition-colors'
            >
              О Техномарт
            </a>
          </li>
          <li>
            <a
              href='#'
              className='hover:text-secondary inline-block text-sm leading-[200%] transition-colors'
            >
              Юридическим лицам
            </a>
          </li>
          <li>
            <a
              href='#'
              className='hover:text-secondary inline-block text-sm leading-[200%] transition-colors'
            >
              О Техномарт
            </a>
          </li>
          <li>
            <a
              href='#'
              className='hover:text-secondary inline-block text-sm leading-[200%] transition-colors'
            >
              Новости и блоги
            </a>
          </li>
          <li>
            <a
              href='#'
              className='hover:text-secondary inline-block text-sm leading-[200%] transition-colors'
            >
              Проверка IMEI
            </a>
          </li>
        </ul>
      </div>
      <div>
        <p className='text-lg font-semibold'>{t('Company')}</p>
        <ul>
          <li>
            <a
              href='#'
              className='hover:text-secondary inline-block text-sm leading-[200%] transition-colors'
            >
              Юридическим лицам
            </a>
          </li>
          <li>
            <a
              href='#'
              className='hover:text-secondary inline-block text-sm leading-[200%] transition-colors'
            >
              О Техномарт
            </a>
          </li>
          <li>
            <a
              href='#'
              className='hover:text-secondary inline-block text-sm leading-[200%] transition-colors'
            >
              Новости и блоги
            </a>
          </li>
          <li>
            <a
              href='#'
              className='hover:text-secondary inline-block text-sm leading-[200%] transition-colors'
            >
              Проверка IMEI
            </a>
          </li>
        </ul>
      </div>
      <div>
        <p className='text-lg font-semibold'>{t('Company')}</p>
        <ul>
          <li>
            <a
              href='#'
              className='hover:text-secondary inline-block text-sm leading-[200%] transition-colors'
            >
              Юридическим лицам
            </a>
          </li>
          <li>
            <a
              href='#'
              className='hover:text-secondary inline-block text-sm leading-[200%] transition-colors'
            >
              О Техномарт
            </a>
          </li>
          <li>
            <a
              href='#'
              className='hover:text-secondary inline-block text-sm leading-[200%] transition-colors'
            >
              Новости и блоги
            </a>
          </li>
          <li>
            <a
              href='#'
              className='hover:text-secondary inline-block text-sm leading-[200%] transition-colors'
            >
              Проверка IMEI
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
