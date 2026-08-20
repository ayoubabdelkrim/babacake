"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import type { Dictionary, Locale } from "@/i18n";

import LanguageSwitcher from "./LanguageSwitcher";

function Wordmark({ locale, label }: { locale: Locale; label: string }) {
  return (
    <Link
      href={`/${locale}`}
      className="group flex items-center gap-3 outline-none"
      aria-label={label}
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/35 transition-colors duration-500 group-hover:border-gold/70">
        {/* Le monogramme reste latin : c'est la marque, elle ne se traduit pas. */}
        <span
          dir="ltr"
          className="font-display text-[0.95rem] leading-none text-gold-lite italic"
        >
          b
        </span>
      </span>
      <span
        dir="ltr"
        className="font-sans text-[0.78rem] font-light tracking-[0.4em] text-cream"
      >
        BABACAKE
      </span>
    </Link>
  );
}

export default function SiteNav({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const [open, setOpen] = useState(false);
  const { nav } = dict;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <>
      <header className="rv absolute inset-x-0 top-0 z-30 flex items-center justify-between px-6 py-6 sm:px-8 lg:px-[6vw] lg:py-9 2xl:px-[8vw]">
        <Wordmark locale={locale} label={nav.home} />

        <div className="flex items-center gap-8 xl:gap-11">
          <nav className="hidden lg:block" aria-label={nav.links[0].label}>
            <ul className="flex items-center gap-8 xl:gap-11">
              {nav.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group relative block font-sans text-[0.68rem] font-light tracking-[0.26em] text-cream/70 uppercase transition-colors duration-500 hover:text-cream"
                  >
                    {link.label}
                    <span className="absolute -bottom-1.5 start-0 h-px w-full origin-left scale-x-0 bg-gold/70 transition-transform duration-500 ease-out group-hover:scale-x-100 rtl:origin-right" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <LanguageSwitcher
            locale={locale}
            label={nav.language}
            className="hidden sm:flex"
          />

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={nav.openMenu}
            aria-expanded={open}
            className="flex h-8 w-8 flex-col items-end justify-center gap-[5px] lg:hidden rtl:items-start"
          >
            <span className="block h-px w-6 bg-cream/85" />
            <span className="block h-px w-4 bg-cream/85" />
          </button>
        </div>
      </header>

      {/* Menu mobile — volontairement dépouillé, la vidéo reste le sujet. */}
      <div
        // `invisible` fermé : sans lui le panneau reste dans l'ordre de
        // tabulation et le sélecteur de langue qu'il contient est atteignable
        // au clavier alors qu'il est invisible — et focalisable à l'intérieur
        // d'un sous-arbre aria-hidden. La visibilité est incluse dans la
        // transition pour que le fondu de sortie aille jusqu'au bout.
        className={`fixed inset-0 z-50 bg-ink/97 backdrop-blur-[2px] transition-[opacity,visibility] duration-500 lg:hidden ${
          open
            ? "pointer-events-auto visible opacity-100"
            : "pointer-events-none invisible opacity-0"
        }`}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between px-6 py-6 sm:px-8">
          <Wordmark locale={locale} label={nav.home} />
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label={nav.closeMenu}
            className="relative h-8 w-8"
            tabIndex={open ? 0 : -1}
          >
            <span className="absolute top-1/2 left-1/2 block h-px w-5 -translate-x-1/2 rotate-45 bg-cream" />
            <span className="absolute top-1/2 left-1/2 block h-px w-5 -translate-x-1/2 -rotate-45 bg-cream" />
          </button>
        </div>

        <nav className="px-6 pt-16 sm:px-8" aria-label={nav.links[0].label}>
          <ul className="flex flex-col gap-7">
            {nav.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  tabIndex={open ? 0 : -1}
                  className="font-display text-[2rem] leading-none font-light text-cream italic"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-14 px-6 sm:px-8">
          <LanguageSwitcher
            locale={locale}
            label={nav.language}
            tabIndex={open ? 0 : -1}
          />
        </div>
      </div>
    </>
  );
}
