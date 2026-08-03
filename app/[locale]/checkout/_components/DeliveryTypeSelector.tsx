'use client';

import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { RotateCwIcon, StoreIcon, TruckIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn, formatPrice, limitDecimalPlaces } from '@/lib/utils';
import { useCart } from '@/modules/cart';
import { getCustomerAddresses, postDeliveryCheckPrice } from '@/utils/api/requests';
import { DELIVERY_TYPE, STORE_LOCATION } from '@/utils/constants';
import { useCheckoutStore } from '@/utils/stores';

const PRICE_REFRESH_INTERVAL = 30 * 1000;

const deliveryOptions = [
  {
    value: DELIVERY_TYPE.Delivery,
    icon: TruckIcon,
    titleKey: 'Delivery',
    descKey: 'Delivery by courier'
  },
  {
    value: DELIVERY_TYPE.Pickup,
    icon: StoreIcon,
    titleKey: 'Pickup',
    descKey: 'From the store'
  }
];

const getErrorMessage = (error: unknown) => {
  if (error instanceof AxiosError && typeof error.response?.data?.detail === 'string') {
    return error.response.data.detail;
  }
};

export const DeliveryTypeSelector = () => {
  const t = useTranslations();
  const { availableCartItems } = useCart();
  const { deliveryType, setDeliveryType, setDeliveryPrice } = useCheckoutStore();
  const getAddressesQuery = useQuery({
    queryKey: ['customerAddresses'],
    queryFn: () => getCustomerAddresses()
  });

  const defaultAddress = getAddressesQuery.data?.data.result.find((address) => address.is_default);
  const isDelivery = deliveryType === DELIVERY_TYPE.Delivery;
  const itemsKey = availableCartItems
    .map((item) => `${item.product.id}:${item.quantity}`)
    .join(',');

  const checkPriceQuery = useQuery({
    queryKey: ['deliveryCheckPrice', defaultAddress?.id, itemsKey],
    queryFn: () =>
      postDeliveryCheckPrice({
        data: {
          items: availableCartItems.map((item) => ({
            product_id: item.product.id,
            quantity: item.quantity
          })),
          route_points: [
            STORE_LOCATION,
            {
              id: defaultAddress!.id,
              fullname: defaultAddress!.location_name,
              coordinates: [defaultAddress!.longitude, defaultAddress!.latitude]
            }
          ]
        }
      }),
    enabled: isDelivery && !!defaultAddress && !!availableCartItems.length,
    refetchInterval: (query) => (query.state.data ? PRICE_REFRESH_INTERVAL : false)
  });

  const checkPriceResult = checkPriceQuery.data?.data.result;
  const normalizedPrice = checkPriceResult ? limitDecimalPlaces(checkPriceResult.price) : null;

  React.useEffect(() => {
    setDeliveryPrice(isDelivery ? normalizedPrice : null);
  }, [isDelivery, normalizedPrice, setDeliveryPrice]);

  return (
    <Card variant='outline'>
      <CardHeader>
        <CardTitle className='md:text-xl'>{t('Delivery method')}</CardTitle>
      </CardHeader>
      <CardContent className='space-y-3'>
        <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
          {deliveryOptions.map(({ value, icon: Icon, titleKey, descKey }) => (
            <button
              key={value}
              type='button'
              className={cn(
                'flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 p-6 text-center transition-colors',
                deliveryType === value
                  ? 'border-primary/50 bg-primary/5'
                  : 'border-muted hover:bg-accent/50'
              )}
              onClick={() => setDeliveryType(value)}
            >
              <Icon
                className={cn(
                  'size-8',
                  deliveryType === value ? 'text-primary' : 'text-muted-foreground'
                )}
              />
              <div className='space-y-1'>
                <div className='text-sm font-medium'>{t(titleKey)}</div>
                <div className='text-muted-foreground text-xs'>{t(descKey)}</div>
              </div>
            </button>
          ))}
        </div>

        {isDelivery && (
          <div className='border-muted flex min-h-[64px] items-center rounded-xl border-2 px-4 py-3'>
            {!defaultAddress ? (
              getAddressesQuery.isFetching ? (
                <div className='w-full space-y-2'>
                  <Skeleton className='h-4 w-40' />
                  <Skeleton className='h-4 w-56' />
                </div>
              ) : (
                <p className='text-muted-foreground text-sm'>
                  {t('Select delivery address to calculate the price')}
                </p>
              )
            ) : checkPriceResult ? (
              <div className='w-full space-y-1'>
                <div className='flex items-center justify-between gap-2'>
                  <p className='text-sm'>{t('Delivery price')}</p>
                  <div className='flex items-center gap-2'>
                    <Button
                      className='text-muted-foreground size-8'
                      disabled={checkPriceQuery.isFetching}
                      size='iconSm'
                      variant='ghost'
                      onClick={() => checkPriceQuery.refetch()}
                    >
                      <RotateCwIcon
                        className={cn('size-4', checkPriceQuery.isFetching && 'animate-spin')}
                      />
                    </Button>
                    <p className='text-lg font-bold'>
                      {formatPrice(normalizedPrice ?? 0)} {checkPriceResult.currency_rules.sign}
                    </p>
                  </div>
                </div>
                <p className='text-muted-foreground text-xs'>
                  {t('Order will be delivered within 2 hours')}
                </p>
              </div>
            ) : checkPriceQuery.isError ? (
              <div>
                <p className='text-destructive text-sm font-medium'>{t('Delivery unavailable')}</p>
                <p className='text-muted-foreground text-xs'>
                  {getErrorMessage(checkPriceQuery.error)}
                </p>
              </div>
            ) : (
              <div className='w-full space-y-2'>
                <Skeleton className='h-4 w-32' />
                <Skeleton className='h-4 w-48' />
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
