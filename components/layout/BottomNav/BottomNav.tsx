import {
  HeartIcon,
  HomeIcon,
  PackageSearchIcon,
  ShoppingCartIcon,
  UserCircleIcon
} from 'lucide-react';
import { useTranslations } from 'next-intl';

import { MobileCatalogDialog } from '@/components/modules/catalog';
import { NavigationLink } from '@/components/NavigationLink';

export const BottomNav = () => {
  const t = useTranslations();

  return (
    <div className='grid grid-cols-5 gap-4 py-2 shadow-md md:hidden'>
      <NavigationLink
        href='/'
        activeClassName='text-foreground'
        className='text-muted-foreground flex flex-col items-center transition-colors'
      >
        <HomeIcon className='size-5' />
        <span className='text-xs font-medium'>{t('Home')}</span>
      </NavigationLink>
      <MobileCatalogDialog className='text-muted-foreground flex flex-col items-center transition-colors'>
        <PackageSearchIcon className='size-5' />
        <span className='text-xs font-medium'>{t('Catalog')}</span>
      </MobileCatalogDialog>
      <NavigationLink
        href='/cart'
        activeClassName='text-foreground'
        className='text-muted-foreground flex flex-col items-center transition-colors'
      >
        <ShoppingCartIcon className='size-5' />
        <span className='text-xs font-medium'>{t('Cart')}</span>
      </NavigationLink>
      <NavigationLink
        href='/user/favorites'
        activeClassName='text-foreground'
        className='text-muted-foreground flex flex-col items-center transition-colors'
      >
        <HeartIcon className='size-5' />
        <span className='text-xs font-medium'>{t('Favorites')}</span>
      </NavigationLink>
      <NavigationLink
        href='/user/profile'
        activeClassName='text-foreground'
        className='text-muted-foreground flex flex-col items-center transition-colors'
      >
        <UserCircleIcon className='size-5' />
        <span className='text-xs font-medium'>{t('Profile')}</span>
      </NavigationLink>
    </div>
  );
};
