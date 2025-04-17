'use client';

import { useTranslations } from 'next-intl';
import React from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const TypeAndPlaceOfOrderCard = () => {
  const t = useTranslations();

  return (
    <Card className='flex-1' variant='outline'>
      <CardHeader>
        <CardTitle className='md:text-xl'>
          {t('Where and how would you like to receive your order?')}
        </CardTitle>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
};
