import React from 'react';

import { Link } from '@/i18n/navigation';

interface Props {
  icon: React.ReactNode;
  title: string;
  description: string;
  /** the main button: the catalog by default */
  action?: { href: string; label: string };
  /** a second, quiet button */
  secondary?: { href: string; label: string };
}

/** The empty state of the orders: a round icon, a title, a text and one or two buttons. */
export const OrdersEmpty = ({ icon, title, description, action, secondary }: Props) => (
  <div className='border-border grid justify-items-center gap-2 rounded-xl border bg-white px-6 py-12 text-center'>
    <span className='bg-primary/10 text-primary mb-1.5 flex size-12 items-center justify-center rounded-full [&_svg]:size-6'>
      {icon}
    </span>
    <span className='text-xl leading-[26px] font-bold'>{title}</span>
    <span className='max-w-[420px] text-sm leading-5 text-[#4A5563]'>{description}</span>
    <div className='mt-3 flex gap-3'>
      {action && (
        <Link
          href={action.href}
          className='bg-primary hover:bg-primary/90 inline-flex h-11 items-center rounded-lg px-5 text-sm font-bold text-white'
        >
          {action.label}
        </Link>
      )}
      {secondary && (
        <Link
          href={secondary.href}
          className='border-primary text-primary hover:bg-primary/5 inline-flex h-11 items-center rounded-lg border bg-white px-5 text-sm font-bold'
        >
          {secondary.label}
        </Link>
      )}
    </div>
  </div>
);
