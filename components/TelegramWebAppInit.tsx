'use client';

import WebApp from '@twa-dev/sdk';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

export const TelegramWebAppInit = () => {
  const router = useRouter();
  const pathname = usePathname();
  const initialPathnameRef = useRef<string | null>(null);
  const backButtonHandlerRef = useRef<(() => void) | null>(null);

  // Initialize Telegram Web App on mount
  useEffect(() => {
    // Configure Web App settings
    WebApp.ready();
    WebApp.expand();

    if (WebApp.isVersionAtLeast('7.7')) {
      WebApp.disableVerticalSwipes();
    }

    WebApp.enableClosingConfirmation();

    // Force light mode colors
    WebApp.setHeaderColor('#00257AFF');
    WebApp.setBackgroundColor('#FFFFFFFF');
    WebApp.setBottomBarColor('#000000FF');
  }, []);

  // Handle theme changes to maintain light mode
  useEffect(() => {
    const handleThemeChange = () => {
      WebApp.setHeaderColor('#00257AFF');
      WebApp.setBackgroundColor('#FFFFFFFF');
      WebApp.setBottomBarColor('#000000FF');
    };

    WebApp.onEvent('themeChanged', handleThemeChange);

    return () => {
      WebApp.offEvent('themeChanged', handleThemeChange);
    };
  }, []);

  // Track initial pathname
  useEffect(() => {
    if (initialPathnameRef.current === null) {
      initialPathnameRef.current = pathname;
    }
  }, []);

  // Determine if back navigation is possible
  const canGoBack = (): boolean => {
    if (initialPathnameRef.current !== null && pathname !== initialPathnameRef.current) {
      return true;
    }
    try {
      return typeof window !== 'undefined' && window.history && window.history.length > 1;
    } catch {
      return false;
    }
  };

  // Handle back button click
  useEffect(() => {
    const handler = () => {
      router.back();
    };

    backButtonHandlerRef.current = handler;
    WebApp.BackButton.onClick(handler);

    return () => {
      if (backButtonHandlerRef.current) {
        WebApp.BackButton.offClick(backButtonHandlerRef.current);
        backButtonHandlerRef.current = null;
      }
    };
  }, [router]);

  // Update back button visibility based on navigation state
  useEffect(() => {
    try {
      if (canGoBack()) {
        WebApp.BackButton.show();
      } else {
        WebApp.BackButton.hide();
      }
    } catch {
      // Fallback: hide back button if there's an error
      WebApp.BackButton.hide();
    }
  }, [pathname]);

  // Handle browser popstate for history changes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let timeoutId: NodeJS.Timeout;

    const handlePopState = () => {
      timeoutId = setTimeout(() => {
        try {
          // Check current pathname after popstate
          const currentPath = window.location.pathname;
          const canNavigateBack =
            (initialPathnameRef.current !== null && currentPath !== initialPathnameRef.current) ||
            (typeof window !== 'undefined' && window.history && window.history.length > 1);

          if (canNavigateBack) {
            WebApp.BackButton.show();
          } else {
            WebApp.BackButton.hide();
          }
        } catch {
          // Fallback: hide back button if there's an error accessing history
          WebApp.BackButton.hide();
        }
      }, 0);
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  return null;
};
