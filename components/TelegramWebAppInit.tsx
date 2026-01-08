'use client';

import {
  backButton,
  closingBehavior,
  init,
  miniApp,
  swipeBehavior,
  viewport
} from '@tma.js/sdk-react';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

export const TelegramWebAppInit = () => {
  const pathname = usePathname();
  const initializedRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || initializedRef.current) return;

    try {
      // Initialize the SDK
      init();
      initializedRef.current = true;

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

  const canGoBack = (): boolean => {
    if (typeof window === 'undefined') return false;

    return window.history.length > 1;
  };

  useEffect(() => {
    if (!initializedRef.current || !backButton.isMounted()) return;
    if (typeof window === 'undefined') return;

    const handler = () => {
      window.history.back();
    };

    backButton.onClick(handler);

    const updateBackButtonVisibility = () => {
      if (canGoBack()) {
        backButton.show();
      } else {
        backButton.hide();
      }
    };

    updateBackButtonVisibility();

    const handlePopState = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(updateBackButtonVisibility, 0);
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      backButton.offClick(handler);
    };
  }, [pathname]);

  return null;
};
