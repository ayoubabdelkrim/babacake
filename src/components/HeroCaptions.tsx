"use client";

import { useEffect, useRef } from "react";

import type { Dictionary } from "@/i18n";

import RichLines from "./RichLines";
import { subscribeHeroProgress } from "./hero-progress";
import { HERO_CAPTIONS, captionStyle, tailFade } from "./hero-scrub";

/** L'état « detail » reste volontairement plus petit : le gâteau doit dominer. */
const SIZES: Record<string, string> = {
  brand:
    "font-sans font-light uppercase tracking-[0.22em] text-[clamp(2.1rem,10.5vw,3.1rem)] sm:tracking-[0.26em] lg:text-[clamp(3.4rem,6.2vw,7.5rem)]",
  title:
    "font-display italic text-[clamp(2.1rem,9vw,3rem)] lg:text-[clamp(3.2rem,5vw,5.75rem)]",
  forme:
    "font-display italic text-[clamp(2rem,8.5vw,2.9rem)] lg:text-[clamp(3rem,4.6vw,5.25rem)]",
  idee: "font-display italic text-[clamp(2rem,8.5vw,2.9rem)] lg:text-[clamp(3rem,4.6vw,5.25rem)]",
  detail:
    "font-display italic text-[clamp(1.6rem,6.5vw,2.2rem)] lg:text-[clamp(2.2rem,3.2vw,3.6rem)]",
  savoir:
    "font-display italic text-[clamp(1.8rem,7.5vw,2.5rem)] lg:text-[clamp(2.6rem,3.8vw,4.25rem)]",
};

/** États pilotés depuis les légendes traduites (tout sauf marque et titre). */
const STORY = HERO_CAPTIONS.filter((c) => c.id !== "brand" && c.id !== "title");

export default function HeroCaptions({
  hero,
  captions,
}: {
  hero: Dictionary["hero"];
  captions: Dictionary["captions"];
}) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const track = el.closest<HTMLElement>("[data-hero-scroll]");
    if (!track) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const nodes = new Map<string, HTMLElement | null>(
      HERO_CAPTIONS.map(({ id }) => [
        id,
        el.querySelector<HTMLElement>(`[data-caption="${id}"]`),
      ]),
    );

    const paint = (
      node: HTMLElement | null,
      opacity: number,
      y: number,
      scale: number,
    ) => {
      if (!node) return;
      node.style.opacity = String(opacity);
      // Mouvement réduit : on garde la narration, on retire le déplacement.
      node.style.transform = motion.matches
        ? ""
        : `translate3d(0, ${y.toFixed(2)}px, 0) scale(${scale.toFixed(4)})`;
      // Un texte invisible ne doit être ni cliquable ni lu.
      const hidden = opacity < 0.02;
      node.style.pointerEvents = hidden ? "none" : "";
      node.style.visibility = hidden ? "hidden" : "";
    };

    // Même progression que la vidéo : une seule source, aucune dérive possible.
    return subscribeHeroProgress(track, ({ progress, tail }) => {
      const fade = tailFade(tail);
      for (const { id, spec } of HERO_CAPTIONS) {
        const s = captionStyle(progress, spec);
        const last = id === "savoir";
        paint(
          nodes.get(id) ?? null,
          s.opacity * (last ? fade : 1),
          s.y,
          s.scale,
        );
      }
    });
  }, []);

  return (
    <div
      ref={root}
      className="pointer-events-none absolute inset-0 z-20 flex h-svh items-center justify-center px-6 sm:px-8"
    >
      <div className="relative flex min-h-[11rem] w-full max-w-[34rem] items-center justify-center lg:min-h-[17rem] lg:max-w-[64rem]">
        {/* Révélation de marque : c'est aussi le titre de la page. Son entrée
            est l'animation CSS `.rv`, sa sortie est pilotée par le scroll. */}
        <h1
          data-caption="brand"
          className={`rv absolute inset-0 flex items-center justify-center text-center leading-[1.05] text-cream ${SIZES.brand}`}
          style={{ animationDelay: "160ms" }}
        >
          {/* La marque ne se traduit ni ne se translittère. */}
          <span dir="ltr">{hero.brand}</span>
          <span className="sr-only"> — {hero.tagline}</span>
        </h1>

        {/* Le reste du récit est décoratif : le message essentiel est dans le
            <h1>, le faire lire six fois en superposition n'aiderait personne. */}
        <p
          data-caption="title"
          aria-hidden="true"
          style={{ opacity: 0, visibility: "hidden" }}
          className={`absolute inset-0 flex items-center justify-center text-center leading-[0.98] font-light text-cream ${SIZES.title}`}
        >
          <span>
            <RichLines lines={hero.title} />
          </span>
        </p>

        {STORY.map(({ id }) => (
          <p
            key={id}
            data-caption={id}
            aria-hidden="true"
            style={{ opacity: 0, visibility: "hidden" }}
            className={`absolute inset-0 flex items-center justify-center text-center leading-[0.98] font-light text-cream ${SIZES[id]}`}
          >
            <span>
              <RichLines lines={captions[id as keyof typeof captions]} />
            </span>
          </p>
        ))}
      </div>
    </div>
  );
}
