import { format } from 'date-fns';
import { ArrowLeftIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { OrderProducts } from '@/app/[locale]/user/orders/active/[id]/_components/OrderProducts';
import { AuthWrapper } from '@/components/modules/auth';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardDescription } from '@/components/ui/card';
import { Link } from '@/i18n/navigation';
import { formatPrice } from '@/lib/utils';
import { getOrderById } from '@/utils/api/requests';
import { orderStatusMap } from '@/utils/constants/orderStatus';

interface Props {
  params: Promise<{ id: string }>;
}

const OrderPage = async ({ params }: Props) => {
  const t = await getTranslations();
  const { id } = await params;
  const orderResponse = await getOrderById({ id });
  const order = orderResponse.data.result;

  return (
    <AuthWrapper>
      <div className='mb-4 flex items-center border-b md:hidden'>
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
      <Card className='px-4 shadow-none md:p-5 md:shadow-sm'>
        <div className='mb-3 hidden items-center justify-between border-b pb-3 md:flex'>
          <div className='flex items-center gap-2'>
            <Button asChild size='icon' variant='ghost'>
              <Link href='/user/orders/history'>
                <ArrowLeftIcon className='text-muted-foreground size-5' />
              </Link>
            </Button>
            <div>
              <h1 className='text-2xl font-bold'>
                {t('Order')} #{order.id}
              </h1>
              <CardDescription>{format(order.created_at, 'dd MMM')}</CardDescription>
            </div>
          </div>
          <div className='flex flex-col items-end gap-1'>
            <span className='text-lg font-bold'>
              {formatPrice(order.total_price)} {t('som')}
            </span>
            <span className='text-sm'>
              <Badge variant='outline'>{orderStatusMap[order.status]}</Badge>
            </span>
          </div>
        </div>
        <div className='mb-4 flex justify-between gap-1 md:hidden'>
          <span className='text-sm'>
            <Badge variant='outline'>{orderStatusMap[order.status]}</Badge>
          </span>
          <span className='font-bold'>
            {formatPrice(order.total_price)} {t('som')}
          </span>
        </div>
        <OrderProducts order={order} />
      </Card>
    </AuthWrapper>
  );
};

export default OrderPage;
