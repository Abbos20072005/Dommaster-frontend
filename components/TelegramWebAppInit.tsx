'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

// Global Declaration for window.Telegram (narrowed to what's actually used)
declare global {
  interface Window {
    Telegram?: {
      WebApp?: WebApp;
    };
  }
}

// Type for WebApp (inferred from usage; expand as needed based on Telegram docs)
interface WebApp {
  disableVerticalSwipes: () => void;
  enableClosingConfirmation: () => void;
  expand: () => void;
  isVersionAtLeast: (version: string) => boolean;
  offEvent: (event: 'themeChanged', handler: () => void) => void;
  onEvent: (event: 'themeChanged', handler: () => void) => void;
  ready: () => void;
  setBackgroundColor: (color: string) => void;
  setBottomBarColor: (color: string) => void;
  setHeaderColor: (color: string) => void;
  BackButton: {
    onClick: (handler: () => void) => void;
    offClick: (handler: () => void) => void;
    show: () => void;
    hide: () => void;
  };
}

// Initialization function (extracted and typed for clarity)
const initTelegramWebApp = (
  router: ReturnType<typeof useRouter>,
  updateBackButton: () => void
): (() => void) => {
  if (typeof window === 'undefined' || !window.Telegram?.WebApp) {
    return () => {}; // Empty cleanup if not available
  }

  const webApp = window.Telegram.WebApp;

  webApp.ready();
  webApp.expand();

  if (webApp.isVersionAtLeast('7.7')) {
    webApp.disableVerticalSwipes();
  }

  webApp.enableClosingConfirmation();

  // Back button handler
  const backButtonHandler = () => {
    router.back();
  };
  webApp.BackButton.onClick(backButtonHandler);

  // Initial back button update
  updateBackButton();

  // Color settings (forcing light mode as per original)
  webApp.setHeaderColor('#00257AFF');
  webApp.setBackgroundColor('#FFFFFFFF');
  webApp.setBottomBarColor('#000000FF');

  // Theme change handler (overrides to keep light mode)
  const themeChangedHandler = () => {
    webApp.setHeaderColor('#00257AFF');
    webApp.setBackgroundColor('#FFFFFFFF');
    webApp.setBottomBarColor('#000000FF');
  };
  webApp.onEvent('themeChanged', themeChangedHandler);

  // Cleanup function
  return () => {
    webApp.BackButton.offClick(backButtonHandler);
    webApp.offEvent('themeChanged', themeChangedHandler);
    webApp.BackButton.hide(); // Ensure hidden on cleanup
  };
};

export const TelegramWebAppInit = () => {
  const router = useRouter();
  const pathname = usePathname();
  const cleanupRef = useRef<(() => void) | null>(null);
  const initializedRef = useRef(false);
  const webAppRef = useRef<WebApp | null>(null);
  const initialPathnameRef = useRef<string | null>(null);

  // Set initial pathname on first render (useEffect with [] ensures it runs once)
  useEffect(() => {
    if (initialPathnameRef.current === null) {
      initialPathnameRef.current = pathname;
    }
  }, []); // Empty deps: Runs once after mount

  // Determine if back navigation is possible
  const canGoBack = (): boolean => {
    // Primary check: Has pathname changed from initial?
    if (initialPathnameRef.current !== null && pathname !== initialPathnameRef.current) {
      return true;
    }
    // Fallback: Browser history length (though less reliable in Next.js client routing)
    return typeof window !== 'undefined' && window.history.length > 1;
  };

  // Update back button visibility
  const updateBackButton = () => {
    if (!webAppRef.current) return;
    if (canGoBack()) {
      webAppRef.current.BackButton.show();
    } else {
      webAppRef.current.BackButton.hide();
    }
  };

  // Update back button on pathname changes
  useEffect(() => {
    updateBackButton();
  }, [pathname]);

  // Handle browser popstate for history changes
  useEffect(() => {
    const handlePopState = () => {
      // Debounce slightly to allow state to settle
      setTimeout(updateBackButton, 0);
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []); // Empty deps: Listener is static

  // Main initialization effect
  useEffect(() => {
    const checkAndInit = () => {
      if (initializedRef.current) return;

      if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
        initializedRef.current = true;
        webAppRef.current = window.Telegram.WebApp;
        cleanupRef.current = initTelegramWebApp(router, updateBackButton);
      }
    };

    checkAndInit();

    if (!initializedRef.current) {
      // Listener for custom event (if script loads dynamically)
      const handleScriptLoad = () => checkAndInit();
      window.addEventListener('telegram-web-app-loaded', handleScriptLoad);

      // Polling fallback (max 5s)
      const maxAttempts = 50;
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
          cleanupRef.current = null;
        }
      };
    }

    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
    };
  }, [router]);

  return null;
};
