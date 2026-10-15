'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import React from 'react';

import { trackViewItem } from '@/lib/analytics';
import { getAuthorizedProductById } from '@/utils/api/requests';

/** `view_item`: once for every opened product (the same query as the page header). */
export const ProductViewTracker = () => {
  const { id } = useParams<{ id: string }>();
  const product = useQuery({
    queryKey: ['product', id],
    staleTime: 0,
    queryFn: () => getAuthorizedProductById({ id })
  }).data?.data.result;
  const sentFor = React.useRef<number | undefined>(undefined);

  React.useEffect(() => {
    if (!product || sentFor.current === product.id) return;
    sentFor.current = product.id;
    trackViewItem(product);
  }, [product]);

  return null;
};
