import React from 'react';

import { Link } from '@/i18n/navigation';

import { CatalogChild } from './CatalogChild';

interface Props {
  subCategory: Category;
}

export const SubCategories = ({ subCategory }: Props) => {
  return (
    <div className='bg-background grow overflow-y-auto border-l p-6'>
      <Link href={`/category/${subCategory.id}`}>
        <p className='hover:text-secondary mb-6 text-xl font-bold transition-colors'>
          {subCategory.title}
        </p>
      </Link>

      <div className='grid grid-cols-2 grid-rows-1 gap-4 lg:grid-cols-3'>
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className='space-y-4'>
            {subCategory.children
              .slice(
                Math.ceil((i * subCategory.children.length) / 3),
                Math.ceil(((i + 1) * subCategory.children.length) / 3)
              )
              .map((child) => (
                <CatalogChild key={child.id} item={child} />
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};
