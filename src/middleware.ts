import { NextResponse, type NextRequest } from "next/server";

import { DEFAULT_LOCALE, LOCALES, LOCALE_COOKIE, isLocale } from "@/i18n";

/**
 * Toute URL sans préfixe de langue est redirigée vers une URL qui en a un :
 * le HTML servi porte donc toujours le bon `lang` et le bon `dir`, sans
 * bascule côté client. La préférence est lue depuis un cookie — le middleware
 * s'exécute avant le navigateur et n'a pas accès à localStorage.
 */
function pickLocale(request: NextRequest) {
  const saved = request.cookies.get(LOCALE_COOKIE)?.value;
  if (isLocale(saved)) return saved;

  const header = request.headers.get("accept-language") ?? "";
  for (const part of header.split(",")) {
    const tag = part.split(";")[0]?.trim().slice(0, 2).toLowerCase();
    if (isLocale(tag)) return tag;
  }
  return DEFAULT_LOCALE;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = LOCALES.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );
  if (hasLocale) return NextResponse.next();

  const locale = pickLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // On laisse passer les fichiers statiques, les images et les routes internes.
  matcher: ["/((?!_next|api|.*\..*).*)"],
};
