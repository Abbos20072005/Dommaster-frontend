'use client';

import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

/** A line under the total of the cart and the checkout: the links to the conditions (BLD-287). */
export const TermsLinks = ({ className }: { className?: string }) => {
  const t = useTranslations();
  const link = (href: string) =>
    function TermsLink(chunks: React.ReactNode) {
      return (
        <Link className='text-primary underline' href={href}>
          {chunks}
        </Link>
      );
    };

  return (
    <p className={cn('text-muted-foreground text-xs leading-5', className)}>
      {t.rich('Terms links', {
        delivery: link('/courier-delivery'),
        payment: link('/payment-methods'),
        returns: link('/returns')
      })}
    </p>
  );
};
