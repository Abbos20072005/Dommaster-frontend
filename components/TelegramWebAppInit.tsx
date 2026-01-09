'use client';

import {
  backButton,
  closingBehavior,
  init,
  miniApp,
  swipeBehavior,
  viewport
} from '@tma.js/sdk-react';
import { useCallback, useEffect } from 'react';

import { usePathname } from '@/i18n/navigation';

export const TelegramWebAppInit = () => {
  const pathname = usePathname();

  // ---------- INIT ----------
  useEffect(() => {
    if (typeof window === 'undefined') return;

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
    if (typeof window === 'undefined' || !backButton.isMounted()) return;
    pathname === '/' ? backButton.hide() : backButton.show();

    backButton.onClick(onBackButtonClick);
    return () => backButton.offClick(onBackButtonClick);
  }, [pathname, onBackButtonClick]);

  return null;
};
