'use client';

import { useQuery } from '@tanstack/react-query';

import { PromoCard } from '@/app/[locale]/user/promo/components/PromoCard';
import { Spinner } from '@/components/ui/spinner';
import { getPromos } from '@/utils/api/requests';

export const PromoList = () => {
  const getPromosQuery = useQuery({
    queryKey: ['promos'],
    queryFn: () => getPromos()
  });

  const promos = getPromosQuery.data?.data.result;

  if (getPromosQuery.isLoading) {
    return (
      <div className='flex items-center justify-center py-20'>
        <Spinner />
      </div>
    );
  }

  const examplePromo: Promo[] = [
    {
      code: 'SUMMER2023',
      discount: 25,
      end_date: '2025-09-30T23:59:59Z',
      start_date: '2023-06-01T00:00:00Z',
      id: 12345,
      name: 'Summer Sale'
    }
  ];

  return (
    <div className='grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4'>
      {examplePromo.map((promo) => (
        <PromoCard key={promo.id} promo={promo} />
      ))}
    </div>
  );
};
