import { useTranslations } from 'next-intl';
import React from 'react';

import { Link } from '@/i18n/navigation';

interface Props {
  properties: Product['properties'];
}

export const ProductProperties = ({ properties }: Props) => {
  const t = useTranslations();

  return (
    <div>
      <p className='mb-8 text-3xl font-bold'>{t('Properties')}</p>
      <ul className='space-y-4 text-sm'>
        {properties.map((item) => (
          <li key={item.title} className='grid grid-cols-2'>
            <div className='after:border-muted-foreground flex h-3.75 flex-1 after:order-1 after:mx-1 after:flex after:flex-1 after:border-b after:border-dashed after:content-[""]'>
              {item.title}
            </div>
            <div className='font-medium'>
              {item.value.map((v, index) => (
                <React.Fragment key={v.title}>
                  {v.link ? (
                    <Link href={v.link} className='text-tertiary'>
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
    </div>
  );
};
