'use client';

import { useParams } from 'next/navigation';

import { productIdFromParam } from '@/lib/urls';

/** The id of the open product: the address of the page is `/product/{slug}-{id}`. */
export const useProductId = () => {
  const { id } = useParams<{ id: string }>();
  return productIdFromParam(id) ?? id;
};
