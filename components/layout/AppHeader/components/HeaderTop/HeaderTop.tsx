import { ChevronDownIcon, MapPinIcon, ScaleIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { BaseLayout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Link } from '@/i18n/navigation';

import { LocaleSwitcher } from './components';

export const HeaderTop = () => {
  const t = useTranslations();
  return (
    <BaseLayout className='mt-2 flex h-6 justify-between'>
      <div className='flex items-center gap-4'>
        <div className='flex items-center gap-1 text-sm'>
          <MapPinIcon className='size-4' />
          <span>{t('Tashkent')}</span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className='hover:text-secondary flex items-center gap-1 text-sm transition-colors'>
            {t('Receiving and payment')}
            <ChevronDownIcon className='size-4' />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <Link href='/courier-delivery'>
                <DropdownMenuItem>{t('Delivery by courier')}</DropdownMenuItem>
              </Link>
              <Link href='/payment-methods'>
                <DropdownMenuItem>{t('Payment methods')}</DropdownMenuItem>
              </Link>
              <DropdownMenuItem>{t('Check order status')}</DropdownMenuItem>
              <Tooltip delayDuration={0}>
                <DropdownMenuItem asChild className='text-muted-foreground cursor-not-allowed'>
                  <TooltipTrigger disabled className='w-full'>
                    {t('Delivery by transport company')}
                  </TooltipTrigger>
                </DropdownMenuItem>
                <TooltipContent side='right'>{t('In the process of development')}</TooltipContent>
              </Tooltip>
              <Tooltip delayDuration={0}>
                <DropdownMenuItem asChild className='text-muted-foreground cursor-not-allowed'>
                  <TooltipTrigger disabled className='w-full'>
                    {t('Pickup')}
                  </TooltipTrigger>
                </DropdownMenuItem>
                <TooltipContent side='right'>{t('In the process of development')}</TooltipContent>
              </Tooltip>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger className='hover:text-secondary flex items-center gap-1 text-sm transition-colors'>
            {t('About us')}
            <ChevronDownIcon className='size-4' />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <Link href='/about'>
                <DropdownMenuItem>{t('About company')}</DropdownMenuItem>
              </Link>
              <Tooltip delayDuration={0}>
                <DropdownMenuItem asChild className='text-muted-foreground cursor-not-allowed'>
                  <TooltipTrigger disabled className='w-full'>
                    {t('Information for investors')}
                  </TooltipTrigger>
                </DropdownMenuItem>
                <TooltipContent side='right'>{t('In the process of development')}</TooltipContent>
              </Tooltip>
              <Link href='/requisites'>
                <DropdownMenuItem>{t('Requisites')}</DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Button className='h-6 px-2' size='sm' variant='secondary'>
              <ScaleIcon />
              {t('Buy as a legal entity')}
            </Button>
          </TooltipTrigger>
          <TooltipContent side='bottom'>{t('In the process of development')}</TooltipContent>
        </Tooltip>
      </div>
      <div className='flex items-center gap-4'>
        <LocaleSwitcher />
        <Link
          href='tel:+998712099944'
          className='hover:text-secondary text-foreground/70 text-sm font-bold transition-colors'
        >
          +998 71 209 99 44
        </Link>
      </div>
    </BaseLayout>
  );
};
