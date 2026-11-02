'use client';

import React from 'react';

import { Link } from '@/i18n/navigation';
import { trackEvent } from '@/lib/analytics';

type Props = Omit<React.ComponentProps<'a'>, 'onClick'> & {
  /** the event sent to the analytics when the link is pressed */
  event: string;
  eventParams?: Record<string, unknown>;
};

/** A link that tells the analytics it was pressed (the buttons of the service pages). */
export const TrackedLink = ({ event, eventParams, href = '', ...props }: Props) => {
  const onClick = () => trackEvent(event, eventParams);
  // an address of the site keeps the language (`/uz/...`); tel:, mailto: and other sites stay as they are
  return href.startsWith('/') ? (
    <Link {...props} href={href} onClick={onClick} />
  ) : (
    <a {...props} href={href} onClick={onClick} />
  );
};
