import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { getTranslations } from 'next-intl/server';

interface Props {
  children: ReactNode;
  params: Promise<{ id: string }>;
}

// the order page is a client component, so its own title is set here
export async function generateMetadata({ params }: Pick<Props, 'params'>): Promise<Metadata> {
  const t = await getTranslations();
  const { id } = await params;

  return { title: `${t('Order')} №${id}` };
}

const OrderLayout = ({ children }: Pick<Props, 'children'>) => children;

export default OrderLayout;
