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
  const initialPathnameRef = useRef<string | null>(null);
  const historyStackRef = useRef<string[]>([]);
  const initializedRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize SDK once
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

  // Track initial pathname and build history stack
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Set initial pathname on first render
    if (initialPathnameRef.current === null) {
      initialPathnameRef.current = pathname;
      historyStackRef.current = [pathname];
    } else {
      // Track navigation: add to stack if it's a new pathname (forward navigation)
      const lastPath = historyStackRef.current[historyStackRef.current.length - 1];
      if (pathname !== lastPath) {
        // Check if this is forward navigation (new page) or back navigation
        const pathIndex = historyStackRef.current.indexOf(pathname);
        if (pathIndex === -1) {
          // New page - add to stack
          historyStackRef.current.push(pathname);
        } else {
          // Back navigation - remove everything after this path
          historyStackRef.current = historyStackRef.current.slice(0, pathIndex + 1);
        }
      }
    }
  }, [pathname]);

  // Colors are set once during initialization
  // Theme changes are handled by re-applying colors if needed

  // Check if we can go back - primarily check if we're at the initial pathname
  const canGoBack = (): boolean => {
    if (typeof window === 'undefined') return false;
    if (initialPathnameRef.current === null) return false;

    // Primary check: if we're at the initial pathname, we can't go back
    if (pathname === initialPathnameRef.current) {
      return false;
    }

    // Secondary check: if we have navigation history in our stack
    if (historyStackRef.current.length > 1) {
      return true;
    }

    // Fallback: check if current pathname differs from initial
    return pathname !== initialPathnameRef.current;
  };

  // Handle back button setup and visibility
  useEffect(() => {
    if (!initializedRef.current || !backButton.isMounted()) return;
    if (typeof window === 'undefined') return;

    // Handler uses window.history.back() for better webview compatibility
    const handler = () => {
      window.history.back();
    };

    // Set up click handler using onClick method
    backButton.onClick(handler);

    // Update visibility based on navigation state
    const updateBackButtonVisibility = () => {
      if (canGoBack()) {
        backButton.show();
      } else {
        backButton.hide();
      }
    };

    // Update visibility whenever pathname changes
    updateBackButtonVisibility();

    // Listen to popstate events to update back button when user navigates back
    const handlePopState = () => {
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      // Small delay to ensure pathname has updated
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
