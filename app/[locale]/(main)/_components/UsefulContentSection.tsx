import { getTranslations } from 'next-intl/server';

import { BaseLayout } from '@/components/layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const UsefulContentSection = async () => {
  const t = await getTranslations();

  return (
    <BaseLayout>
      <Tabs defaultValue='news'>
        <TabsList className='mx-auto'>
          <TabsTrigger value='news'>{t('News')}</TabsTrigger>
          <TabsTrigger value='articles'>{t('Articles')}</TabsTrigger>
          <TabsTrigger value='reviews'>{t('Reviews')}</TabsTrigger>
          <TabsTrigger value='videos'>{t('Videos')}</TabsTrigger>
        </TabsList>
        <TabsContent value='news'>news</TabsContent>
        <TabsContent value='articles'>articles</TabsContent>
        <TabsContent value='reviews'>reviews</TabsContent>
        <TabsContent value='videos'>videos</TabsContent>
      </Tabs>
    </BaseLayout>
  );
};
