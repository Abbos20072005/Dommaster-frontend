import type { NextRequest } from 'next/server';

import createMiddleware from 'next-intl/middleware';
import { NextRequest as Request } from 'next/server';

import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  // the root layout builds the canonical URL of every page from these (BLD-240)
  const headers = new Headers(request.headers);
  headers.set('x-pathname', request.nextUrl.pathname);
  headers.set('x-search', request.nextUrl.search);

  return intlMiddleware(new Request(request, { headers }));
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};
