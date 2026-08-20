import type { Dictionary, Locale } from "@/i18n";

import HeroCaptions from "./HeroCaptions";
import HeroSocials from "./HeroSocials";
import HeroVideo from "./HeroVideo";
import RichLines from "./RichLines";
import SiteNav from "./SiteNav";

export default function Hero({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const { hero } = dict;

  return (
    <section data-hero-scroll className="hero-scroll relative w-full bg-ink">
      {/* Scène fixe : elle reste à l'écran pendant que la page défile sur
          toute la hauteur de la section. Le design intérieur est strictement
          identique à la version approuvée. overflow-hidden vit ici et non sur
          la section : sur un ancêtre, il neutraliserait position: sticky. */}
      <div className="sticky top-0 h-svh w-full overflow-hidden">
        {/* Fond : dégradé chaud + lueur discrète derrière la plaque vidéo */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              "linear-gradient(175deg, #1a1410 0%, #0e0b0a 55%, #0b0908 100%)",
          }}
        />
        <div
          aria-hidden="true"
          className="hero-glow pointer-events-none absolute inset-0 z-0 hidden lg:block"
        />

        <HeroVideo />
        <SiteNav dict={dict} locale={locale} />

        <div className="relative z-20 flex h-svh flex-col justify-end px-6 pt-32 pb-14 sm:px-8 sm:pb-16 lg:justify-center lg:px-[6vw] lg:pt-0 lg:pb-0 2xl:px-[8vw]">
          <div data-hero-intro className="w-full max-w-[30rem] lg:max-w-[42%]">
            <h1 className="flex flex-col">
              <span
                className="rv flex items-center gap-4 font-sans text-[0.68rem] font-light tracking-[0.42em] text-gold-lite uppercase sm:text-[0.72rem]"
                style={{ animationDelay: "120ms" }}
              >
                <span
                  className="rv-line hidden h-px w-10 bg-gold/60 sm:block"
                  style={{ animationDelay: "120ms" }}
                  aria-hidden="true"
                />
                {hero.eyebrow}
              </span>

              <span
                className="rv mt-6 font-display text-[clamp(2.8rem,12.5vw,4.25rem)] leading-[0.94] font-light text-cream italic lg:mt-8 lg:text-[clamp(4rem,5.8vw,7rem)]"
                style={{ animationDelay: "260ms" }}
              >
                <RichLines lines={hero.title} />
              </span>
            </h1>

            <p
              className="rv mt-7 max-w-[22rem] font-sans text-[0.95rem] leading-relaxed font-light text-beige lg:mt-9 lg:text-[1.02rem]"
              style={{ animationDelay: "420ms" }}
            >
              {hero.tagline}
            </p>

            <div
              className="rv mt-9 lg:mt-11"
              style={{ animationDelay: "560ms" }}
            >
              <a
                href="#creations"
                className="group inline-flex items-center gap-3 rounded-full bg-gold py-[0.95rem] pe-5 ps-6 font-sans text-[0.64rem] font-medium tracking-[0.16em] whitespace-nowrap text-ink uppercase transition-[background-color,box-shadow,transform] duration-500 ease-out hover:bg-gold-lite hover:shadow-[0_18px_40px_-18px_rgba(201,169,110,0.8)] min-[380px]:text-[0.68rem] min-[380px]:tracking-[0.2em] min-[380px]:gap-4 min-[380px]:py-4 min-[380px]:pe-6 min-[380px]:ps-7 sm:text-[0.72rem] sm:tracking-[0.22em] lg:py-[1.05rem] lg:pe-8 lg:ps-9"
              >
                {hero.cta}
                <svg
                  viewBox="0 0 20 8"
                  className="h-2 w-5 shrink-0 transition-transform duration-500 ease-out group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  aria-hidden="true"
                >
                  <path d="M0 4h18M14.5 1 18 4l-3.5 3" />
                </svg>
              </a>
            </div>
          </div>

          {/* Récit typographique piloté par la même progression que la vidéo */}
          <HeroCaptions captions={dict.captions} />

          {/* Pied de hero — desktop uniquement, pour ne pas charger le mobile */}
          <div
            className="rv absolute bottom-[6vh] start-[6vw] hidden lg:block 2xl:start-[8vw]"
            style={{ animationDelay: "800ms" }}
          >
            <HeroSocials location={hero.location} />
          </div>
        </div>
      </div>
    </section>
  );
}
