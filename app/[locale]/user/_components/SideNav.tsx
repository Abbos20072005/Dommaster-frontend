import { getTranslations } from 'next-intl/server';

import { NavigationLink } from '@/components/NavigationLink';
import { Card } from '@/components/ui/card';

const navLinks = [
  {
    title: 'Purchases',
    items: [
      { href: '/user/orders/all', label: 'My orders' },
      { href: '/user/orders/history', label: 'Purchase history' }
    ]
  },
  {
    title: 'Profile',
    items: [
      { href: '/user/reviews', label: 'My reviews and questions' },
      { href: '/user/promo', label: 'Promo codes' },
      { href: '/user/personal-info', label: 'Personal info' }
    ]
  },
  {
    title: 'Products',
    items: [
      { href: '/cart', label: 'Cart' },
      { href: '/user/favorites', label: 'Favorites' }
    ]
  }
];

export const SideNav = async () => {
  const t = await getTranslations();

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
        {navLinks.map((link) => (
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
