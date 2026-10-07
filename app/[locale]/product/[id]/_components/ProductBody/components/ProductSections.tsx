'use client';

import { useTranslations } from 'next-intl';
import React from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';

import { ProductCharacteristics } from './ProductCharacteristics';
import { ProductComments } from './ProductComments/ProductComments';
import { ProductDescriptionPreview } from './ProductDescription/components';
import { ProductQuestions } from './ProductQuestions/ProductQuestions';

export type ProductSectionId = 'characteristics' | 'description' | 'questions' | 'reviews';

export const sectionElementId = (id: ProductSectionId) => `sec-${id}`;

interface Props {
  product: Product;
  /** tanlangan bo'lim (desktopda yorliq, mobilda ochiq akkordeon) */
  openSection: string;
  onOpenSectionChange: (section: string) => void;
}

const DesktopSections = ({ product, openSection, onOpenSectionChange }: Props) => {
  const t = useTranslations();

  const sections = (
    [
      { id: 'description', label: t('Description'), visible: !!product.description },
      {
        id: 'characteristics',
        label: t('Characteristics'),
        visible: product.characteristics.length > 0
      },
      {
        id: 'reviews',
        label: `${t('Reviews')}${product.comments_quantity ? `: ${product.comments_quantity}` : ''}`,
        visible: true
      },
      {
        id: 'questions',
        label: `${t('Questions')}${product.questions_quantity ? `: ${product.questions_quantity}` : ''}`,
        visible: true
      }
    ] satisfies { id: ProductSectionId; label: string; visible: boolean }[]
  ).filter((section) => section.visible);

  // Tavsif bo'lmasa (yoki noma'lum qiymat bo'lsa) birinchi mavjud yorliq ochiladi
  const active = sections.some((section) => section.id === openSection)
    ? openSection
    : sections[0].id;

  return (
    <div className='hidden md:block'>
      <div className='flex gap-7 border-b' role='tablist'>
        {sections.map((section) => (
          <button
            key={section.id}
            className={cn(
              '-mb-px border-b-2 py-3 text-[15px] font-medium transition-colors',
              active === section.id
                ? 'border-primary text-foreground'
                : 'text-muted-foreground hover:text-foreground border-transparent'
            )}
            aria-selected={active === section.id}
            role='tab'
            type='button'
            onClick={() => onOpenSectionChange(section.id)}
          >
            {section.label}
          </button>
        ))}
      </div>

      <div className='pt-6' id={sectionElementId(active as ProductSectionId)} role='tabpanel'>
        {active === 'description' && (
          <ProductDescriptionPreview description={product.description} />
        )}
        {active === 'characteristics' && (
          <ProductCharacteristics characteristics={product.characteristics} />
        )}
        {active === 'reviews' && <ProductComments product={product} />}
        {active === 'questions' && <ProductQuestions product={product} />}
      </div>
    </div>
  );
};

export const ProductSections = ({ product, openSection, onOpenSectionChange }: Props) => {
  const t = useTranslations();

  return (
    <>
      <DesktopSections
        openSection={openSection}
        product={product}
        onOpenSectionChange={onOpenSectionChange}
      />

      <Accordion
        className='border-t md:hidden'
        type='single'
        value={openSection}
        collapsible
        onValueChange={onOpenSectionChange}
      >
        <AccordionItem
          disabled={!product.description}
          id={`${sectionElementId('description')}-mobile`}
          value='description'
        >
          <AccordionTrigger>{t('Description')}</AccordionTrigger>
          <AccordionContent>
            <ProductDescriptionPreview description={product.description} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          disabled={!product.characteristics.length}
          id={`${sectionElementId('characteristics')}-mobile`}
          value='characteristics'
        >
          <AccordionTrigger>{t('Characteristics')}</AccordionTrigger>
          <AccordionContent>
            <ProductCharacteristics characteristics={product.characteristics} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem id={`${sectionElementId('reviews')}-mobile`} value='reviews'>
          <AccordionTrigger>
            {t('Reviews')}
            {!!product.comments_quantity && `: ${product.comments_quantity}`}
          </AccordionTrigger>
          <AccordionContent>
            <ProductComments product={product} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem id={`${sectionElementId('questions')}-mobile`} value='questions'>
          <AccordionTrigger>
            {t('Questions')}
            {!!product.questions_quantity && `: ${product.questions_quantity}`}
          </AccordionTrigger>
          <AccordionContent>
            <ProductQuestions product={product} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};
