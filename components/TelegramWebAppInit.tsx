'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export const TelegramWebAppInit = () => {
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
        console.warn('Telegram Web App SDK failed to load:', error);
      }
    };

    loadWebApp();
  }, []);

  // Handle theme changes to maintain light mode and track initial pathname
  useEffect(() => {
    if (!webAppLoaded || !webAppRef.current) return;

    const WebApp = webAppRef.current;
    const handleThemeChange = () => {
      WebApp.setHeaderColor('#00257AFF');
      WebApp.setBackgroundColor('#FFFFFFFF');
      WebApp.setBottomBarColor('#000000FF');
    };

    WebApp.onEvent('themeChanged', handleThemeChange);

    // Set initial pathname if not already set
    if (initialPathnameRef.current === null) {
      initialPathnameRef.current = pathname;
    }

    return () => {
      WebApp.offEvent('themeChanged', handleThemeChange);
    };
  }, [webAppLoaded, pathname]);

  // Simplified: Check if current pathname differs from initial (reliable in webviews)
  const canGoBack = (): boolean => {
    return initialPathnameRef.current !== null && pathname !== initialPathnameRef.current;
  };

  // Handle back button setup and visibility
  useEffect(() => {
    if (!webAppLoaded || !webAppRef.current) return;

    const WebApp = webAppRef.current;

    // Handler uses window.history.back() for better webview compatibility
    const handler = () => {
      window.history.back();
    };

    backButtonHandlerRef.current = handler;
    WebApp.BackButton.onClick(handler);

    // Update visibility
    if (canGoBack()) {
      WebApp.BackButton.show();
    } else {
      WebApp.BackButton.hide();
    }

    return () => {
      if (backButtonHandlerRef.current) {
        WebApp.BackButton.offClick(backButtonHandlerRef.current);
        backButtonHandlerRef.current = null;
      }
    };
  }, [webAppLoaded, pathname]);

  return null;
};
