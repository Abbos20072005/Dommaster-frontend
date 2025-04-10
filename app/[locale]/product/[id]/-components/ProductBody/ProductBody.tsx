'use client';

import { useTranslations } from 'next-intl';
import { notFound } from 'next/navigation';
import { useQueryState } from 'nuqs';

import { Card } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import {
  ProductDescription,
  ProductDetails,
  ProductProperties,
  ProductReviews
} from './components';
import { useProductBody } from './hooks';

export const ProductBody = () => {
  const t = useTranslations();
  const { state } = useProductBody();
  const [tab, setTab] = useQueryState('tab', { defaultValue: 'description' });

  if (state.isLoading) {
    return (
      <div className='mt-10 grid place-items-center'>
        <Spinner />
      </div>
    );
  }

  if (!state.product) return notFound();

  return (
    <Tabs defaultValue='description' value={tab} onValueChange={setTab}>
      <TabsList className='hidden w-full shadow-sm md:flex' variant='underline'>
        <TabsTrigger size='lg' value='description' variant='underline'>
          {t('Description')}
        </TabsTrigger>
        <TabsTrigger
          disabled={!state.product.description}
          size='lg'
          value='details'
          variant='underline'
        >
          {t('Details')}
        </TabsTrigger>
        <TabsTrigger size='lg' value='properties' variant='underline'>
          {t('Properties')}
        </TabsTrigger>
        <TabsTrigger size='lg' value='reviews' variant='underline'>
          {t('Reviews')}
          {state.product.reviews_count && `: ${state.product.reviews_count}`}
        </TabsTrigger>
        <TabsTrigger size='lg' value='certificates' variant='underline'>
          {t('Certificates')}
        </TabsTrigger>
      </TabsList>
      <Card className='p-0 shadow-none md:p-8 md:shadow-sm'>
        <TabsContent value='description'>
          <ProductDescription product={state.product} />
        </TabsContent>
        <TabsContent value='details'>
          <ProductDetails extendedDescription={state.product.description} />
        </TabsContent>
        <TabsContent value='properties'>
          <ProductProperties properties={state.product.properties} />
        </TabsContent>
        <TabsContent value='reviews'>
          <ProductReviews product={state.product} />
        </TabsContent>
      </Card>
    </Tabs>
  );
};
