'use client';

import { ArrowRightIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

import { ProductList } from '../ProductList/ProductList';

interface Props {
  /** left part of the header: the title (and what goes with it) */
  title: React.ReactNode;
  products: Product[];
  /** the page with all the products of this carousel */
  href: React.ComponentProps<typeof Link>['href'];
  onDark?: boolean;
  className?: string;
  headerClassName?: string;
  listClassName?: string;
}

/** A title with a "View all" button (a page with every product of the carousel) and the carousel. */
export const ProductSection = ({
  title,
  products,
  href,
  onDark,
  className,
  headerClassName,
  listClassName
}: Props) => {
  const t = useTranslations();

  return (
    <div className={className}>
      <div className={cn('flex items-center justify-between gap-3', headerClassName)}>
        {title}
        <Button asChild className='shrink-0' size='sm' variant='muted'>
          <Link href={href}>
            {t('View all')}
            <ArrowRightIcon />
          </Link>
        </Button>
      </div>
      <div className={listClassName}>
        <ProductList onDark={onDark} products={products} />
      </div>
    </div>
  );
};
