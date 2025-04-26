import React from 'react';

import { Link } from '@/i18n/navigation';

interface Props {
  category: Category;
}

export const SubCategories = ({ category }: Props) => {
  return category.sub_categories.map((subCategory) => (
    <div key={subCategory.id} className='space-y-2'>
      <Link
        href={`/category/${category.id}/${subCategory.id}`}
        className='hover:text-secondary mb-3 inline-block font-bold transition-colors'
      >
        {subCategory.name}
      </Link>
      {subCategory.product_item_categories.map((itemCategory) => (
        <div key={itemCategory.id}>
          <Link
            href={`/category/${category.id}/${subCategory.id}/${itemCategory.id}`}
            className='text-sm text-nowrap'
          >
            <span className='hover:text-secondary transition-colors'>{itemCategory.name}</span>
            <span className='text-muted-foreground ml-1'>({itemCategory.product_quantity})</span>
          </Link>
        </div>
      ))}
    </div>
  ));
};
