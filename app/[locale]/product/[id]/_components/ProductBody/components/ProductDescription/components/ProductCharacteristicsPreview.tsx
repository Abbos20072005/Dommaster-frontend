import { useQueryState } from 'nuqs';
import React from 'react';

interface Props {
  characteristics: Product['characteristics'];
}

export const ProductCharacteristicsPreview = ({ characteristics }: Props) => {
  const [_, setTab] = useQueryState('tab', { defaultValue: 'description' });

  return (
    <div>
      <ul className='mb-4 space-y-2 text-sm'>
        {characteristics?.slice(0, 10).map((item) => (
          <li key={item.title}>
            <span className='text-muted-foreground'>{item.title}: </span>
            <span className='text-foreground/80 font-medium'>
              {item.value}
              {item.unit && ` ${item.unit}`}
            </span>
          </li>
        ))}
      </ul>
      <button
        className='border-tertiary text-tertiary border-b border-dashed text-sm font-medium'
        onClick={() => setTab('characteristics')}
      >
        Полные характеристики…
      </button>
    </div>
  );
};
