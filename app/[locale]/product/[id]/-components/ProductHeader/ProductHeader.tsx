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
          {product?.breadcrumbs?.map((breadcrumb) => (
            <React.Fragment key={breadcrumb.id}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={breadcrumb.url}>{breadcrumb.title}</BreadcrumbLink>
              </BreadcrumbItem>
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className='mt-4 mb-6 hidden text-lg leading-6 font-bold md:block md:text-2xl md:leading-8'>
        {product?.name}
      </h1>
    </div>
  );
};
