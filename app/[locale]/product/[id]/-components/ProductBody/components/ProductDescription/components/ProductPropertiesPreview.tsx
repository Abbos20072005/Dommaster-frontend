import { useTranslations } from 'next-intl';
import React from 'react';

import { Link, usePathname } from '@/i18n/navigation';

interface Props {
  properties: Product['properties'];
}

export const ProductPropertiesPreview = ({ properties }: Props) => {
  const t = useTranslations();
  const pathname = usePathname();

  return (
    <div>
      <p className='pt-5 pb-4 text-xl font-bold'>{t('Properties')}</p>
      <ul className='mb-4 space-y-4 text-sm'>
        {properties.slice(0, 10).map((item) => (
          <li key={item.title} className='grid grid-cols-2'>
            <div className='after:border-muted-foreground flex h-3.75 flex-1 after:order-1 after:mx-1 after:flex after:flex-1 after:border-b after:border-dashed after:content-[""]'>
              {item.title}
            </div>
            <div className='font-medium'>
              {item.value.map((v, index) => (
                <React.Fragment key={v.title}>
                  {v.link ? (
                    <Link href={v.link} className='text-blue-900'>
                      {v.title}
                    </Link>
                  ) : (
                    <span>{v.title}</span>
                  )}
                  {item.value.length !== index + 1 && ', '}
                </React.Fragment>
              ))}
            </div>
          </li>
        ))}
      </ul>
      <Link
        href={{ pathname, query: { tab: 'properties' } }}
        className='border-b border-dashed border-blue-900 text-sm font-medium text-blue-900'
      >
        Полные характеристики…
      </Link>
    </div>
  );
};
