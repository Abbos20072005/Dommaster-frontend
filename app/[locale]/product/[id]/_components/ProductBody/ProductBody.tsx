'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useQueryState } from 'nuqs';
import React from 'react';

import { ProductCart, ProductMobileBar } from '@/app/[locale]/product/[id]/_components/ProductCart';
import { Skeleton } from '@/components/ui/skeleton';
import { getAuthorizedProductById } from '@/utils/api/requests';

import type { ProductSectionId } from './components/ProductSections';

import { ProductImageCarousel } from './components/ProductDescription/components';
import { ProductInfo } from './components/ProductInfo';
import { ProductSections, sectionElementId } from './components/ProductSections';

const SECTION_IDS: ProductSectionId[] = ['description', 'characteristics', 'reviews', 'questions'];

export const ProductBody = () => {
  // `?tab=reviews` kabi eski havolalar ham ishlaydi: shu bo'limga o'tiladi
  const [tab, setTab] = useQueryState('tab', { defaultValue: 'description' });
  const { id } = useParams<{ id: string }>();
  const scrolledRef = React.useRef(false);

  const getProductByIdQuery = useQuery({
    queryKey: ['product', id],
    staleTime: 0,
    queryFn: () => getAuthorizedProductById({ id })
  });

  const product = getProductByIdQuery.data?.data.result;

  const scrollToSection = React.useCallback((section: string) => {
    // desktopda yorliq paneli, mobilda akkordeon — qaysi biri ko'rinib turgan bo'lsa shunga o'tamiz
    const id = sectionElementId(section as ProductSectionId);
    const element = [id, `${id}-mobile`]
      .map((elementId) => document.getElementById(elementId))
      .find((candidate) => candidate && candidate.getClientRects().length > 0);
    if (!element) return;
    window.scrollTo({
      top: element.getBoundingClientRect().top + window.scrollY - 130,
      behavior: 'smooth'
    });
  }, []);

  const onNavigate = (section: ProductSectionId) => {
    setTab(section);
    // akkordeon ochilib bo'lgach (mobil) o'tamiz
    setTimeout(() => scrollToSection(section), 80);
  };

  React.useEffect(() => {
    if (!product || scrolledRef.current) return;
    scrolledRef.current = true;
    if (tab !== 'description' && SECTION_IDS.includes(tab as ProductSectionId)) {
      setTimeout(() => scrollToSection(tab), 300);
    }
  }, [product, tab, scrollToSection]);

  if (getProductByIdQuery.isLoading)
    return (
      <div className='grid gap-8 lg:grid-cols-[minmax(0,1fr)_344px]'>
        <div className='grid gap-6 md:grid-cols-[minmax(0,520px)_minmax(0,1fr)]'>
          <Skeleton className='aspect-square w-full' />
          <div className='space-y-3'>
            <Skeleton className='h-8 w-5/6' />
            <Skeleton className='h-5 w-1/2' />
            <Skeleton className='h-5 w-2/5' />
            <Skeleton className='h-40 w-full' />
          </div>
        </div>
        <Skeleton className='hidden h-96 lg:block' />
      </div>
    );

  if (!product) return null;

  return (
    <>
      <div className='grid items-start gap-8 pb-28 lg:grid-cols-[minmax(0,1fr)_344px] lg:pb-0'>
        <div className='min-w-0 space-y-8 md:space-y-10'>
          {/* planshet: 2 teng ustun; kichik laptop (o'ng panel bilan): ustma-ust; keng ekran: galereya + ma'lumot */}
          <div className='grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-1 xl:grid-cols-[minmax(0,520px)_minmax(0,1fr)] xl:gap-8'>
            <ProductImageCarousel className='lg:max-w-[560px] xl:max-w-none' product={product} />
            <ProductInfo product={product} onNavigate={onNavigate} />
          </div>
          <ProductSections
            openSection={tab}
            product={product}
            onOpenSectionChange={(section) => setTab(section || null)}
          />
        </div>
        <ProductCart product={product} />
      </div>
      <ProductMobileBar product={product} />
    </>
  );
};
