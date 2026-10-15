'use client';

import { useLocale } from 'next-intl';
import Script from 'next/script';
import React from 'react';

import { trackEvent } from '@/lib/analytics';

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

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

  if (!GTM_ID) return null;

  return (
    <>
      <Script id='gtm' strategy='afterInteractive'>
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
      </Script>
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
