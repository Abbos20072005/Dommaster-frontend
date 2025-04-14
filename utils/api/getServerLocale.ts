'use server';

import { headers } from 'next/headers';

export const getServerLocale = async () => {
  const headersStore = await headers();
  return headersStore.get('Accept-Language')?.slice(0, 2);
};
