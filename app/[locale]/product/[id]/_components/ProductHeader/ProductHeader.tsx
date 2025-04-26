'use client';

import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import React from 'react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { Skeleton } from '@/components/ui/skeleton';
import { getProductById } from '@/utils/api/requests';

export const ProductHeader = () => {
  const t = useTranslations();
  const { id } = useParams<{ id: string }>();

  const getProductByIdQuery = useQuery({
    queryKey: ['product', id],
    staleTime: 0,
    queryFn: () => getProductById({ id })
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
        <Skeleton className='my-4 h-8 w-3/4 md:mb-6' />
      </>
    );

  const product = getProductByIdQuery.data?.data.result;

  if (!product) return null;

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
