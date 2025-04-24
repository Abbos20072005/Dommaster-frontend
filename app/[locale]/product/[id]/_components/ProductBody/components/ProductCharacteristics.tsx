import { useTranslations } from 'next-intl';
import React from 'react';

interface Props {
  characteristics: Product['characteristics'];
}

export const ProductCharacteristics = ({ characteristics }: Props) => {
  const t = useTranslations();

  return (
    <div>
      <p className='mb-8 hidden text-3xl font-bold md:block'>{t('Characteristics')}</p>
      <ul className='space-y-4 text-sm'>
        {characteristics.map((item) => (
          <li key={item.title} className='grid grid-cols-2'>
            <div className='after:border-muted-foreground flex h-3.75 flex-1 after:order-1 after:mx-1 after:flex after:flex-1 after:border-b after:border-dashed after:content-[""]'>
              {item.title}
            </div>
            <div className='font-medium'>
              {item.value}
              {item.unit && ` ${item.unit}`}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
