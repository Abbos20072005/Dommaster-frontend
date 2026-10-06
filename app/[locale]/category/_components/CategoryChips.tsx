import React from 'react';

import { Link } from '@/i18n/navigation';

interface Props {
  items: { id: number; name: string }[];
  hrefOf: (id: number) => string;
}

/** Sub-categories as quick links above the product list. */
export const CategoryChips = ({ items, hrefOf }: Props) => {
  if (!items.length) return null;

  return (
    <nav className='flex flex-wrap gap-2'>
      {items.map((item) => (
        <Link
          href={hrefOf(item.id)}
          key={item.id}
          className='bg-muted hover:bg-muted/60 rounded-full px-3 py-1.5 text-xs font-medium transition-colors md:text-sm'
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
};
