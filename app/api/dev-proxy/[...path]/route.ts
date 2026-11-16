import type { NextRequest } from 'next/server';

/**
 * Development only: the API answers `localhost` with the CORS header of another port, so the
 * browser asks it through this same-origin path instead (see `utils/api/instance.ts`). In
 * production the path does not exist.
 */
const FORWARDED = ['authorization', 'accept-language', 'content-type', 'x-device-id', 'accept'];

const forward = async (request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) => {
  if (process.env.NODE_ENV !== 'development' || !process.env.API_URL) {
    return new Response(null, { status: 404 });
  }

  const { path } = await params;
  // every path of the API ends with "/"
  const url = `${process.env.API_URL}${path.join('/')}/${request.nextUrl.search}`;
  const headers = new Headers();
  FORWARDED.forEach((name) => {
    const value = request.headers.get(name);
    if (value) headers.set(name, value);
  });

  const hasBody = !['GET', 'HEAD'].includes(request.method);
  const response = await fetch(url, {
    method: request.method,
    headers,
    body: hasBody ? await request.arrayBuffer() : undefined,
    redirect: 'manual'
  });

  return new Response(response.body, {
    status: response.status,
    headers: { 'content-type': response.headers.get('content-type') ?? 'application/json' }
  });
};

export { forward as DELETE, forward as GET, forward as PATCH, forward as POST, forward as PUT };
