import type { ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

interface Props {
  icon: ReactNode;
  title: string;
  description?: string;
  /** link button — the customer's next step */
  action?: { href: string; label: string };
  /** a custom next-step control (e.g. a dialog trigger); used instead of `action` */
  children?: ReactNode;
  className?: string;
}

/** Empty list of the cabinet: what is missing, why, and the button for the next step. */
export const EmptyState = ({ icon, title, description, action, children, className }: Props) => (
  <div
    className={cn(
      'mx-auto flex max-w-md flex-col items-center gap-3 py-10 text-center md:py-16',
      className
    )}
  >
    <div className='bg-muted text-muted-foreground flex size-16 items-center justify-center rounded-full [&_svg]:size-8'>
      {icon}
    </div>
    <h2 className='text-lg font-bold'>{title}</h2>
    {description && <p className='text-muted-foreground text-sm'>{description}</p>}
    {children ??
      (action && (
        <Button asChild className='mt-1' variant='secondary'>
          <Link href={action.href}>{action.label}</Link>
        </Button>
      ))}
  </div>
);
