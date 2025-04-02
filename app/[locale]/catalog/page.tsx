import { BuildingIcon } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

import { BaseLayout } from '@/components/layout';
import { catalogData } from '@/fake-data/catalog';
import { Link } from '@/i18n/navigation';

const CatalogPage = () => {
  return (
    <BaseLayout>
      <h1 className='mb-10 hidden text-2xl leading-8 font-bold md:block lg:text-3xl'>
        Каталог товаров Dommaster в Ташкенте
      </h1>
      <div className='hidden grid-cols-3 gap-x-6 gap-y-12 md:grid'>
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
      <div className='grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-2 sm:gap-4 md:hidden'>
        {catalogData.map((item) => (
          <Link
            href={`/catalog/${item.id}`}
            key={item.id}
            className='relative block h-32 rounded-md p-4'
          >
            <p className='text-sm font-medium'>{item.title}</p>
            <Image
              alt={item.title}
              className='absolute inset-0 z-[-1] size-full rounded-md object-cover'
              height={150}
              src='https://mini-io-api.texnomart.uz/catalog/special-category/7/74a09808-7198-496a-b704-158399923abd.png'
              width={150}
            />
          </Link>
        ))}
      </div>
    </BaseLayout>
  );
};

export default CatalogPage;
