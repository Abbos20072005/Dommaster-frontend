'use client';

import React from 'react';

import { publicApi } from '@/utils/api/instance';
import { CONTACT_PHONE, CONTACT_PHONE_HREF, SOCIAL_LINKS } from '@/utils/constants';

import type { OperatorInfo } from './types';

interface InfoResponse {
  result?: {
    phone_number?: string | null;
    telegram_support?: string | null;
    working_hours?: string | null;
  };
}

/** What the site knows without the server: the one phone of the company, its Telegram. */
const FALLBACK: OperatorInfo = {
  phone: CONTACT_PHONE,
  phoneHref: CONTACT_PHONE_HREF,
  telegram: SOCIAL_LINKS.telegram || undefined
};

/** `@name`, `t.me/name` and `https://t.me/name` all become a link. */
const toTelegramLink = (value: string) => {
  const text = value.trim();
  if (/^https?:\/\//i.test(text)) return text;
  return `https://t.me/${text.replace(/^@/, '').replace(/^(?:https?:\/\/)?t\.me\//i, '')}`;
};

let cached: OperatorInfo | null = null;
let pending: Promise<OperatorInfo> | null = null;

/** The operator contacts come from `/base/info/`; the answer is kept for the whole visit. */
export const loadOperatorInfo = (): Promise<OperatorInfo> => {
  if (cached) return Promise.resolve(cached);

  pending ??= publicApi
    .get<InfoResponse>('/base/info/')
    .then(({ data }) => {
      const info = data.result;
      const phone = info?.phone_number?.trim();

      cached = {
        phone: phone || FALLBACK.phone,
        phoneHref: phone ? `tel:${phone.replace(/[^\d+]/g, '')}` : FALLBACK.phoneHref,
        telegram: info?.telegram_support
          ? toTelegramLink(info.telegram_support)
          : FALLBACK.telegram,
        hours: info?.working_hours?.trim() || undefined
      };
      return cached;
    })
    .catch(() => {
      // the contacts must always be there: without the answer the site's own are used
      pending = null;
      return FALLBACK;
    });

  return pending;
};

/** The contacts of the operator: the site's own first, the server's as soon as they come. */
export const useOperatorInfo = () => {
  const [info, setInfo] = React.useState<OperatorInfo>(cached ?? FALLBACK);

  React.useEffect(() => {
    let alive = true;
    void loadOperatorInfo().then((next) => alive && setInfo(next));
    return () => {
      alive = false;
    };
  }, []);

  return info;
};
