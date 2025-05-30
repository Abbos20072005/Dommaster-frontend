'use client';

import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { ArrowLeftIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

import { OrderProducts } from '@/app/[locale]/user/orders/history/[id]/_components/OrderProducts';
import { AuthWrapper } from '@/components/modules/auth';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { Link } from '@/i18n/navigation';
import { cn, formatPhoneNumber, formatPrice } from '@/lib/utils';
import { getOrderById } from '@/utils/api/requests';
import { orderStatusColorMap, orderStatusMap } from '@/utils/constants/orderStatus';
import { useAuth } from '@/utils/stores';

const OrderPage = () => {
  const t = useTranslations();
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const getOrderIdQuery = useQuery({
    queryKey: ['ordersHistory', id],
    queryFn: () => getOrderById({ id: +id })
  });

  const order = getOrderIdQuery.data?.data.result;

  if (getOrderIdQuery.isLoading) {
    return (
      <div className='flex justify-center py-20'>
        <Spinner />
      </div>
    );
  }

  if (!order) return null;

  return (
    <AuthWrapper>
      <div className='flex items-center border-b md:hidden'>
        <Button asChild className='size-13' size='icon' variant='ghost'>
          <Link href='/user/orders/history'>
            <ArrowLeftIcon className='text-muted-foreground size-5' />
          </Link>
        </Button>
        <div className='flex-1 text-center'>
          <h1 className='text-center font-bold md:hidden'>
            {t('Order')} #{order.id}
          </h1>
          <CardDescription className='text-xs'>
            {format(order.created_at, 'dd MMM')}
          </CardDescription>
        </div>
        <div className='size-13' />
      </div>
      <div className='flex flex-col items-start divide-y md:gap-4 md:divide-y-0 lg:flex-row'>
        <div className='flex flex-1 flex-col divide-y md:gap-4 md:divide-y-0'>
          <Card className='rounded-none p-4 shadow-none md:rounded-md md:p-5 md:shadow-sm'>
            <div className='-ml-3 hidden gap-2 md:flex'>
              <Button asChild size='sm' variant='ghost'>
                <Link href='/user/orders/history'>
                  <ArrowLeftIcon className='text-muted-foreground size-5' />
                  {t('Back to orders')}
                </Link>
              </Button>
            </div>
            <div className='hidden md:block'>
              <h1 className='text-2xl font-bold'>
                {t('Order')} #{order.id}
              </h1>
              <CardDescription>{format(order.created_at, 'dd MMM')}</CardDescription>
            </div>
            <div className='md:mt-4'>
              <div className='text-sm font-bold'>{t('Order address')}:</div>
              <div className='text-sm font-medium'>{order.order_location?.name}</div>
              <p className='text-muted-foreground text-sm'>{order.order_location?.location_name}</p>
            </div>
            {user && (
              <div className='mt-4'>
                <div className='text-sm font-bold'>{t('Recipient')}:</div>
                <div className='flex flex-wrap space-x-2 text-sm'>
                  <span>{user?.full_name}</span>
                  <span className='text-muted-foreground'>
                    {formatPhoneNumber(user?.phone_number)}
                  </span>
                </div>
              </div>
            )}
          </Card>
          <Card className='px-4 shadow-none md:shadow-sm'>
            <OrderProducts order={order} />
          </Card>
        </div>
        <Card className='w-full shadow-none md:shadow-sm lg:w-68 lg:min-w-68'>
          <CardHeader className='flex-row items-center justify-between'>
            <CardTitle>{t('Order status')}</CardTitle>
            <Badge className={cn(orderStatusColorMap[order.status])} variant='outline'>
              {t(orderStatusMap[order.status])}
            </Badge>
          </CardHeader>
          <CardContent className='space-y-2'>
            <div className='mb-4'>
              <p className='text-xl font-bold'>
                {formatPrice(order.total_price)} {t('sum')}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AuthWrapper>
  );
};

export default OrderPage;
