import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import type { Locale } from 'next-intl';

import { routing } from './i18n/routing';
import { getPathname } from './i18n/navigation';
import { AUTH_ROUTES } from './shared/lib/constants/auth-routes.constant';
import { PRIVATE_ROUTES } from './shared/lib/constants/private-routes.constant';
import { safeCallbackUrl } from './shared/lib/utils/callback-url.utils';
import { resolveLocalizedPathname } from './shared/lib/utils/localized-pathname.utils';

const handleI18nRouting = createMiddleware(routing);

export async function proxy(request: NextRequest) {
  const response = handleI18nRouting(request);
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET! });

  const { locale, pathname } = resolveLocalizedPathname(response, request.url);
  const origin = request.nextUrl.origin;

  const redirectTo = (href: string, query?: Record<string, string>) => {
    const url = new URL(getPathname({ href, locale: locale as Locale }), request.url);
    if (query) {
      for (const [key, value] of Object.entries(query)) {
        url.searchParams.set(key, value);
      }
    }
    return NextResponse.redirect(url);
  };

  if (PRIVATE_ROUTES.has(pathname) && !token) {
    return redirectTo('/login', {
      callbackUrl: safeCallbackUrl(pathname + request.nextUrl.search, origin),
    });
  }

  if (AUTH_ROUTES.has(pathname) && token) {
    return redirectTo(safeCallbackUrl(request.nextUrl.searchParams.get('callbackUrl'), origin));
  }

  return response;
}

export const config = {
  // Add 'assets' to prevent redirecting in
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|assets|sw.js).*)',
  ],
};
