'use client';

import { ShoppingCartIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { CartCounter, useProductCart } from '@/components/modules/cart';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Link } from '@/i18n/navigation';
import { formatPrice } from '@/lib/utils';

interface Props {
  product: Product;
}

export const ProductCart = ({ product }: Props) => {
  const t = useTranslations();
  const { state, functions } = useProductCart(product);

  return (
    <Card className='border-primary sticky top-20 space-y-4 p-4' variant='outline'>
      {product.discount && (
        <>
          <CardHeader className='p-0'>
            <CardTitle className='text-primary lg:text-xl'>{t('Wave of Profits')}</CardTitle>
          </CardHeader>
          <Separator />
        </>
      )}
      <CardContent className='p-0'>
        {product.discount_price && (
          <div className='mb-2 flex items-center gap-2'>
            <span className='text-muted-foreground line-through'>
              {formatPrice(product.price)} {t('sum')}
            </span>
            <Badge variant='secondary'>-{product.discount}%</Badge>
          </div>
        )}
        <div className='text-lg font-bold sm:text-2xl'>
          {formatPrice(product.discount_price ?? product.price)} {t('sum')}
        </div>
      </CardContent>
      <CardFooter className='p-0'>
        {state.cartCount === 0 ? (
          <Button
            className='w-full'
            disabled={product.quantity === 0}
            onClick={functions.onAddToCart}
          >
            <ShoppingCartIcon />
            {product.quantity === 0 ? t('Out of stock') : t('Add to cart')}
          </Button>
        ) : (
          <div className='grid grid-cols-2 gap-3'>
            <CartCounter
              className='bg-muted h-11 rounded-md'
              maxValue={product.quantity}
              value={state.cartCount}
              onChange={functions.onCartCountChange}
            />
            <Button asChild className='shrink-0' variant='outline'>
              <Link href='/cart'>
                <ShoppingCartIcon />
                {t('To cart')}
              </Link>
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};
