import { useTranslations } from 'next-intl';
import React from 'react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';

interface Props {
  product: Product;
}

export const ProductHeader = ({ product }: Props) => {
  const t = useTranslations();

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href='/'>{t('Home')}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/category/${product.breadcrumbs[0].id}`}>
              {product.breadcrumbs[0].name}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink
              href={`/category/${product.breadcrumbs[0].id}/${product.breadcrumbs[1].id}`}
            >
              {product.breadcrumbs[1].name}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink
              href={`/category/${product.breadcrumbs[0].id}/${product.breadcrumbs[1].id}/${product.breadcrumbs[2].id}`}
            >
              {product.breadcrumbs[2].name}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className='my-4 text-lg leading-6 font-bold md:mb-6 md:text-2xl md:leading-8'>
        {product?.name}
      </h1>
    </div>
  );
};
