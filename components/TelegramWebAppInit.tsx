'use client';

import { backButton, closingBehavior, init, miniApp, viewport } from '@tma.js/sdk-react';
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

      // Mount the back button (required before using it)
      backButton.mount();

      // Configure Mini App - use ready() to expand
      miniApp.ready();

      // Disable vertical swipes - check if method exists
      try {
        if ('disableVerticalSwipes' in viewport) {
          (viewport as any).disableVerticalSwipes();
        }
      } catch {
        // Method not available
      }

      // Enable closing confirmation
      closingBehavior.enableConfirmation();

      // Force light mode colors
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
      // Track navigation: add to stack if it's a new pathname
      const lastPath = historyStackRef.current[historyStackRef.current.length - 1];
      if (pathname !== lastPath) {
        historyStackRef.current.push(pathname);
      }
    }
  }, [pathname]);

  // Colors are set once during initialization
  // Theme changes are handled by re-applying colors if needed

  // Check if we can go back using history stack
  const canGoBack = (): boolean => {
    if (typeof window === 'undefined') return false;

    // Check if we have browser history
    if (window.history.length > 1) {
      return true;
    }

    // Check if we have navigation history in our stack
    if (historyStackRef.current.length > 1) {
      return true;
    }

    // Check if current pathname differs from initial
    return initialPathnameRef.current !== null && pathname !== initialPathnameRef.current;
  };

  // Handle back button setup and visibility
  useEffect(() => {
    if (!initializedRef.current || !backButton.isMounted()) return;
    if (typeof window === 'undefined') return;

    // Handler uses window.history.back() for better webview compatibility
    const handler = () => {
      // Remove current path from stack
      if (historyStackRef.current.length > 1) {
        historyStackRef.current.pop();
      }
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

    updateBackButtonVisibility();

    // Listen to popstate events to update back button when user navigates back
    const handlePopState = () => {
      // Remove last path from stack when going back
      if (historyStackRef.current.length > 1) {
        historyStackRef.current.pop();
      }
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
