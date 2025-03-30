import { EllipsisVerticalIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React from 'react';

import { CartCounter } from '@/components/modules/cart';
import { Button } from '@/components/ui/button';
import { Ratings } from '@/components/ui/rating';
import { cn } from '@/lib/utils';

import { ProductImages, ProductPrice } from './components';

type Props = React.ComponentProps<'div'> & {
  product: Product;
  setLockParentScroll?: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ProductCard = ({ product, className, setLockParentScroll, ...props }: Props) => {
  const t = useTranslations();
  const [cartCount, setCartCount] = React.useState(1);

  return (
    <div className={cn('group/product size-full rounded-lg', className)} {...props}>
      <Link href={`/product/${product.id}`} aria-label={product.title}>
        <ProductImages product={product} setLockParentScroll={setLockParentScroll} />
        <span className='sr-only'>{product.title}</span>
      </Link>
      <div>
        <div className='py-1'>
          <Link href={{ pathname: `/product/${product.id}`, query: { tab: 'reviews' } }}>
            <Ratings
              className='gap-0.5 md:gap-1'
              rating={product.rating}
              classNameIcon='text-secondary size-3 md:size-4'
            />
          </Link>
        </div>
        <Link href={`/product/${product.id}`}>
          <span className='line-clamp-4 min-h-24 text-sm leading-5'>{product.title}</span>
        </Link>
      </div>
      <div>
        <ProductPrice product={product} />
        <div className='grid gap-2 pb-6 md:grid-cols-2'>
          <div className='flex gap-2'>
            <Button className='flex-1' size='sm'>
              {t('To cart')}
            </Button>
            <Button className='md:hidden' size='iconSm' variant='outline'>
              <EllipsisVerticalIcon />
            </Button>
          </div>
          <div className='hidden md:block'>
            <CartCounter
              maxValue={product.product_count}
              value={cartCount}
              onChange={setCartCount}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
