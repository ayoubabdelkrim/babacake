"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LOCALES,
  LOCALE_COOKIE,
  LOCALE_LABELS,
  LOCALE_NAMES,
  type Locale,
} from "@/i18n";

/** Remplace le segment de langue en tête d'URL, en gardant le reste. */
function swapLocale(pathname: string, next: Locale) {
  const rest = pathname.replace(/^\/(fr|en|ar)(?=\/|$)/, "");
  return `/${next}${rest}`;
}

export default function LanguageSwitcher({
  locale,
  label,
  className = "",
  tabIndex,
}: {
  locale: Locale;
  label: string;
  className?: string;
  tabIndex?: number;
}) {
  const pathname = usePathname() || `/${locale}`;

  return (
    <nav aria-label={label} className={`flex items-center ${className}`}>
      {LOCALES.map((code, i) => {
        const active = code === locale;
        return (
          <span key={code} className="flex items-center">
            {i > 0 && (
              <span
                aria-hidden="true"
                className="px-2 text-cream/25 select-none"
              >
                ·
              </span>
            )}
            <Link
              href={swapLocale(pathname, code)}
              hrefLang={code}
              lang={code}
              aria-current={active ? "true" : undefined}
              // La position de défilement est conservée : la vidéo et le récit
              // se recalent sur la même progression, la langue seule change.
              scroll={false}
              tabIndex={tabIndex}
              onClick={() => {
                document.cookie = `${LOCALE_COOKIE}=${code}; path=/; max-age=31536000; samesite=lax`;
              }}
              title={LOCALE_NAMES[code]}
              className={`font-sans text-[0.66rem] font-light tracking-[0.18em] transition-colors duration-500 ${
                active ? "text-gold-lite" : "text-cream/55 hover:text-cream"
              }`}
            >
              {LOCALE_LABELS[code]}
            </Link>
          </span>
        );
      })}
    </nav>
  );
}
