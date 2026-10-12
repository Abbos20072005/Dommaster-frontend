'use client';

import { useQuery } from '@tanstack/react-query';
import { notFound, useParams } from 'next/navigation';

import { ProductList, ProductListSkeleton } from '@/modules/product';
import { getMain } from '@/utils/api/requests';

/** Every product of one home page carousel (an "adds brands" block): the same request as the home. */
export const CollectionList = () => {
  const { id } = useParams<{ id: string }>();
  const query = useQuery({
    queryKey: ['main'],
    queryFn: () => getMain()
  });

  if (query.isLoading) return <ProductListSkeleton view='grid' />;

  const block = (query.data?.data.result ?? []).find(
    (item) => item.type === 'addsbrands' && String(item.data.id) === id
  );
  if (!block || block.type !== 'addsbrands') return notFound();

  return (
    <section className='space-y-4'>
      <h1 className='text-lg font-bold md:text-2xl lg:text-3xl'>{block.data.name}</h1>
      <ProductList view='grid' products={block.data.products} />
    </section>
  );
};
