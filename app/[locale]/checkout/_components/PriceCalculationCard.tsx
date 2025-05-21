'use client';

import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { parseAsInteger, useQueryState } from 'nuqs';
import React from 'react';

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

import { PromoCodeChecker } from './PromoCodeChecker';

export const PriceCalculationCard = () => {
  const t = useTranslations();
  const [paymentMethod] = useQueryState('payment_method', parseAsInteger.withDefault(1));
  const { user } = useAuth();
  const { cart, availableCartItems, isSuccess, isFetching } = useCart();
  const router = useRouter();
  const [promo, setPromo] = React.useState<PromoCodeChecker & { code: string }>();

  React.useEffect(() => {
    if (isSuccess && !availableCartItems.length) router.push('/cart');
  }, [cart, user]);

  const postOrderMutation = useMutation({
    mutationFn: postOrder,
    onSuccess: ({ data }) => {
      window.location.replace(data.result);
    }
  });

  const onSubmit = () => {
    if (!user) return;
    postOrderMutation.mutate({
      data: { promocode: promo?.code, is_web: true, payment_type: paymentMethod }
    });
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
              <span className='font-bold uppercase'>{promo.code}</span>
              <Badge variant='secondary'>-{promo.discount_precent}%</Badge>
            </div>
            <p className='text-secondary'>
              -{formatPrice(promo.saved_price)} {t('som')}
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
          disabled={!cart?.cart_items.length || isFetching || postOrderMutation.isPending}
          onClick={onSubmit}
        >
          {isFetching || postOrderMutation.isPending ? <Spinner /> : t('Pay')}
        </Button>
        <Separator className='my-4' />
        <PromoCodeChecker value={promo} onSuccess={setPromo} />
      </CardContent>
    </Card>
  );
};
