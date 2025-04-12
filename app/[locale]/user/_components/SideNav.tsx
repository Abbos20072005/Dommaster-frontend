'use client';

import { useTranslations } from 'next-intl';

import { NavigationLink } from '@/components/NavigationLink';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/utils/stores';

const navLinks = [
  {
    title: 'Purchases',
    items: [
      { href: '/user/orders/all', label: 'My orders', authorized: true },
      { href: '/user/orders/history', label: 'Purchase history', authorized: true }
    ]
  },
  {
    title: 'Profile',
    items: [
      { href: '/user/reviews', label: 'My reviews and questions', authorized: true },
      { href: '/user/promo', label: 'Promo codes', authorized: true },
      { href: '/user/personal-info', label: 'Personal info', authorized: true }
    ]
  },
  {
    title: 'Products',
    items: [
      { href: '/cart', label: 'Cart', authorized: false },
      { href: '/user/favorites', label: 'Favorites', authorized: false }
    ]
  }
];

export const SideNav = () => {
  const t = useTranslations();
  const { user } = useAuth();

  const filteredNavLinks = navLinks.map((link) => ({
    ...link,
    items: link.items.filter((item) => !item.authorized || user)
  }));

  return (
    <aside className='hidden w-52 md:block lg:w-62 xl:w-78'>
      <Card className='space-y-4 p-3 lg:p-5'>
        <NavigationLink
          href='/user/dashboard'
          activeClassName='text-secondary'
          className='hover:text-secondary flex gap-2 py-2 text-sm transition-colors'
        >
          {t('My cabinet')}
        </NavigationLink>
        {filteredNavLinks.map((link) => (
          <div key={link.title}>
            <h2 className='text-muted-foreground text-xs'>{t(link.title)}</h2>
            {link.items.map((item) => (
              <NavigationLink
                href={item.href}
                key={item.href}
                activeClassName='text-secondary'
                className='hover:text-secondary flex gap-2 py-2 text-sm'
              >
                {t(item.label)}
              </NavigationLink>
            ))}
          </div>
        ))}
      </Card>
    </aside>
  );
};
