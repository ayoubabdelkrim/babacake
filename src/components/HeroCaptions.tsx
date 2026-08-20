"use client";

import { useEffect, useRef } from "react";

import type { Dictionary } from "@/i18n";

import RichLines from "./RichLines";
import { subscribeHeroProgress } from "./hero-progress";
import { HERO_CAPTIONS, captionStyle, tailFade } from "./hero-scrub";

/** L'état 4 est volontairement plus petit : le gâteau doit dominer. */
const SIZES: Record<string, string> = {
  forme: "text-[clamp(2rem,8.5vw,2.9rem)] lg:text-[clamp(3rem,4.6vw,5.25rem)]",
  idee: "text-[clamp(2rem,8.5vw,2.9rem)] lg:text-[clamp(3rem,4.6vw,5.25rem)]",
  detail:
    "text-[clamp(1.6rem,6.5vw,2.2rem)] lg:text-[clamp(2.2rem,3.2vw,3.6rem)]",
  savoir:
    "text-[clamp(1.8rem,7.5vw,2.5rem)] lg:text-[clamp(2.6rem,3.8vw,4.25rem)]",
};

const CAPTIONS = HERO_CAPTIONS.filter((c) => c.id !== "intro");

export default function HeroCaptions({
  captions,
}: {
  captions: Dictionary["captions"];
}) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const track = el.closest<HTMLElement>("[data-hero-scroll]");
    if (!track) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Le bloc d'intro est celui déjà approuvé : on ne le redessine pas, on ne
    // fait que piloter sa sortie. Le style s'applique sur son conteneur, pas
    // sur ses enfants : ceux-ci portent l'animation d'entrée `.rv`, dont le
    // `forwards` l'emporterait sur un style inline.
    const intro = track.querySelector<HTMLElement>("[data-hero-intro]") ?? null;

    const nodes = CAPTIONS.map(({ id }) =>
      el.querySelector<HTMLElement>(`[data-caption="${id}"]`),
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

    const unsubscribe = subscribeHeroProgress(track, ({ progress, tail }) => {
      const introStyle = captionStyle(progress, HERO_CAPTIONS[0].spec);
      paint(intro, introStyle.opacity, introStyle.y, 1);

      const fade = tailFade(tail);
      CAPTIONS.forEach(({ id, spec }, i) => {
        const s = captionStyle(progress, spec);
        const last = id === "savoir";
        paint(nodes[i], s.opacity * (last ? fade : 1), s.y, s.scale);
      });
    });

    return unsubscribe;
  }, []);

  return (
    // Calque purement narratif : le message essentiel vit déjà dans le <h1>,
    // le lire cinq fois en superposition n'aiderait personne.
    <div
      ref={root}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-20 flex h-svh flex-col justify-end px-6 pt-32 pb-14 sm:px-8 sm:pb-16 lg:justify-center lg:px-[6vw] lg:pt-0 lg:pb-0 2xl:px-[8vw]"
    >
      <div className="relative min-h-[9.5rem] w-full max-w-[30rem] lg:min-h-[14rem] lg:max-w-[42%]">
        {CAPTIONS.map(({ id }) => (
          <p
            key={id}
            data-caption={id}
            style={{ opacity: 0, visibility: "hidden" }}
            className={`absolute inset-0 flex items-end font-display leading-[0.98] font-light text-cream italic lg:items-center ${SIZES[id]}`}
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
