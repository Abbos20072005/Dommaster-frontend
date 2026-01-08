'use client';

import {
  backButton,
  closingBehavior,
  init,
  miniApp,
  swipeBehavior,
  viewport
} from '@tma.js/sdk-react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

const STORAGE_KEY = '__tg_nav_depth__';

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
  useEffect(() => {
    if (typeof window === 'undefined' || !initializedRef.current || !backButton.isMounted()) return;

    const raw = sessionStorage.getItem(STORAGE_KEY);
    const depth = raw ? Number(raw) : 0;

    sessionStorage.setItem(STORAGE_KEY, String(depth + 1));

    if (depth > 0) backButton.show();
    else backButton.hide();
  }, [pathname]);

  // ---------- BACK BUTTON ----------
  useEffect(() => {
    if (typeof window === 'undefined' || !initializedRef.current || !backButton.isMounted()) return;
    const handler = () => {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      const depth = raw ? Number(raw) : 1;

      sessionStorage.setItem(STORAGE_KEY, String(Math.max(depth - 1, 0)));
      router.back();
    };

    backButton.onClick(handler);
    return () => backButton.offClick(handler);
  }, [router]);

  return null;
};
