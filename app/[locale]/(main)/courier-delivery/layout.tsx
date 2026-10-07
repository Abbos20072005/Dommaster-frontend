import type { Metadata } from 'next';

import { getTranslations } from 'next-intl/server';
import React from 'react';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return { title: t('Delivery in Tashkent'), description: t('metadata.pages.delivery') };
}

const CourierDeliveryLayout = ({ children }: { children: React.ReactNode }) => children;

export default CourierDeliveryLayout;