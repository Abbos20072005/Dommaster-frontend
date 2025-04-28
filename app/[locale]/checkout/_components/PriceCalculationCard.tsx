'use client';

import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import React from 'react';

import { PromoCodeChecker } from '@/app/[locale]/checkout/_components/PromoCodeChecker';
import { useCart } from '@/components/modules/cart';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Spinner } from '@/components/ui/spinner';
import { useRouter } from '@/i18n/navigation';
import { formatPrice } from '@/lib/utils';
import { postOrder } from '@/utils/api/requests';
import { useAuth } from '@/utils/stores';

export const PriceCalculationCard = () => {
  const t = useTranslations();
  const { user } = useAuth();
  const { cart, availableCartItems, isSuccess, isFetching } = useCart();
  const router = useRouter();
  const [promo, setPromo] = React.useState<PromoCodeChecker & { code: string }>({
    code: 'SALOM',
    discount: 20,
    discount_price: 10000,
    total_price: 100000
  });

  React.useEffect(() => {
    if (isSuccess && !availableCartItems.length) router.push('/cart');
  }, [cart, user]);

  const postOrderMutation = useMutation({
    mutationFn: postOrder
  });

  const onSubmit = () => {
    if (!user) return;
    postOrderMutation.mutate({ data: { promocode: promo.code } });
  };

  return (
    <Card className='sticky top-20' variant='outline'>
      <CardHeader className='p-4'>
        <CardTitle>{t('Your order')}</CardTitle>
      </CardHeader>
      <CardContent className='space-y-2 p-4 pt-0'>
        {!!cart?.cart_items.length && (
          <div className='align-center flex justify-between gap-1 text-sm'>
            <p>
              {t('Goods')} ({cart?.cart_items.length}):
            </p>
            <span>
              {formatPrice(cart.products_total_price)} {t('som')}
            </span>
          </div>
        )}
        {!!cart?.saved_price && (
          <div className='align-center flex justify-between gap-1 text-sm'>
            <p>{t('Your benefit')}</p>
            <p className='text-secondary'>
              -{formatPrice(cart.saved_price)} {t('som')}
            </p>
          </div>
        )}
        {!!promo && (
          <div className='align-center flex justify-between gap-1 text-sm'>
            <div className='flex items-center gap-1'>
              <span className='font-bold'>{promo.code}</span>
              <Badge variant='secondary'>-{promo.discount}%</Badge>
            </div>
            <p className='text-secondary'>
              -{formatPrice(promo.discount_price)} {t('som')}
            </p>
          </div>
        )}
        <div className='align-center flex justify-between gap-1 text-xl font-bold'>
          <p>{t('Total')}</p>
          <p>
            {formatPrice(promo?.total_price ?? cart?.total_price ?? 0)} {t('som')}
          </p>
        </div>
        <Button
          className='mb-0 w-full'
          disabled={!cart?.cart_items.length || isFetching}
          onClick={onSubmit}
        >
          {isFetching ? <Spinner /> : t('Pay')}
        </Button>
        <Separator className='my-4' />
        <PromoCodeChecker value={promo} onSuccess={setPromo} />
      </CardContent>
    </Card>
  );
};
