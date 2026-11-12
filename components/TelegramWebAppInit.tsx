'use client';

import { useCallback, useEffect, useState } from 'react';

import { usePathname } from '@/i18n/navigation';

type TelegramSdk = typeof import('@tma.js/sdk-react');

/**
 * Telegram puts its launch parameters into the address (`#tgWebAppData=...`) and the SDK keeps them
 * in the session storage, so a visitor of the plain site has neither.
 */
const isTelegramMiniApp = () => {
  try {
    return (
      window.location.hash.includes('tgWebApp') ||
      window.sessionStorage.getItem('tapps/launchParams') !== null
    );
  } catch {
    return window.location.hash.includes('tgWebApp');
  }
};

export const TelegramWebAppInit = () => {
  const pathname = usePathname();
  const [sdk, setSdk] = useState<TelegramSdk | null>(null);

  // ---------- INIT ----------
  // the SDK is loaded only inside Telegram: on the site it was ~100 KB of script for nothing (BLD-395)
  useEffect(() => {
    if (!isTelegramMiniApp()) return;

    let cancelled = false;
    import('@tma.js/sdk-react')
      .then((loaded) => {
        if (cancelled) return;
        const { backButton, closingBehavior, init, miniApp, swipeBehavior, viewport } = loaded;
        try {
          init();

          backButton.mount();
          closingBehavior.mount();
          swipeBehavior.mount();

          miniApp.mount();
          miniApp.ready();

          closingBehavior.enableConfirmation();
          swipeBehavior.disableVertical();

          viewport.expand();
          miniApp.setHeaderColor('#00257AFF');
          miniApp.setBottomBarColor('#000000FF');
        } catch (error) {
          console.warn('Telegram Web App SDK failed to initialize:', error);
        }
        setSdk(loaded);
      })
      .catch((error) => console.warn('Telegram Web App SDK failed to load:', error));

    return () => {
      cancelled = true;
    };
  }, []);

  // ---------- BACK BUTTON HANDLER ----------
  const onBackButtonClick = useCallback(() => {
    window.history.back();
  }, []);

  // ---------- NAV TRACK ----------
  useEffect(() => {
    if (!sdk) return;
    const { backButton } = sdk;
    if (!backButton.isMounted()) return;
    pathname === '/' ? backButton.hide() : backButton.show();

    backButton.onClick(onBackButtonClick);
    return () => backButton.offClick(onBackButtonClick);
  }, [sdk, pathname, onBackButtonClick]);

  return null;
};
