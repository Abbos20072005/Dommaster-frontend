'use client';

import { useTranslations } from 'next-intl';
import { useQueryState } from 'nuqs';
import React from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useScrollTo } from '@/hooks';

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
  const [tab, setTab] = useQueryState('tab', { defaultValue: 'description' });
  const scrollTo = useScrollTo(60);

  React.useEffect(() => {
    scrollTo(tab);
  }, []);

  return (
    <>
      {/* Desktop */}
      <Tabs
        className='hidden md:flex'
        defaultValue='description'
        value={tab}
        onValueChange={setTab}
      >
        <TabsList className='hidden w-full border md:flex' variant='underline'>
          <TabsTrigger size='lg' value='description' variant='underline'>
            {t('Description')}
          </TabsTrigger>
          <TabsTrigger
            disabled={!product.description}
            size='lg'
            value='details'
            variant='underline'
          >
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
        <Card className='p-8' variant='outline'>
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

      {/* Mobile */}
      <div className='md:hidden'>
        <ProductDescription product={product} />
        <Accordion
          className='md:hidden'
          type='single'
          value={tab}
          collapsible
          onValueChange={setTab}
        >
          <AccordionItem disabled={!product.description} id='details' value='details'>
            <AccordionTrigger>{t('Details')}</AccordionTrigger>
            <AccordionContent>
              <ProductDetails description={product.description} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            disabled={!product.characteristics.length}
            id='characteristics'
            value='characteristics'
          >
            <AccordionTrigger>{t('Characteristics')}</AccordionTrigger>
            <AccordionContent>
              <ProductCharacteristics characteristics={product.characteristics} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem id='reviews' value='reviews'>
            <AccordionTrigger>
              {t('Reviews')}
              {!!product.comments_quantity && `: ${product.comments_quantity}`}
            </AccordionTrigger>
            <AccordionContent>
              <ProductComments product={product} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem id='questions' value='questions'>
            <AccordionTrigger>
              {t('Questions')}
              {!!product.questions_quantity && `: ${product.questions_quantity}`}
            </AccordionTrigger>
            <AccordionContent>
              <ProductQuestions product={product} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
};
