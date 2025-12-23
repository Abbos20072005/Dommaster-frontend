import type { Metadata } from 'next';

import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import React from 'react';

import { BaseLayout, MobileHeader } from '@/components/layout';
import { Link } from '@/i18n/navigation';
import { getCategories } from '@/utils/api/requests';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    title: t('Catalog')
  };
}

const CategoryPage = async () => {
  const t = await getTranslations();
  const categoriesResponse = await getCategories();
  const categories = categoriesResponse.data.result;

  return (
    <div>
      <MobileHeader />
      <BaseLayout className='mt-2 space-y-4 md:mt-4 md:space-y-8'>
        <h1 className='text-lg leading-8 font-bold md:text-2xl lg:text-3xl'>{t('Catalog')}</h1>
        <div className='grid grid-cols-[repeat(auto-fill,minmax(110px,1fr))] gap-2 md:grid-cols-[repeat(auto-fill,minmax(180px,1fr))] md:gap-4'>
          {categories.map((item) => (
            <Link
              href={`/category/${item.id}`}
              key={item.id}
              className='bg-muted relative aspect-square rounded-md p-2 md:p-3'
            >
              <div className='relative z-1 text-xs [word-break:break-word] md:text-base md:font-bold'>
                {item.name}
              </div>
              <Image
                alt={item.name}
                className='absolute inset-0 size-full rounded-lg object-contain'
                height={80}
                src={item.image}
                width={80}
              />
            </Link>
          ))}
        </div>
      </BaseLayout>
    </div>
  );
};

export default CategoryPage;
