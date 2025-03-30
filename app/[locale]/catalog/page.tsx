import { BuildingIcon } from 'lucide-react';
import React from 'react';

import { BaseLayout } from '@/components/layout';
import { catalogData } from '@/fake-data/catalog';
import { Link } from '@/i18n/navigation';

const CatalogPage = () => {
  return (
    <BaseLayout>
      <h1 className='mb-10 text-2xl leading-8 font-bold lg:text-3xl'>
        Каталог товаров Dommaster в Ташкенте
      </h1>
      <div className='grid grid-cols-3 gap-x-6 gap-y-12'>
        {catalogData.map((item) => (
          <div key={item.id}>
            <div>
              <BuildingIcon className='size-10' />
            </div>
            <Link href={`/catalog/${item.id}`}>
              <p className='hover:text-secondary mt-4 mb-3 w-fit text-xl font-bold transition-colors'>
                {item.title}
              </p>
            </Link>
            <ul className='space-y-2'>
              {item.children.map((child) => (
                <li key={child.id}>
                  <Link href={`/catalog/${child.id}`}>
                    <p className='hover:text-secondary text-muted-foreground w-fit text-sm transition-colors'>
                      {child.title}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </BaseLayout>
  );
};

export default CatalogPage;
