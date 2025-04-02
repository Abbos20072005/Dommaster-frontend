'use client';

import type { LucideIcon } from 'lucide-react';

import {
  HeartIcon,
  HomeIcon,
  PackageSearchIcon,
  ShoppingCartIcon,
  UserCircleIcon
} from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

const navItems: { icon: LucideIcon; title: string; url: string }[] = [
  {
    icon: HomeIcon,
    title: 'Home',
    url: '/'
  },
  {
    icon: PackageSearchIcon,
    title: 'Catalog',
    url: '/catalog'
  },
  {
    icon: ShoppingCartIcon,
    title: 'Cart',
    url: '/cart'
  },
  {
    icon: HeartIcon,
    title: 'Favorites',
    url: '/favorites'
  },
  {
    icon: UserCircleIcon,
    title: 'Profile',
    url: '/cabinet'
  }
];

export const BottomNav = () => {
  const t = useTranslations();
  const pathname = usePathname();

  return (
    <div className='grid grid-cols-5 gap-4 py-2 shadow-md md:hidden'>
      {navItems.map((item) => (
        <Link
          href={item.url}
          key={item.url}
          className={cn('text-muted-foreground flex flex-col items-center transition-colors', {
            'text-foreground': item.url === pathname
          })}
        >
          <item.icon className='size-5' />
          <span className='text-xs font-medium'>{t(item.title)}</span>
        </Link>
      ))}
    </div>
  );
};
