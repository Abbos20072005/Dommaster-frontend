'use client';

import {
  backButton,
  closingBehavior,
  init,
  miniApp,
  swipeBehavior,
  viewport
} from '@tma.js/sdk-react';
import { useCallback, useEffect, useRef } from 'react';

import { usePathname } from '@/i18n/navigation';

export const TelegramWebAppInit = () => {
  const pathname = usePathname();
  const initializedRef = useRef(false);

  // ---------- INIT ----------
  useEffect(() => {
    if (typeof window === 'undefined' || initializedRef.current) return;

    try {
      init();

      backButton.mount();
      closingBehavior.mount();
      swipeBehavior.mount();

      miniApp.ready();

      closingBehavior.enableConfirmation();
      swipeBehavior.disableVertical();

      viewport.expand();
      miniApp.setHeaderColor('#00257AFF');
      miniApp.setBottomBarColor('#000000FF');

      initializedRef.current = true;
    } catch (error) {
      console.warn('Telegram Web App SDK failed to initialize:', error);
    }
  }, []);

  // ---------- BACK BUTTON HANDLER ----------
  const onBackButtonClick = useCallback(() => {
    window.history.back();
  }, []);

  // ---------- NAV TRACK ----------
  useEffect(() => {
    if (typeof window === 'undefined' || !initializedRef.current) return;

    if (pathname === '/') {
      backButton.hide();
    } else {
      // Small delay helps avoid Telegram UI race conditions
      setTimeout(() => backButton.show(), 0);
    }

    backButton.onClick(onBackButtonClick);

    return () => {
      backButton.offClick(onBackButtonClick);
    };
  }, [pathname, onBackButtonClick]);

  return null;
};
