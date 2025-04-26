import { ArrowLeftIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { AuthWrapper } from '@/components/modules/auth';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from '@/i18n/navigation';

import { ProductComments, ProductQuestions } from './_components';

const OrdersPage = () => {
  const t = useTranslations();

  return (
    <AuthWrapper>
      <div className='mb-4 flex items-center border-b md:hidden'>
        <Button asChild className='size-13' size='icon' variant='ghost'>
          <Link href='/user/dashboard'>
            <ArrowLeftIcon className='text-muted-foreground size-5' />
          </Link>
        </Button>
        <h1 className='flex-1 text-center font-bold md:hidden'>{t('My reviews and questions')}</h1>
        <div className='size-13' />
      </div>
      <Card className='px-4 shadow-none md:p-5 md:shadow-sm'>
        <h1 className='mb-3 hidden text-2xl font-bold md:block'>{t('My reviews and questions')}</h1>
        <Tabs defaultValue='reviews'>
          <TabsList>
            <TabsTrigger value='reviews'>{t('Reviews')}</TabsTrigger>
            <TabsTrigger value='questions'>{t('Questions')}</TabsTrigger>
          </TabsList>
          <TabsContent value='reviews'>
            <ProductComments />
          </TabsContent>
          <TabsContent value='questions'>
            <ProductQuestions />
          </TabsContent>
        </Tabs>
      </Card>
    </AuthWrapper>
  );
};

export default OrdersPage;
