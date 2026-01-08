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

import { usePathname, useRouter } from '@/i18n/navigation';

export const TelegramWebAppInit = () => {
  const pathname = usePathname();
  const router = useRouter();
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

  // ---------- NAV TRACK ----------
  const onBackButtonClick = useCallback(() => {
    router.back();
  }, [router]);

  useEffect(() => {
    if (typeof window === 'undefined' || !initializedRef.current || !backButton.isMounted()) return;

    if (pathname === '/') backButton.hide();
    else if (pathname !== '/') backButton.show();

    backButton.onClick(onBackButtonClick);
    return () => {
      backButton.offClick(onBackButtonClick);
    };
  }, [pathname, backButton, onBackButtonClick]);

  return null;
};
