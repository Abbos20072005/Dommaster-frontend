import type { Metadata } from 'next';

import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Inter, Roboto_Mono } from 'next/font/google';
import { notFound } from 'next/navigation';
import React from 'react';

import type { Locale } from '@/i18n/routing';

import { AppFooter, AppHeader } from '@/components/layout';
import { Providers } from '@/components/Providers';
import { routing } from '@/i18n/routing';

import '@/styles/globals.css';

const fontSans = Inter({
  variable: '--font-inter-sans',
  subsets: ['latin', 'cyrillic']
});

const fontMono = Roboto_Mono({
  variable: '--font-roboto-mono',
  subsets: ['latin', 'cyrillic']
});

export const metadata: Metadata = {
  title: 'Dommaster',
  description: 'Dommaster'
};

const RootLayout = async ({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}>) => {
  const { locale } = await params;

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages();
  return (
    <html
      className={`${fontSans.variable} ${fontMono.variable} antialiased`}
      lang={locale}
      suppressHydrationWarning
    >
      <Providers>
        <NextIntlClientProvider messages={messages}>
          <body>
            <div className='flex min-h-svh flex-col'>
              <AppHeader />
              <main className='w-full flex-grow'>{children}</main>
            </div>
            <AppFooter />
          </body>
        </NextIntlClientProvider>
      </Providers>
    </html>
  );
};
export default RootLayout;
