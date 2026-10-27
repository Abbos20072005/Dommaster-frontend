'use client';

import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import React from 'react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { Skeleton } from '@/components/ui/skeleton';
import { useProductId } from '@/hooks';
import { categoryHref } from '@/lib/urls';
import { getAuthorizedProductById } from '@/utils/api/requests';

export const ProductHeader = () => {
  const t = useTranslations();
  const id = useProductId();

  const getProductByIdQuery = useQuery({
    queryKey: ['product', id],
    staleTime: 0,
    queryFn: () => getAuthorizedProductById({ id })
  });

  if (getProductByIdQuery.isLoading)
    return (
      <>
        <div className='flex flex-wrap gap-2 pt-1 pb-2'>
          <Skeleton className='h-5 w-16' />
          <Skeleton className='h-5 w-40' />
          <Skeleton className='h-5 w-40' />
          <Skeleton className='h-5 w-40' />
        </div>
      </>
    );

  const product = getProductByIdQuery.data?.data.result;

  if (!product) return null;

  return (
    <div className='mb-4 md:mb-5'>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href='/'>{t('Home')}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={categoryHref(product.breadcrumbs[0])}>
              {product.breadcrumbs[0].name}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={categoryHref(product.breadcrumbs[0], product.breadcrumbs[1])}>
              {product.breadcrumbs[1].name}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink
              href={categoryHref(
                product.breadcrumbs[0],
                product.breadcrumbs[1],
                product.breadcrumbs[2]
              )}
            >
              {product.breadcrumbs[2].name}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};
