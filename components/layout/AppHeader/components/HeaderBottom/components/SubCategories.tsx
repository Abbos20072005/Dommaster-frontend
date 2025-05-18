import React from 'react';

import { ItemCategories } from './ItemCategories';

interface Props {
  category: Category;
  onClose: () => void;
}

export const SubCategories = ({ category, onClose }: Props) => {
  return (
    <div className='grid h-fit flex-1 grid-cols-2 grid-rows-1 gap-4 lg:grid-cols-3'>
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className='h-fit space-y-4'>
          {category.sub_categories
            .slice(
              Math.ceil((i * category.sub_categories.length) / 3),
              Math.ceil(((i + 1) * category.sub_categories.length) / 3)
            )
            .map((subCategory) => (
              <ItemCategories
                key={subCategory.id}
                categoryId={category.id}
                onClose={onClose}
                subCategory={subCategory}
              />
            ))}
        </div>
      ))}
    </div>
  );
};
