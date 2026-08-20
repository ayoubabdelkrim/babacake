import Image from "next/image";

import type { Dictionary } from "@/i18n";

import RevealOnScroll from "./RevealOnScroll";
import { GALLERY_ITEMS, imageSrc } from "./gallery-data";

/** Largeurs réelles occupées : 3 colonnes, 2 colonnes, puis pleine largeur. */
const SIZES = "(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 92vw";

/**
 * Rythme calculé une fois, hors rendu : les images resserrées alternent
 * gauche / droite. C'est ce décalage qui donne l'asymétrie éditoriale,
 * sans jamais réduire une image à une vignette.
 */
const LAYOUT = GALLERY_ITEMS.reduce<
  { widthClass: string; isFeature: boolean }[]
>((acc, item) => {
  const isFeature = item.scale === "full";
  if (isFeature) {
    acc.push({ isFeature, widthClass: "w-full" });
    return acc;
  }
  const insetsSoFar = acc.filter((entry) => !entry.isFeature).length;
  acc.push({
    isFeature,
    widthClass:
      insetsSoFar % 2 === 0
        ? "w-[82%] ms-auto sm:w-[88%]"
        : "w-[82%] me-auto sm:w-[88%]",
  });
  return acc;
}, []);

export default function Gallery({ dict }: { dict: Dictionary }) {
  const { gallery } = dict;

  return (
    <section id="creations" className="bg-paper text-ink">
      <div className="px-6 py-24 sm:px-8 sm:py-28 lg:px-[6vw] lg:py-36 2xl:px-[8vw]">
        <RevealOnScroll>
          <header className="mb-14 lg:mb-20">
            <span
              data-reveal="item"
              className="mb-7 block h-px w-12 bg-bronze/45 lg:mb-9"
              aria-hidden="true"
            />

            <div className="lg:flex lg:items-end lg:justify-between lg:gap-16">
              <h2
                data-reveal="item"
                style={{ ["--reveal-delay" as string]: "90ms" }}
                className="font-display text-[clamp(2.4rem,9vw,3.25rem)] leading-[0.98] font-light text-ink italic lg:text-[clamp(3rem,4.4vw,4.75rem)]"
              >
                {gallery.title}
              </h2>

              <p
                data-reveal="item"
                style={{ ["--reveal-delay" as string]: "180ms" }}
                className="mt-5 max-w-[22rem] font-sans text-[0.95rem] leading-relaxed font-light text-ink/65 lg:mt-0 lg:shrink-0 lg:pb-3 lg:text-end lg:text-[1.02rem]"
              >
                {gallery.subtitle}
              </p>
            </div>
          </header>

          <div className="gallery-flow">
            {GALLERY_ITEMS.map((item, i) => {
              const { isFeature, widthClass } = LAYOUT[i];

              return (
                <figure
                  key={item.file}
                  data-reveal={isFeature ? "feature" : "item"}
                  style={{
                    ["--reveal-delay" as string]: `${(i % 3) * 90}ms`,
                  }}
                  className={`gallery-figure mb-5 overflow-hidden bg-cream sm:mb-6 lg:mb-8 ${widthClass}`}
                >
                  <Image
                    src={imageSrc(item.file)}
                    alt={gallery.alts[item.file] ?? ""}
                    width={item.w}
                    height={item.h}
                    sizes={SIZES}
                    quality={82}
                    className="block h-auto w-full"
                  />
                </figure>
              );
            })}
          </div>
        </RevealOnScroll>
      </div>

      {/* Sans JavaScript, rien ne doit rester invisible. */}
      <noscript>
        <style>{`[data-reveal]{opacity:1 !important;transform:none !important}`}</style>
      </noscript>
    </section>
  );
}
