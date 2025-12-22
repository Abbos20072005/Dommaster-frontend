'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

// Global Declaration for window.Telegram
declare global {
  interface Window {
    Telegram: {
      WebApp: WebApp;
    };
  }
}

const initTelegramWebApp = (router: ReturnType<typeof useRouter>, updateBackButton: () => void) => {
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
  webApp.BackButton.onClick(backButtonHandler);

  // Initial back button visibility check
  updateBackButton();

  // Header and Background Customization
  // Use primary color for header (light mode only)
  webApp.setHeaderColor('#00257AFF'); // Primary color
  webApp.setBackgroundColor('#FFFFFFFF'); // White background
  webApp.setBottomBarColor('#000000FF'); // Black bottom bar

  // Listen for theme changes but keep using primary color
  const themeChangedHandler = () => {
    webApp.setHeaderColor('#00257AFF');
    webApp.setBackgroundColor('#FFFFFFFF');
    webApp.setBottomBarColor('#000000FF');
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
  const pathname = usePathname();
  const cleanupRef = useRef<(() => void) | null>(null);
  const initializedRef = useRef(false);
  const webAppRef = useRef<WebApp | null>(null);
  const initialPathnameRef = useRef<string | null>(null);
  const previousPathnameRef = useRef<string | null>(null);

  // Function to check if we can go back
  const canGoBack = () => {
    // If pathname has changed from initial, we can go back
    if (initialPathnameRef.current !== null && pathname !== initialPathnameRef.current) {
      return true;
    }
    // Check browser history as fallback (only if history length > 1)
    if (typeof window !== 'undefined' && window.history.length > 1) {
      // Double check we're not on the initial page
      return pathname !== initialPathnameRef.current;
    }
    return false;
  };

  // Function to update back button visibility
  const updateBackButton = () => {
    if (!webAppRef.current) return;

    if (canGoBack()) {
      webAppRef.current.BackButton.show();
    } else {
      webAppRef.current.BackButton.hide();
    }
  };

  // Initialize initial pathname on mount
  useEffect(() => {
    if (initialPathnameRef.current === null) {
      initialPathnameRef.current = pathname;
    }
  }, []);

  useEffect(() => {
    // Update back button when pathname changes
    updateBackButton();
    previousPathnameRef.current = pathname;
  }, [pathname]);

  // Listen to popstate (browser back/forward) to update history state
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    const handlePopState = () => {
      // When user goes back, check if we still have history
      if (typeof window !== 'undefined') {
        // Small delay to let history update
        timeoutId = setTimeout(() => {
          updateBackButton();
        }, 0);
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      window.removeEventListener('popstate', handlePopState);
    };
  }, [pathname]);

  useEffect(() => {
    // Function to check and initialize Telegram Web App
    const checkAndInit = () => {
      if (initializedRef.current) return;

      if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
        initializedRef.current = true;
        const webApp = window.Telegram.WebApp;
        webAppRef.current = webApp;
        cleanupRef.current = initTelegramWebApp(router, updateBackButton) || null;
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
