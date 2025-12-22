'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// Global Declaration for window.Telegram
declare global {
  interface Window {
    Telegram: {
      WebApp: WebApp;
    };
  }
}

export const TelegramWebAppInit = () => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      const webApp = window.Telegram.WebApp;

      webApp.ready(); // Signal app is ready
      webApp.expand(); // Expand the app to full height

      // Disable vertical swipes to prevent closing the app on swipe down
      if (webApp.isVersionAtLeast('7.7')) {
        webApp.disableVerticalSwipes();
      }

      webApp.enableClosingConfirmation(); // Confirm before closing

      // Back button setup (from previous)
      webApp.BackButton.show();
      webApp.BackButton.onClick(() => {
        router.back();
      });

      // Header and Background Customization
      // Option 1: Use predefined keywords for theme consistency
      webApp.setHeaderColor('#00257AFF'); // Matches main background
      webApp.setBackgroundColor('#FFB700FF'); // Secondary for contrast
      webApp.setBottomBarColor('#000000FF'); // Bottom bar (Bot API 7.10+)

      // Option 2: Use hex values (e.g., for branding)
      // webApp.setHeaderColor('#FFFFFF'); // White header
      // webApp.setBackgroundColor('#F0F0F0'); // Light gray background
      // webApp.setBottomBarColor('#000000'); // Black bottom bar

      // Option 3: Dynamic from themeParams (recommended for light/dark adaptation)
      const theme = webApp.themeParams;
      if (theme) {
        webApp.setHeaderColor(theme.bg_color || '#FFFFFF'); // Fallback to white
        webApp.setBackgroundColor(theme.secondary_bg_color || '#F0F0F0');
        webApp.setBottomBarColor(theme.bottom_bar_bg_color || '#000000');
      }

      // Listen for theme changes and re-apply
      webApp.onEvent('themeChanged', () => {
        const updatedTheme = webApp.themeParams;
        if (updatedTheme) {
          webApp.setHeaderColor(updatedTheme.bg_color || '#FFFFFF');
          webApp.setBackgroundColor(updatedTheme.secondary_bg_color || '#F0F0F0');
          webApp.setBottomBarColor(updatedTheme.bottom_bar_bg_color || '#000000');
        }
      });

      // Cleanup (optional)
      return () => {
        webApp.BackButton.hide();
        webApp.BackButton.onClick(() => {});
        webApp.offEvent('themeChanged', () => {});
      };
    }
  }, [router]);

  return null;
};
