import type { Metadata } from 'next';

import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import React from 'react';

import { BaseLayout } from '@/components/layout';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { catalogData } from '@/fake-data/catalog';
import { Link } from '@/i18n/navigation';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const catalog = catalogData.find((item) => item.id === +id);

  return {
    title: catalog?.title,
    description:
      'в Санкт-Петербурге — покупайте ✅ в интернет-магазине Петрович. 🚚 Доставка за 2 часа или бесплатно на авто до 10 тонн. 👍 Возврат неиспользованного товара в течение 360 дней. Звоните круглосуточно: ☎️ +7(812)334-88-88. Качество по ISO 9001:2000.'
  };
}

const CatalogPage = async ({ params }: Props) => {
  const { id } = await params;
  const t = await getTranslations();

  const catalog = catalogData.find((item) => item.id === +id);

  if (!catalog) return notFound();

  return (
    <BaseLayout>
      <h1 className='mb-10 text-2xl leading-8 font-bold lg:text-3xl'>{catalog.title}</h1>
      <div className='flex gap-6'>
        <aside className='w-52'>
          <ul className='space-y-3'>
            {catalog.children.map((item) => (
              <li key={item.id}>
                <Link href={`/catalog/${item.id}`}>
                  <p className='hover:text-secondary text-muted-foreground w-fit text-sm transition-colors'>
                    {item.title}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </aside>
        <div className='flex-1'>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href='/'>{t('Home')}</BreadcrumbLink>
              </BreadcrumbItem>
              {catalog.breadcrumbs?.map((breadcrumb) => (
                <React.Fragment key={breadcrumb.id}>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href={breadcrumb.url}>{breadcrumb.title}</BreadcrumbLink>
                  </BreadcrumbItem>
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
          <div className='mt-6 grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4'>
            {catalog.children.map((item) => (
              <div key={item.id}>
                <Link href={`/catalog/${item.id}`}>
                  <div>
                    <Image
                      alt={item.title}
                      className='mx-auto size-[90px]'
                      height={90}
                      src='https://cs.p-static.ru/image/30076196/original-150x150-fit.jpg'
                      width={90}
                    />
                  </div>
                  <p className='pt-3 text-center text-sm'>{item.title}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default CatalogPage;
