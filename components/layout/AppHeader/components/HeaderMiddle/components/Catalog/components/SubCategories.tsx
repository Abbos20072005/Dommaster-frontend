import React from 'react';

import { Link } from '@/i18n/navigation';

import { ItemCategories } from './ItemCategories';

interface Props {
  category: Category;
}

export const SubCategories = ({ category }: Props) => {
  return (
    <div className='bg-background grow overflow-y-auto border-l p-6'>
      <Link
        href={`/category/${category.id}`}
        className='hover:text-secondary mb-6 inline-block text-xl font-bold transition-colors'
      >
        {category.name}
      </Link>

      <div className='grid grid-cols-2 grid-rows-1 gap-4 lg:grid-cols-3'>
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className='space-y-4'>
            {category.sub_categories
              .slice(
                Math.ceil((i * category.sub_categories.length) / 3),
                Math.ceil(((i + 1) * category.sub_categories.length) / 3)
              )
              .map((subCategory) => (
                <ItemCategories
                  key={subCategory.id}
                  categoryId={category.id}
                  subCategory={subCategory}
                />
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};
