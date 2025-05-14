'use client';

import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

import { PromoCard } from '@/app/[locale]/user/promo/components/PromoCard';
import { Spinner } from '@/components/ui/spinner';
import { getPromos } from '@/utils/api/requests';

export const PromoList = () => {
  const t = useTranslations();
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

  if (!promos?.length) {
    return (
      <div className='flex items-center justify-center py-20'>
        <p className='text-muted-foreground text-sm'>{t('There are no promos yet')}</p>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4'>
      {promos.map((promo) => (
        <PromoCard key={promo.id} promo={promo} />
      ))}
    </div>
  );
};
