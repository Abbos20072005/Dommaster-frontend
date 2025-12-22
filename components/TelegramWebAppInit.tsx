'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

// Global Declaration for window.Telegram
declare global {
  interface Window {
    Telegram: {
      WebApp: WebApp;
    };
  }
}

const initTelegramWebApp = (router: ReturnType<typeof useRouter>) => {
  if (typeof window === 'undefined' || !window.Telegram?.WebApp) {
    return null;
  }

  const webApp = window.Telegram.WebApp;

  // Initialize Telegram Web App
  webApp.ready(); // Signal app is ready
  webApp.expand(); // Expand the app to full height

  // Disable vertical swipes to prevent closing the app on swipe down
  if (webApp.isVersionAtLeast('7.7')) {
    webApp.disableVerticalSwipes();
  }

  webApp.enableClosingConfirmation(); // Confirm before closing

  // Back button setup - store handler reference for cleanup
  const backButtonHandler = () => {
    router.back();
  };
  webApp.BackButton.show();
  webApp.BackButton.onClick(backButtonHandler);

  // Header and Background Customization
  // Use themeParams if available, otherwise use fallback colors
  const theme = webApp.themeParams;
  if (theme) {
    webApp.setHeaderColor(theme.bg_color || '#FFFFFF');
    webApp.setBackgroundColor(theme.secondary_bg_color || '#F0F0F0');
    webApp.setBottomBarColor(theme.bottom_bar_bg_color || '#000000');
  } else {
    // Fallback colors
    webApp.setHeaderColor('#00257AFF');
    webApp.setBackgroundColor('#FFB700FF');
    webApp.setBottomBarColor('#000000FF');
  }

  // Listen for theme changes and re-apply
  const themeChangedHandler = () => {
    const updatedTheme = webApp.themeParams;
    if (updatedTheme) {
      webApp.setHeaderColor(updatedTheme.bg_color || '#FFFFFF');
      webApp.setBackgroundColor(updatedTheme.secondary_bg_color || '#F0F0F0');
      webApp.setBottomBarColor(updatedTheme.bottom_bar_bg_color || '#000000');
    }
  };

  webApp.onEvent('themeChanged', themeChangedHandler);

  // Return cleanup function
  return () => {
    webApp.BackButton.hide();
    webApp.BackButton.offClick(backButtonHandler);
    webApp.offEvent('themeChanged', themeChangedHandler);
  };
};

export const TelegramWebAppInit = () => {
  const router = useRouter();
  const cleanupRef = useRef<(() => void) | null>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    // Function to check and initialize Telegram Web App
    const checkAndInit = () => {
      if (initializedRef.current) return;

      if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
        initializedRef.current = true;
        cleanupRef.current = initTelegramWebApp(router) || null;
      }
    };

    // Check immediately
    checkAndInit();

    // If not available, set up listeners and polling
    if (!initializedRef.current) {
      // Listen for custom event when script loads
      const handleScriptLoad = () => {
        checkAndInit();
      };

      window.addEventListener('telegram-web-app-loaded', handleScriptLoad);

      // Also poll as a fallback (with timeout)
      const maxAttempts = 50; // 5 seconds max (50 * 100ms)
      let attempts = 0;

      const intervalId = setInterval(() => {
        attempts++;
        checkAndInit();

        if (initializedRef.current || attempts >= maxAttempts) {
          clearInterval(intervalId);
        }
      }, 100);

      return () => {
        clearInterval(intervalId);
        window.removeEventListener('telegram-web-app-loaded', handleScriptLoad);
        if (cleanupRef.current) {
          cleanupRef.current();
        }
      };
    }

    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
      }
    };
  }, [router]);

  return null;
};
