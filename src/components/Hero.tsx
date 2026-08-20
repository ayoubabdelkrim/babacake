import type { Dictionary, Locale } from "@/i18n";

import HeroCaptions from "./HeroCaptions";
import HeroSocials from "./HeroSocials";
import HeroVideo from "./HeroVideo";
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
          toute la hauteur de la section. overflow-hidden vit ici et non sur
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

        {/* Voile central : la typographie vit désormais au centre, par-dessus
            l'image. Ce halo très doux garantit sa lisibilité quelle que soit
            la frame — un plan de cuisine clair reste un fond clair. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            background:
              "radial-gradient(66% 46% at 50% 50%, rgba(14,11,10,0.52) 0%, rgba(14,11,10,0.26) 52%, rgba(14,11,10,0) 100%)",
          }}
        />

        {/* Récit typographique piloté par la même progression que la vidéo */}
        <HeroCaptions hero={hero} captions={dict.captions} />

        {/* Pied de hero — desktop uniquement, pour ne pas charger le mobile */}
        <div
          className="rv absolute bottom-[6vh] start-[6vw] z-20 hidden lg:block 2xl:start-[8vw]"
          style={{ animationDelay: "800ms" }}
        >
          <HeroSocials location={hero.location} />
        </div>
      </div>
    </section>
  );
}
