'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { ArrowUpRightIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { parseAsInteger, useQueryState } from 'nuqs';
import React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Link, useRouter } from '@/i18n/navigation';
import { formatPrice } from '@/lib/utils';
import { useAuth } from '@/modules/auth';
import { useCart } from '@/modules/cart';
import { getCustomerAddresses, postOrder } from '@/utils/api/requests';

import { PromoCodeChecker } from './PromoCodeChecker';

export const PriceCalculationCard = () => {
  const t = useTranslations();
  const [paymentMethod] = useQueryState('payment_method', parseAsInteger.withDefault(1));
  const { user } = useAuth();
  const { cart, availableCartItems, isSuccess, refetch, isFetching } = useCart();
  const router = useRouter();
  const [promo, setPromo] = React.useState<PromoCodeChecker & { code: string }>();
  const [paymentLink, setPaymentLink] = React.useState<string>();
  const [orderId, setOrderId] = React.useState<number>();
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const getAddressesQuery = useQuery({
    queryKey: ['customerAddresses'],
    queryFn: () => getCustomerAddresses()
  });

  const addresses = getAddressesQuery.data?.data.result;
  const isAddressSelected = !!addresses?.find((item) => item.is_default);

  React.useEffect(() => {
    if (isSuccess && !availableCartItems.length && !orderId) router.push('/cart');
  }, [cart, user]);

  const postOrderMutation = useMutation({
    mutationFn: postOrder,
    onSuccess: async ({ data }) => {
      setOrderId(data.order_id);
      if (data.result) {
        setPaymentLink(data.result);
        const win = window.open(data.result, '_blank', 'noopener,noreferrer');
        if (win) {
          router.replace(`/user/orders/active/${data.order_id}`);
        } else {
          setDialogOpen(true);
        }
      } else {
        router.replace(`/user/orders/active/${data.order_id}`);
      }
      refetch();
    },
    meta: {
      invalidatesQuery: ['orders']
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
            isFetching ||
            postOrderMutation.isPending ||
            !isAddressSelected
          }
          className='mb-0 w-full'
          isLoading={isFetching || postOrderMutation.isPending}
          onClick={onSubmit}
        >
          {t('Pay')}
        </Button>
        <Separator className='my-4' />
        <PromoCodeChecker value={promo} onSuccess={setPromo} />
      </CardContent>
      <Dialog
        onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open && orderId) {
            router.replace(`/user/orders/active/${orderId}`);
          }
        }}
        open={dialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('Order created')}</DialogTitle>
            <DialogDescription>
              {t('Your order has been created, please proceed to payment')}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant='outline'>{orderId ? t('View order') : t('Close')}</Button>
            </DialogClose>
            {paymentLink && (
              <Button asChild>
                <Link href={paymentLink}>
                  {t('Proceed to payment')}
                  <ArrowUpRightIcon />
                </Link>
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};
