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

import { BranchAddress } from './BranchCard';
import { DeliveryAddress } from './DeliveryCard';

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

// Yetkazib berish usuli + manzil (yoki olib ketish punkti) + narx — bitta ixcham kartada
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
    <Card variant='subtle'>
      <CardHeader className='pb-3'>
        <CardTitle className='md:text-xl'>{t('Delivery method')}</CardTitle>
      </CardHeader>
      <CardContent className='space-y-2'>
        {/* Ixcham almashtirgich: Yetkazib berish | Olib ketish */}
        <div className='bg-background grid grid-cols-2 gap-1 rounded-xl p-1' role='radiogroup'>
          {deliveryOptions.map(({ value, icon: Icon, titleKey, descKey }) => {
            const isSelected = deliveryType === value;
            return (
              <button
                key={value}
                className={cn(
                  'flex cursor-pointer items-center justify-center gap-2 rounded-lg px-3 py-2 text-left transition-colors',
                  isSelected
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-foreground hover:bg-muted'
                )}
                aria-checked={isSelected}
                title={t(descKey)}
                type='button'
                onClick={() => setDeliveryType(value)}
                role='radio'
              >
                <Icon className='size-5 shrink-0' />
                <span className='text-sm font-medium'>{t(titleKey)}</span>
              </button>
            );
          })}
        </div>

        {/* Manzil yoki olib ketish punkti */}
        {isDelivery ? <DeliveryAddress /> : <BranchAddress />}

        {/* Yetkazib berish narxi (manzil tanlangandan keyin) */}
        {isDelivery && defaultAddress && (
          <div className='bg-background flex items-center rounded-xl px-3 py-2.5'>
            {checkPriceResult ? (
              <div className='flex w-full items-center justify-between gap-2'>
                <div className='min-w-0'>
                  <p className='text-sm'>{t('Delivery price')}</p>
                  <p className='text-muted-foreground text-xs'>
                    {t('Order will be delivered within 2 hours')}
                  </p>
                </div>
                <div className='flex shrink-0 items-center gap-1'>
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
                  <p className='font-bold md:text-lg'>
                    {formatPrice(normalizedPrice ?? 0)} {checkPriceResult.currency_rules.sign}
                  </p>
                </div>
              </div>
            ) : checkPriceQuery.isError ? (
              <div>
                <p className='text-destructive text-sm font-medium'>{t('Delivery unavailable')}</p>
                <p className='text-muted-foreground text-xs'>
                  {getErrorMessage(checkPriceQuery.error)}
                </p>
              </div>
            ) : (
              <div className='w-full space-y-1.5'>
                <Skeleton className='h-4 w-32' />
                <Skeleton className='h-3.5 w-48' />
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
