import { ArrowRightIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';

type Props = {
  href: React.ComponentProps<typeof Link>['href'];
  className?: string;
};

/** "View all →" button at the right of a section title (carousels). */
export const ViewAllButton = ({ href, className }: Props) => {
  const t = useTranslations();

  return (
    <Button asChild className={className} size='sm' variant='muted'>
      <Link href={href}>
        {t('View all')}
        <ArrowRightIcon />
      </Link>
    </Button>
  );
};
