'use client';

import { useLocale } from 'next-intl';
import React from 'react';

import { trackEvent } from '@/lib/analytics';

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

/** the tag manager starts loading this long after the page opened, and not sooner than `GTM_PAUSE` after it is interactive (ms) */
const GTM_START = 2000;
const GTM_PAUSE = 500;

/**
 * Google Tag Manager (GA4 and Yandex Metrika are connected inside it) and the clicks on the phone
 * and Telegram links. Nothing is loaded while `NEXT_PUBLIC_GTM_ID` is not set.
 */
export const Analytics = () => {
  const locale = useLocale();

  React.useEffect(() => {
    // one handler for every phone / Telegram link of the site
    const onClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement | null)?.closest?.('a');
      const href = link?.getAttribute('href') ?? '';
      if (href.startsWith('tel:')) trackEvent('phone_click', { link_url: href });
      else if (/(^|\/\/)(t\.me|telegram\.me)\//.test(href)) {
        trackEvent('telegram_click', { link_url: href });
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  React.useEffect(() => {
    // the language is a user parameter of every event after this one
    trackEvent('set_language', { language: locale });
  }, [locale]);

  React.useEffect(() => {
    if (!GTM_ID || document.getElementById('gtm')) return;

    // Not `lazyOnload`: it waits for the `load` event, and on a heavy page (banners, product
    // photos) that came ~12 s after the opening, so a visit shorter than that was never counted
    // by GA4 (BLD-536). GTM (with GA4 and Metrika inside) is the heaviest third-party script and
    // its long tasks counted into TBT (BLD-395), so it still waits: until 2 s after the opening
    // (and 0.5 s after the page is interactive on a slow phone), then the first idle moment (at
    // most 0.5 s more). `page_view` goes out at about 2-3 s; what is pushed into the dataLayer
    // before waits in the queue.
    let idle: number | undefined;
    const load = () => {
      if (document.getElementById('gtm')) return;
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
      const script = document.createElement('script');
      script.async = true;
      script.id = 'gtm';
      script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
      document.head.appendChild(script);
    };
    const timer = window.setTimeout(
      () => {
        if ('requestIdleCallback' in window)
          idle = window.requestIdleCallback(load, { timeout: 500 });
        else load();
      },
      Math.max(GTM_PAUSE, GTM_START - performance.now())
    );

    return () => {
      window.clearTimeout(timer);
      if (idle !== undefined) window.cancelIdleCallback(idle);
    };
  }, []);

  if (!GTM_ID) return null;

  return (
    <>
      <noscript>
        <iframe
          height='0'
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          style={{ display: 'none', visibility: 'hidden' }}
          width='0'
        />
      </noscript>
    </>
  );
};
