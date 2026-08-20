import HeroSocials from "./HeroSocials";
import HeroVideo from "./HeroVideo";
import SiteNav from "./SiteNav";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-ink">
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
        className="pointer-events-none absolute inset-0 z-0 hidden lg:block"
        style={{
          background:
            "radial-gradient(58% 52% at 76% 50%, rgba(201,169,110,0.12) 0%, rgba(201,169,110,0) 72%)",
        }}
      />

      <HeroVideo />
      <SiteNav />

      <div className="relative z-20 flex min-h-svh flex-col justify-end px-6 pt-32 pb-14 sm:px-8 sm:pb-16 lg:justify-center lg:px-[6vw] lg:pt-0 lg:pb-0 2xl:px-[8vw]">
        <div className="w-full max-w-[30rem] lg:max-w-[42%]">
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
              BabaCake
            </span>

            <span
              className="rv mt-6 font-display text-[clamp(2.8rem,12.5vw,4.25rem)] leading-[0.94] font-light text-cream italic lg:mt-8 lg:text-[clamp(4rem,5.8vw,7rem)]"
              style={{ animationDelay: "260ms" }}
            >
              L’art du
              <br />
              gâteau <span className="lining-figures text-gold-lite">3D</span>
            </span>
          </h1>

          <p
            className="rv mt-7 max-w-[22rem] font-sans text-[0.95rem] leading-relaxed font-light text-beige lg:mt-9 lg:text-[1.02rem]"
            style={{ animationDelay: "420ms" }}
          >
            Créations uniques façonnées avec précision.
          </p>

          <div className="rv mt-9 lg:mt-11" style={{ animationDelay: "560ms" }}>
            <a
              href="#creations"
              className="group inline-flex items-center gap-3 rounded-full bg-gold py-[0.95rem] pr-5 pl-6 font-sans text-[0.64rem] font-medium tracking-[0.16em] whitespace-nowrap text-ink uppercase transition-[background-color,box-shadow,transform] duration-500 ease-out hover:bg-gold-lite hover:shadow-[0_18px_40px_-18px_rgba(201,169,110,0.8)] min-[380px]:text-[0.68rem] min-[380px]:tracking-[0.2em] min-[380px]:gap-4 min-[380px]:py-4 min-[380px]:pr-6 min-[380px]:pl-7 sm:text-[0.72rem] sm:tracking-[0.22em] lg:py-[1.05rem] lg:pr-8 lg:pl-9"
            >
              Découvrir nos créations
              <svg
                viewBox="0 0 20 8"
                className="h-2 w-5 shrink-0 transition-transform duration-500 ease-out group-hover:translate-x-1"
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

        {/* Pied de hero — desktop uniquement, pour ne pas charger le mobile */}
        <div
          className="rv absolute bottom-[6vh] left-[6vw] hidden lg:block 2xl:left-[8vw]"
          style={{ animationDelay: "800ms" }}
        >
          <HeroSocials />
        </div>
      </div>
    </section>
  );
}
