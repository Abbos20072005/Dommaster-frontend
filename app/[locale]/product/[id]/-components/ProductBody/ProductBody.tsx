'use client';

import { useTranslations } from 'next-intl';
import React from 'react';

import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import {
  ProductCharacteristics,
  ProductComments,
  ProductDescription,
  ProductDetails,
  ProductQuestions
} from './components';

interface Props {
  product: Product;
}

export const ProductBody = ({ product }: Props) => {
  const t = useTranslations();
  const [tab, setTab] = React.useState('description');

  return (
    <Tabs defaultValue='description' value={tab} onValueChange={setTab}>
      <TabsList className='hidden w-full border md:flex' variant='underline'>
        <TabsTrigger size='lg' value='description' variant='underline'>
          {t('Description')}
        </TabsTrigger>
        <TabsTrigger disabled={!product.description} size='lg' value='details' variant='underline'>
          {t('Details')}
        </TabsTrigger>
        <TabsTrigger
          disabled={!product.characteristics.length}
          size='lg'
          value='characteristics'
          variant='underline'
        >
          {t('Characteristics')}
        </TabsTrigger>
        <TabsTrigger size='lg' value='reviews' variant='underline'>
          {t('Reviews')}
          {!!product.comments_quantity && `: ${product.comments_quantity}`}
        </TabsTrigger>
        <TabsTrigger size='lg' value='questions' variant='underline'>
          {t('Questions')}
          {!!product.questions_quantity && `: ${product.questions_quantity}`}
        </TabsTrigger>
      </TabsList>
      <Card className='md:border-border border-transparent p-0 md:p-8' variant='outline'>
        <TabsContent value='description'>
          <ProductDescription product={product} />
        </TabsContent>
        <TabsContent value='details'>
          <ProductDetails description={product.description} />
        </TabsContent>
        <TabsContent value='characteristics'>
          <ProductCharacteristics characteristics={product.characteristics} />
        </TabsContent>
        <TabsContent value='reviews'>
          <ProductComments product={product} />
        </TabsContent>
        <TabsContent value='questions'>
          <ProductQuestions product={product} />
        </TabsContent>
      </Card>
    </Tabs>
  );
};
