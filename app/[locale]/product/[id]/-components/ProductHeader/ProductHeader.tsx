'use client';

import { useTranslations } from 'next-intl';
import React from 'react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';

import { useProductHeader } from './hooks';

export const ProductHeader = () => {
  const t = useTranslations();
  const { state } = useProductHeader();

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href='/'>{t('Home')}</BreadcrumbLink>
          </BreadcrumbItem>
          {state.product?.breadcrumbs.map((breadcrumb) => (
            <React.Fragment key={breadcrumb.id}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={breadcrumb.url}>{breadcrumb.title}</BreadcrumbLink>
              </BreadcrumbItem>
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className='mt-4 mb-6 text-lg leading-6 font-bold md:text-2xl md:leading-8'>
        {state.product?.name}
      </h1>
    </div>
  );
};
