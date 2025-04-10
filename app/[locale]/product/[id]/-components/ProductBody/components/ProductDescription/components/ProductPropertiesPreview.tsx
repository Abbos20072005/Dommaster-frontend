import { useQueryState } from 'nuqs';
import React from 'react';

import { Link } from '@/i18n/navigation';

interface Props {
  properties: Product['properties'];
}

export const ProductPropertiesPreview = ({ properties }: Props) => {
  const [_, setTab] = useQueryState('tab', { defaultValue: 'description' });

  return (
    <div>
      <ul className='mb-4 space-y-2 text-sm'>
        {properties.slice(0, 10).map((item) => (
          <li key={item.title}>
            <span className='text-muted-foreground'>{item.title}: </span>
            <span className='text-foreground/80 font-medium'>
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
            </span>
          </li>
        ))}
      </ul>
      <button
        className='border-tertiary text-tertiary border-b border-dashed text-sm font-medium'
        onClick={() => setTab('properties')}
      >
        Полные характеристики…
      </button>
    </div>
  );
};
