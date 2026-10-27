import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';

const linkClass =
  'hover:text-secondary inline-block text-sm leading-[200%] whitespace-nowrap transition-colors';

/** The columns of the footer: the company, the conditions of an order, the legal texts. */
const COLUMNS = [
  {
    title: 'About us',
    links: [
      { href: '/about', label: 'About company' },
      { href: '/stores', label: 'Stores' },
      { href: '/contacts', label: 'Contacts' }
    ]
  },
  {
    title: 'Delivery and lifting',
    links: [
      { href: '/courier-delivery', label: 'Delivery by courier' },
      { href: '/payment-methods', label: 'Payment methods' },
      { href: '/pickup', label: 'Pickup' },
      { href: '/lifting', label: 'Floor lifting' },
      { href: '/returns', label: 'Returns' },
      { href: '/returns#kafolat', label: 'Warranty' }
    ]
  },
  {
    title: 'Information',
    links: [
      { href: '/legal-entities', label: 'For legal entities' },
      { href: '/oferta', label: 'Public offer' },
      { href: '/privacy', label: 'Privacy policy' }
    ]
  }
];

export const Links = () => {
  const t = useTranslations();

  return (
    <div className='flex flex-wrap gap-x-10 gap-y-6 md:gap-x-12 xl:gap-x-20'>
      {COLUMNS.map((column) => (
        <div key={column.title}>
          <p className='mb-3 text-lg font-semibold whitespace-nowrap'>{t(column.title)}</p>
          <ul>
            {column.links.map((link) => (
              <li key={link.href}>
                <Link className={linkClass} href={link.href}>
                  {t(link.label)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
