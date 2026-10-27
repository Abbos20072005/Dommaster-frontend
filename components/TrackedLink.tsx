'use client';

import React from 'react';

import { trackEvent } from '@/lib/analytics';

type Props = Omit<React.ComponentProps<'a'>, 'onClick'> & {
  /** the event sent to the analytics when the link is pressed */
  event: string;
  eventParams?: Record<string, unknown>;
};

/** A link that tells the analytics it was pressed (the buttons of the service pages). */
export const TrackedLink = ({ event, eventParams, ...props }: Props) => (
  <a {...props} onClick={() => trackEvent(event, eventParams)} />
);
