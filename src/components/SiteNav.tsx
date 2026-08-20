"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const LINKS = [
  { label: "Créations", href: "#creations" },
  { label: "Sur mesure", href: "#sur-mesure" },
  { label: "L’atelier", href: "#atelier" },
  { label: "Contact", href: "#contact" },
];

function Wordmark() {
  return (
    <Link
      href="/"
      className="group flex items-center gap-3 outline-none"
      aria-label="BabaCake — accueil"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/35 transition-colors duration-500 group-hover:border-gold/70">
        <span className="font-display text-[0.95rem] italic leading-none text-gold-lite">
          b
        </span>
      </span>
      <span className="font-sans text-[0.78rem] font-light tracking-[0.4em] text-cream">
        BABACAKE
      </span>
    </Link>
  );
}

export default function SiteNav() {
  const [open, setOpen] = useState(false);

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
        <Wordmark />

        <nav className="hidden lg:block" aria-label="Navigation principale">
          <ul className="flex items-center gap-11">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="group relative block font-sans text-[0.68rem] font-light tracking-[0.26em] text-cream/70 uppercase transition-colors duration-500 hover:text-cream"
                >
                  {link.label}
                  <span className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-gold/70 transition-transform duration-500 ease-out group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Ouvrir le menu"
          aria-expanded={open}
          className="flex h-8 w-8 flex-col items-end justify-center gap-[5px] lg:hidden"
        >
          <span className="block h-px w-6 bg-cream/85" />
          <span className="block h-px w-4 bg-cream/85" />
        </button>
      </header>

      {/* Menu mobile — volontairement dépouillé, la vidéo reste le sujet. */}
      <div
        className={`fixed inset-0 z-50 bg-ink/97 backdrop-blur-[2px] transition-opacity duration-500 lg:hidden ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between px-6 py-6 sm:px-8">
          <Wordmark />
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Fermer le menu"
            className="relative h-8 w-8"
            tabIndex={open ? 0 : -1}
          >
            <span className="absolute top-1/2 left-1/2 block h-px w-5 -translate-x-1/2 rotate-45 bg-cream" />
            <span className="absolute top-1/2 left-1/2 block h-px w-5 -translate-x-1/2 -rotate-45 bg-cream" />
          </button>
        </div>

        <nav className="px-6 pt-16 sm:px-8" aria-label="Navigation mobile">
          <ul className="flex flex-col gap-7">
            {LINKS.map((link) => (
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
      </div>
    </>
  );
}
