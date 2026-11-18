'use client';

import React from 'react';

import { useMinWidth } from '@/hooks';

const PhoneContext = React.createContext(false);

/**
 * Tells the client components whether the request came from a phone (its User-Agent), so the
 * server renders one layout of a list or a photo block instead of both (a phone and a laptop
 * variant of every card doubled the DOM and the HTML of a page, BLD-485).
 */
export const DeviceProvider = ({
  phone,
  children
}: React.PropsWithChildren<{ phone: boolean }>) => (
  <PhoneContext.Provider value={phone}>{children}</PhoneContext.Provider>
);

/**
 * Whether the screen is a laptop (768px and wider). On the server and while hydrating the
 * User-Agent decides, so the first paint matches the server markup; then the real width does.
 */
export const useIsDesktop = () => {
  const phone = React.useContext(PhoneContext);
  return useMinWidth(768) ?? !phone;
};
