import type { NextRequest } from 'next/server';

import createMiddleware from 'next-intl/middleware';
import { NextRequest as Request, NextResponse } from 'next/server';

import { brandSlugById, catalogPathByIds, productSlugById, toLanguage } from './lib/catalogTree';
import { isCrawler, pageLastModified } from './lib/lastModified';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

/**
 * The old numeric addresses lead to the readable ones with ONE 301 (BLD-243):
 * /product/2294 -> /product/{slug}-2294, /category/1/191/699 -> /catalog/{a}/{b}/{c},
 * /brand/14?brand=14 -> /brand/{slug}. An address that cannot be resolved is left to the page (404).
 */
const redirectOldAddress = async (request: NextRequest) => {
  const { pathname, searchParams } = request.nextUrl;
  const language = toLanguage(request.cookies.get('NEXT_LOCALE')?.value);

  let target: string | null = null;

  const product = /^\/product\/(\d+)\/?$/.exec(pathname);
  const category = /^\/category\/(\d+)(?:\/(\d+))?(?:\/(\d+))?\/?$/.exec(pathname);
  const brand = /^\/brand\/(\d+)\/?$/.exec(pathname);

  if (product) {
    const slug = await productSlugById(Number(product[1]), language);
    if (slug) target = `/product/${slug}`;
  } else if (category) {
    const ids = category.slice(1).filter(Boolean).map(Number);
    target = await catalogPathByIds(ids, language);
  } else if (brand) {
    const slug = await brandSlugById(Number(brand[1]), language);
    if (slug) target = `/brand/${slug}`;
  }
  if (!target) return null;

  const url = request.nextUrl.clone();
  url.pathname = target;
  // `?brand=` repeated the id of the brand: the readable address does not need it
  searchParams.delete('brand');
  url.search = searchParams.toString() ? `?${searchParams.toString()}` : '';
  return NextResponse.redirect(url, 301);
};

export default async function proxy(request: NextRequest) {
  const redirect = await redirectOldAddress(request);
  if (redirect) return redirect;

  // the root layout builds the canonical URL of every page from these (BLD-240)
  const headers = new Headers(request.headers);
  headers.set('x-pathname', request.nextUrl.pathname);
  headers.set('x-search', request.nextUrl.search);

  // BLD-352: a crawler gets `Last-Modified` (the `updated_at` of the page) and, when the page has
  // not changed since its `If-Modified-Since`, an empty 304 instead of the whole page. Any client
  // that asks with `If-Modified-Since` gets the same answer (a browser sends it only after it was
  // given `Last-Modified`, so an ordinary visitor never does and costs no extra lookup).
  let lastModified: Date | null = null;
  if (
    request.method === 'GET' &&
    (isCrawler(request.headers.get('user-agent')) || request.headers.has('if-modified-since'))
  ) {
    lastModified = await pageLastModified(
      request.nextUrl.pathname,
      request.cookies.get('NEXT_LOCALE')?.value
    );
    const since = Date.parse(request.headers.get('if-modified-since') ?? '');
    if (lastModified && !Number.isNaN(since) && lastModified.getTime() <= since) {
      return new NextResponse(null, {
        status: 304,
        headers: { 'Last-Modified': lastModified.toUTCString() }
      });
    }
  }

  const response = await intlMiddleware(new Request(request, { headers }));
  if (lastModified) response.headers.set('Last-Modified', lastModified.toUTCString());
  return response;
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};
