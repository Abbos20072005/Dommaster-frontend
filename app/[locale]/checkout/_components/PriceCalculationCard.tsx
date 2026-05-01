'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useRouter } from '@/i18n/navigation';
import { formatPrice } from '@/lib/utils';
import { useAuth } from '@/modules/auth';
import { useCart } from '@/modules/cart';
import { getCustomerAddresses, postOrder, postPaymentHold } from '@/utils/api/requests';

import { PromoCodeChecker } from './PromoCodeChecker';

export const PriceCalculationCard = () => {
  const t = useTranslations();
  const { user } = useAuth();
  const { cart, availableCartItems, isSuccess, refetch, isFetching } = useCart();
  const router = useRouter();
  const [promo, setPromo] = React.useState<PromoCodeChecker & { code: string }>();
  const [orderId, setOrderId] = React.useState<number>();

  const getAddressesQuery = useQuery({
    queryKey: ['customerAddresses'],
    queryFn: () => getCustomerAddresses()
  });

  const addresses = getAddressesQuery.data?.data.result;
  const isAddressSelected = !!addresses?.find((item) => item.is_default);

  React.useEffect(() => {
    if (isSuccess && !availableCartItems.length && !orderId) router.push('/cart');
  }, [cart, user]);

  const paymentHoldMutation = useMutation({
    mutationFn: postPaymentHold,
    onSuccess: (_, variables) => {
      router.replace(`/user/orders/active/${variables.data.order_id}`);
    }
  });

  const postOrderMutation = useMutation({
    mutationFn: postOrder,
    onSuccess: async ({ data }) => {
      setOrderId(data.order_id);
      paymentHoldMutation.mutate({ data: { order_id: data.order_id } });
      refetch();
    },
    meta: {
      invalidatesQuery: ['orders']
    }
  });

  const isLoading = isFetching || postOrderMutation.isPending || paymentHoldMutation.isPending;

  const onSubmit = () => {
    if (!user) return;
    postOrderMutation.mutate({
      data: { promocode: promo?.code, is_web: true, payment_type: 1 }
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
              {formatPrice(cart.products_total_price)} {t('sum')}
            </span>
          </div>
        )}
        {!!cart?.saved_price && (
          <div className='align-center flex justify-between gap-1 text-sm'>
            <p>{t('Your benefit')}</p>
            <p className='text-secondary'>
              -{formatPrice(cart.saved_price)} {t('sum')}
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
              -{formatPrice(promo.saved_price)} {t('sum')}
            </p>
          </div>
        )}
        <div className='align-center flex justify-between gap-1 text-xl font-bold'>
          <p>{t('Total')}</p>
          <p>
            {formatPrice(promo?.total_price ?? cart?.total_price ?? 0)} {t('sum')}
          </p>
        </div>
        <Button
          disabled={
            !cart?.cart_items.length ||
            isLoading ||
            !isAddressSelected
          }
          className='mb-0 w-full'
          isLoading={isLoading}
          onClick={onSubmit}
        >
          {t('Confirm')}
        </Button>
        <Separator className='my-4' />
        <PromoCodeChecker value={promo} onSuccess={setPromo} />
      </CardContent>
    </Card>
  );
};
