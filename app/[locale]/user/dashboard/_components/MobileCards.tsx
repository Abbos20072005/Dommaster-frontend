'use client';

import {
  ChevronRightIcon,
  EyeIcon,
  HeartIcon,
  HistoryIcon,
  MapPinIcon,
  MessageCircleIcon,
  SettingsIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  TagIcon,
  UserIcon
} from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { Link } from '@/i18n/navigation';
import { formatPhoneNumber } from '@/lib/utils';
import { AuthDialog } from '@/modules/auth';
import { useAuth } from '@/utils/stores';

const navMainLinks = [
  { href: '/user/orders/active', icon: ShoppingBagIcon, label: 'My orders', authorized: true },
  { href: '/user/orders/history', icon: HistoryIcon, label: 'Purchase history', authorized: true },
  {
    href: '/user/reviews',
    icon: MessageCircleIcon,
    label: 'My reviews and questions',
    authorized: true
  },
  { href: '/user/promo', icon: TagIcon, label: 'Promo codes', authorized: true },
  { href: '/user/addresses', icon: MapPinIcon, label: 'My addresses', authorized: true },
  { href: '/cart', icon: ShoppingCartIcon, label: 'Cart', authorized: false },
  { href: '/user/favorites', icon: HeartIcon, label: 'Favorites', authorized: false },
  { href: '/user/products-history', icon: EyeIcon, label: 'Viewed products', authorized: false }
];

export const MobileCards = () => {
  const t = useTranslations();
  const { user } = useAuth();

  if (user === undefined) {
    return (
      <div className='flex items-center justify-center py-20 md:hidden'>
        <Spinner />
      </div>
    );
  }

  return (
    <div className='md:hidden'>
      <div>
        {user === null ? (
          <div className='px-4 pt-4'>
            <p className='mb-3 font-semibold'>{t('Login to manage your account')}</p>
            <div className='grid grid-cols-2 gap-2 py-4'>
              <AuthDialog asChild defaultStep='register'>
                <Button>{t('Register')}</Button>
              </AuthDialog>
              <AuthDialog asChild>
                <Button variant='outline'>{t('Login')}</Button>
              </AuthDialog>
            </div>
          </div>
        ) : (
          <div className='bg-primary text-primary-foreground rounded-b-lg p-4'>
            <div className='mb-4 flex items-center md:hidden'>
              <div className='size-8' />
              <h1 className='flex-1 text-center font-bold md:hidden'>{t('Profile')}</h1>
              <Button size='iconSm' variant='ghost'>
                <Link href='/user/personal-info'>
                  <SettingsIcon />
                </Link>
              </Button>
            </div>
            <div className='flex items-center gap-3'>
              <Avatar className='size-14'>
                <AvatarFallback className='uppercase'>
                  <UserIcon className='text-primary size-8' />
                </AvatarFallback>
              </Avatar>
              <Link href='/user/personal-info' className='space-y-1'>
                <div className='flex items-center gap-1'>
                  <p className='flex-1 text-lg font-bold'>{user.full_name}</p>
                  <ChevronRightIcon className='size-5' />
                </div>
                <div className='text-xs'>{formatPhoneNumber(user.phone_number)}</div>
              </Link>
            </div>
          </div>
        )}
      </div>
      <div className='divide-y px-4'>
        {navMainLinks.map((item) =>
          item.authorized && !user ? null : (
            <Link href={item.href} key={item.href} className='flex items-center gap-3 py-3'>
              <item.icon className='size-5' />
              <p className='flex-1'>{t(item.label)}</p>
              <ChevronRightIcon className='text-muted-foreground size-5' />
            </Link>
          )
        )}
      </div>
    </div>
  );
};
