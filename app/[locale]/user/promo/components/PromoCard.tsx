import { formatDistanceToNow, parseISO } from 'date-fns';
import { ru, uz } from 'date-fns/locale';
import { Check, Clock, Copy } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';

import type { Locale } from '@/i18n/routing';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

interface PromoCardProps {
  promo: Promo;
}

export const PromoCard = ({ promo }: PromoCardProps) => {
  const t = useTranslations();
  const [copied, setCopied] = useState(false);
  const locale = useLocale();

  const localeMap = {
    en: undefined,
    uz,
    ru
  };

  const endDate = parseISO(promo.end_date);
  const timeRemaining = formatDistanceToNow(endDate, {
    addSuffix: true,
    locale: localeMap[locale as Locale]
  });

  const copyToClipboard = () => {
    navigator.clipboard.writeText(promo.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card variant='outline'>
      <CardHeader className='pb-2'>
        <div className='flex items-start justify-between'>
          <div>
            <CardTitle className='text-xl'>{promo.name}</CardTitle>
            <CardDescription>
              {t('Save {discount}% on your purchase', { discount: promo.discount })}
            </CardDescription>
          </div>
          <Badge className='ml-2' variant='secondary'>
            {promo.discount}% OFF
          </Badge>
        </div>
      </CardHeader>
      <CardContent className='pb-2'>
        <div className='bg-muted mt-2 flex items-center justify-between rounded-md p-3'>
          <code className='font-mono text-lg font-semibold'>{promo.code}</code>
          <Button
            aria-label='Copy promo code'
            className='h-8 px-2'
            size='sm'
            variant='ghost'
            onClick={copyToClipboard}
          >
            {copied ? <Check className='h-4 w-4' /> : <Copy className='h-4 w-4' />}
          </Button>
        </div>
      </CardContent>
      <CardFooter className='text-muted-foreground flex justify-between pt-2 text-sm'>
        <div className='flex items-center'>
          <Clock className='mr-1 h-4 w-4' />
          <span>{t('Expires {timeRemaining}', { timeRemaining })}</span>
        </div>
      </CardFooter>
    </Card>
  );
};
