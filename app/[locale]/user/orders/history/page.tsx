import { ArrowLeftIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { OrdersHistory } from '@/app/[locale]/user/orders/history/_components/OrdersHistory';
import { AuthWrapper } from '@/components/modules/auth';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from '@/i18n/navigation';

const OrdersPage = async () => {
  const t = await getTranslations();

  return (
    <AuthWrapper>
      <div className='mb-4 flex items-center border-b md:hidden'>
        <Button asChild className='size-13' size='icon' variant='ghost'>
          <Link href='/user/dashboard'>
            <ArrowLeftIcon className='text-muted-foreground size-5' />
          </Link>
        </Button>
        <h1 className='flex-1 text-center font-bold md:hidden'>{t('Purchase history')}</h1>
        <div className='size-13' />
      </div>
      <Card className='px-4 shadow-none md:p-5 md:shadow-sm'>
        <h1 className='mb-3 hidden text-2xl font-bold md:block'>{t('Purchase history')}</h1>
        <OrdersHistory />
      </Card>
    </AuthWrapper>
  );
};

export default OrdersPage;
