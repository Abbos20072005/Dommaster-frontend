import type { TrustBlock } from '@/content/trust/types';

import { CONTACT_PHONE, CONTACT_PHONE_HREF, SOCIAL_LINKS } from '@/utils/constants/contacts';

type Cta = Extract<TrustBlock, { type: 'cta' }>['buttons'];

/**
 * The buttons of the contact block of the service pages: the phone, Telegram (when the account is
 * set) and one more link. `event` tells the analytics which page the click came from.
 */
export const contactButtons = (
  event: string,
  labels: { call: string; write: string },
  extra?: { text: string; href: string }
): Cta => [
  {
    text: `${labels.call}: ${CONTACT_PHONE}`,
    href: CONTACT_PHONE_HREF,
    event,
    variant: 'primary'
  },
  ...(SOCIAL_LINKS.telegram
    ? [{ text: labels.write, href: SOCIAL_LINKS.telegram, event, variant: 'outline' as const }]
    : []),
  ...(extra ? [{ ...extra, variant: 'outline' as const }] : [])
];
