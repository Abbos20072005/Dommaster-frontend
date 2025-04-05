import type { Metadata } from 'next';

import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Inter, Roboto_Mono } from 'next/font/google';
import { notFound } from 'next/navigation';
import React from 'react';

import type { Locale } from '@/i18n/routing';

import { AppFooter, AppHeader, BottomNav } from '@/components/layout';
import { Providers } from '@/components/Providers';
import { Toaster } from '@/components/ui/sonner';
import { routing } from '@/i18n/routing';
import { cn } from '@/lib/utils';

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
      default: `${t('Materials for construction in Dommaster')} - ${t('buy in Tashkent, optimal prices in the internet store Dommaster')}`,
      template: `%s - ${t('buy in Tashkent, optimal prices in the internet store Dommaster')}`
    },
    description: 'Dommaster'
  };
}

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
      <Providers>
        <NextIntlClientProvider>
          <body className='flex h-screen flex-col md:block md:h-auto md:min-h-screen'>
            <div className='flex h-screen flex-1 flex-col overflow-y-auto md:h-auto md:min-h-screen md:overflow-y-visible'>
              <AppHeader />
              <main className='w-full flex-1 flex-grow'>{children}</main>
              <AppFooter />
            </div>
            <BottomNav />
            <Toaster />
          </body>
        </NextIntlClientProvider>
      </Providers>
    </html>
  );
};
export default RootLayout;
