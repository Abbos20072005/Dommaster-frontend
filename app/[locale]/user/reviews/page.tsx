import type { Metadata } from 'next';

import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AuthWrapper } from '@/modules/auth';

import { ProductComments, ProductQuestions } from './_components';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return { title: t('My reviews and questions') };
}

const OrdersPage = () => {
  const t = useTranslations();

  return (
    <AuthWrapper>
      <div className='mb-4 flex h-12 items-center border-b md:hidden'>
        <h1 className='flex-1 text-center font-bold md:hidden'>{t('My reviews and questions')}</h1>
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
