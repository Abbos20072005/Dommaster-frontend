import React from 'react';

interface Props {
  characteristics: Product['characteristics'];
}

export const ProductCharacteristics = ({ characteristics }: Props) => (
  <ul className='grid gap-x-10 gap-y-3 text-sm md:grid-cols-2'>
    {characteristics.map((item) => (
      <li key={item.name} className='grid grid-cols-2 gap-4 border-b py-2'>
        <div className='text-muted-foreground'>{item.name}</div>
        <div className='font-medium'>
          {item.value}
          {item.unit && ` ${item.unit}`}
        </div>
      </li>
    ))}
  </ul>
);
