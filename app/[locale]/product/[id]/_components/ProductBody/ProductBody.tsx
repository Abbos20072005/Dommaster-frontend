'use client';

import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useQueryState } from 'nuqs';
import React from 'react';

import { ProductCart } from '@/app/[locale]/product/[id]/_components';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useScrollTo } from '@/hooks';
import { getProductById } from '@/utils/api/requests';

import {
  ProductCharacteristics,
  ProductComments,
  ProductDescription,
  ProductDetails,
  ProductQuestions
} from './components';

export const ProductBody = () => {
  const t = useTranslations();
  const [tab, setTab] = useQueryState('tab', { defaultValue: 'description' });
  const scrollTo = useScrollTo(60);

  React.useEffect(() => {
    scrollTo(tab);
  }, []);

  const { id } = useParams<{ id: string }>();

  const getProductByIdQuery = useQuery({
    queryKey: ['product', id],
    staleTime: 0,
    queryFn: () => getProductById({ id })
  });

  if (getProductByIdQuery.isLoading)
    return (
      <div className='flex flex-col gap-4 lg:flex-row'>
        <div className='flex-1 space-y-4'>
          <Card className='hidden h-11.5 items-center px-6 md:flex' variant='outline'>
            <Skeleton className='h-5 w-32' />
          </Card>
          <Card className='md:border-border border-transparent p-0 md:p-8' variant='outline'>
            <div className='grid gap-6 md:grid-cols-[3fr_2fr]'>
              <div className='space-y-2'>
                <Skeleton className='aspect-square' />
                <div className='flex gap-1'>
                  <Skeleton className='h-[61.5px] w-15' />
                  <Skeleton className='h-[61.5px] w-15' />
                  <Skeleton className='h-[61.5px] w-15' />
                </div>
              </div>
            </div>
          </Card>
        </div>
        <div className='lg:w-[360px]'>
          <Skeleton className='h-50' />
        </div>
      </div>
    );

  const product = getProductByIdQuery.data?.data.result;

  if (!product) return null;

  return (
    <div className='flex flex-col gap-4 lg:flex-row'>
      {/* Desktop */}
      <Tabs
        className='hidden flex-1 md:flex'
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
          <AccordionItem disabled={!product.description} value='details'>
            <AccordionTrigger>{t('Details')}</AccordionTrigger>
            <AccordionContent>
              <ProductDetails description={product.description} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem disabled={!product.characteristics.length} value='characteristics'>
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
          <AccordionItem value='questions'>
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
      <div className='lg:w-[360px]'>
        <ProductCart product={product} />
      </div>
    </div>
  );
};
