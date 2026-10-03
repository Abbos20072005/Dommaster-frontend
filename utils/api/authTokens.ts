import Cookies from 'js-cookie';

import { COOKIES } from '@/utils/constants';

export const setAuthTokens = (accessToken: string, refreshToken?: string) => {
  const options = {
    path: '/',
    sameSite: 'lax',
    secure: window.location.protocol === 'https:'
  } as const;

  Cookies.set(COOKIES.ACCESS_TOKEN, accessToken, options);
  if (refreshToken) Cookies.set(COOKIES.REFRESH_TOKEN, refreshToken, options);
};
