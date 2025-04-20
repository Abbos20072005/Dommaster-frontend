import { getTranslations } from 'next-intl/server';
import React from 'react';

import { BaseLayout, MobileHeader } from '@/components/layout';
import { ProductList } from '@/components/modules/product';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { productsData } from '@/fake-data/products';
import { getProductById } from '@/utils/api/requests';

import { ProductBody, ProductCart, ProductHeader } from './-components';
import {
  ProductCharacteristics,
  ProductComments,
  ProductDetails,
  ProductQuestions
} from './-components/ProductBody/components';

interface Props {
  params: Promise<{ id: string }>;
}

const ProductPage = async ({ params }: Props) => {
  const t = await getTranslations();
  const { id } = await params;
  const productResponse = await getProductById({ id });

  const product = productResponse.data.result || productsData.find((item) => item.id === +id);

  if (!product) return <div>Product not found</div>;

  return (
    <>
      <MobileHeader />
      <BaseLayout className='mt-2 md:mt-4'>
        <ProductHeader product={product} />
        <div className='flex flex-col gap-4 lg:flex-row'>
          <div className='flex-1'>
            <ProductBody product={product} />
            <h1 className='mt-4 text-lg font-bold md:hidden'>{product?.name}</h1>
          </div>
          <div className='lg:w-[360px]'>
            <ProductCart product={product} />
          </div>
          <Accordion className='md:hidden' type='single' collapsible>
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
            <AccordionItem value='reviews'>
              <AccordionTrigger>{t('Reviews')}</AccordionTrigger>
              <AccordionContent>
                <ProductComments product={product} />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value='questions'>
              <AccordionTrigger>{t('Questions')}</AccordionTrigger>
              <AccordionContent>
                <ProductQuestions product={product} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className='mt-8'>
          <h2 className='text-lg font-bold md:text-2xl'>{t('Frequently bought together')}</h2>
          <ProductList products={productsData} />
        </div>
      </BaseLayout>
    </>
  );
};

export default ProductPage;
