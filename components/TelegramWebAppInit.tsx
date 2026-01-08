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
    if (initializedRef.current) return;

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
  }, []);

  // ---------- NAV TRACK ----------
  useEffect(() => {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    const depth = raw ? Number(raw) : 0;

    sessionStorage.setItem(STORAGE_KEY, String(depth + 1));

    if (depth > 0) backButton.show();
    else backButton.hide();
  }, [pathname]);

  // ---------- BACK BUTTON ----------
  useEffect(() => {
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
