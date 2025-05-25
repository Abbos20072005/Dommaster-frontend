import type { Metadata, Viewport } from 'next';

import { MessageSquareTextIcon } from 'lucide-react';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Inter, Roboto_Mono } from 'next/font/google';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import React from 'react';

import type { Locale } from '@/i18n/routing';

import { AppFooter, AppHeader, BottomNav } from '@/components/layout';
import { ChatDialog } from '@/components/modules/chat';
import { Providers } from '@/components/Providers';
import { Button } from '@/components/ui/button';
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
      <NextIntlClientProvider>
        <Providers>
          <body className='flex min-h-screen flex-col font-sans antialiased'>
            <AppHeader />
            <main className='flex-1'>{children}</main>
            <AppFooter />
            <BottomNav />
            <Toaster />
            <div className='fixed right-12 bottom-12 z-50 hidden items-center gap-2 md:flex md:flex-col'>
              <Button asChild className='rounded-full' size='icon' variant='outline'>
                <a href='https://t.me/dommasteruz' rel='noreferrer' target='_blank'>
                  <Image alt='telegram' height={40} src='/logos/telegram.png' width={40} />
                </a>
              </Button>
              <ChatDialog asChild>
                <Button className='rounded-full' size='iconLg' variant='secondary'>
                  <MessageSquareTextIcon className='size-6' />
                </Button>
              </ChatDialog>
            </div>
          </body>
        </Providers>
      </NextIntlClientProvider>
    </html>
  );
};
export default RootLayout;
