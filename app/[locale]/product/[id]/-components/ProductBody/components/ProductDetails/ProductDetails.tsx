import React from 'react';

interface Props {
  extendedDescription: Product['extended_description'];
}

export const ProductDetails = ({ extendedDescription }: Props) => {
  if (!extendedDescription) return null;

  return (
    <div>
      {extendedDescription.description && <p>{extendedDescription.description}</p>}
      {extendedDescription.properties.slice(0, 10).map((item) => (
        <div key={item.key}>
          <p className='mt-6 mb-1.5 font-bold'>{item.key}</p>
          {item.value && <p className='text-sm'>{item.value}</p>}
          <ul className='space-y-2 text-sm'>
            {item.values.map((value) => (
              <li
                key={value}
                className='before:bg-foreground/80 relative pl-4 before:absolute before:top-[11px] before:left-0 before:h-0.5 before:w-2 before:content-[""]'
              >
                {value}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
