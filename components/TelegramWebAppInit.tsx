'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export const TelegramWebAppInit = () => {
  const router = useRouter();
  const pathname = usePathname();
  const initialPathnameRef = useRef<string | null>(null);
  const backButtonHandlerRef = useRef<(() => void) | null>(null);
  const [webAppLoaded, setWebAppLoaded] = useState(false);
  const webAppRef = useRef<any>(null);

  // Dynamically load Telegram Web App SDK only on client side
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const loadWebApp = async () => {
      try {
        const WebApp = (await import('@twa-dev/sdk')).default;
        webAppRef.current = WebApp;

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

        setWebAppLoaded(true);
      } catch (error) {
        // Silently fail if SDK can't be loaded (e.g., not in Telegram environment)
        console.warn('Telegram Web App SDK failed to load:', error);
      }
    };

    loadWebApp();
  }, []);

  // Handle theme changes to maintain light mode
  useEffect(() => {
    if (!webAppLoaded || !webAppRef.current) return;

    const WebApp = webAppRef.current;
    const handleThemeChange = () => {
      WebApp.setHeaderColor('#00257AFF');
      WebApp.setBackgroundColor('#FFFFFFFF');
      WebApp.setBottomBarColor('#000000FF');
    };

    WebApp.onEvent('themeChanged', handleThemeChange);

    return () => {
      WebApp.offEvent('themeChanged', handleThemeChange);
    };
  }, [webAppLoaded]);

  // Track initial pathname
  useEffect(() => {
    if (initialPathnameRef.current === null) {
      initialPathnameRef.current = pathname;
    }
  }, [pathname]);

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
    if (!webAppLoaded || !webAppRef.current) return;

    const WebApp = webAppRef.current;
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
  }, [router, webAppLoaded]);

  // Update back button visibility based on navigation state
  useEffect(() => {
    if (!webAppLoaded || !webAppRef.current) return;

    const WebApp = webAppRef.current;
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
  }, [pathname, webAppLoaded]);

  // Handle browser popstate for history changes
  useEffect(() => {
    if (typeof window === 'undefined' || !webAppLoaded || !webAppRef.current) return;

    const WebApp = webAppRef.current;
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
  }, [webAppLoaded]);

  return null;
};
