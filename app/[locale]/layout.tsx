import type { Metadata, Viewport } from 'next';

import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Inter, Roboto_Mono } from 'next/font/google';
import { notFound } from 'next/navigation';
import NextTopLoader from 'nextjs-toploader';
import React from 'react';

import type { Locale } from '@/i18n/routing';

import { AppFooter, AppHeader, BottomNav, FloatingActions } from '@/components/layout';
import { Providers } from '@/components/Providers';
import { TelegramWebAppInit } from '@/components/TelegramWebAppInit';
import { Toaster } from '@/components/ui/sonner';
import { routing } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { BASE_URL } from '@/utils/constants';

import '@/styles/globals.css';

const fontSans = Inter({
  variable: '--font-inter-sans',
  subsets: ['latin', 'cyrillic']
});

const fontMono = Roboto_Mono({
  variable: '--font-roboto-mono',
  subsets: ['latin', 'cyrillic']
});

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    title: {
      default: t('metadata.title.default'),
      template: `%s - ${t('metadata.title.template')}`
    },
    description: t('metadata.description'),
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon-16x16.png',
      apple: '/apple-touch-icon.png'
    },
    verification: {
      google: 'lv09WTXqHseTIi7QrNrGB3JgW9XDVKrt0NA0BjOQe6o',
      yandex: 'cf2ea6baab395be9'
    },
    openGraph: {
      title: t('metadata.title.default'),
      description: t('metadata.description'),
      images: [
        {
          url: `${BASE_URL}/og.png`,
          width: 900,
          height: 600,
          alt: t('metadata.title.default')
        }
      ],
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: t('metadata.title.default'),
      description: t('metadata.description'),
      images: [
        {
          url: `${BASE_URL}/og.png`,
          width: 900,
          height: 600,
          alt: t('metadata.title.default')
        }
      ]
    }
  };
}

export const viewport: Viewport = {
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  userScalable: false
};

const RootLayout = async ({ children, params }: Readonly<Props>) => {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html
      className={cn(fontSans.variable, fontMono.variable, 'antialiased')}
      lang={locale}
      suppressHydrationWarning
    >
      <body className='flex min-h-screen flex-col font-sans antialiased'>
        <NextIntlClientProvider>
          <Providers>
            <NextTopLoader height={5} color='var(--secondary)' showSpinner={false} />
            <TelegramWebAppInit />
            <AppHeader />
            <main className='flex-1'>{children}</main>
            <AppFooter />
            <BottomNav />
            <Toaster />
            <FloatingActions />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};
export default RootLayout;
