"use client";

import { useEffect, useRef, useState } from "react";

/** Source unique : un seul <video> pour mobile et desktop (un seul téléchargement). */
export const HERO_VIDEO_SRC = "/video/hero.mp4";

export default function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (el.readyState >= 2) setReady(true);

    // Certains navigateurs mobiles ignorent l'attribut autoPlay tant que
    // la lecture n'est pas relancée explicitement après l'hydratation.
    const start = () => {
      const attempt = el.play();
      if (attempt) attempt.catch(() => {});
    };
    start();

    document.addEventListener("visibilitychange", start);
    return () => document.removeEventListener("visibilitychange", start);
  }, []);

  return (
    <div className="hero-media">
      <div className="rv-veil relative h-full w-full overflow-hidden bg-espresso">
        <video
          ref={ref}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          controls={false}
          tabIndex={-1}
          aria-hidden="true"
          onLoadedData={() => setReady(true)}
          onCanPlay={() => setReady(true)}
          className={`transition-opacity duration-1000 ease-out ${
            ready ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src={HERO_VIDEO_SRC} type="video/mp4" />
        </video>

        {/* Voiles de lisibilité — mobile uniquement : le texte vit en bas,
            le chef et le gâteau restent dégagés dans le haut du cadre. */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[74%] lg:hidden"
          style={{
            background:
              "linear-gradient(to top, #0e0b0a 0%, rgba(14,11,10,0.93) 26%, rgba(14,11,10,0.64) 56%, rgba(14,11,10,0) 100%)",
          }}
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-ink/75 to-transparent lg:hidden" />
        <div className="pointer-events-none absolute inset-0 bg-ink/10 lg:bg-transparent" />

        {/* Desktop : le bandeau se fond dans le fond sombre par la gauche,
            et un voile haut garde la navigation parfaitement lisible. */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 hidden w-[46%] lg:block"
          style={{
            background:
              "linear-gradient(to right, #0e0b0a 0%, rgba(14,11,10,0.78) 42%, rgba(14,11,10,0) 100%)",
          }}
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 hidden h-52 bg-gradient-to-b from-ink/85 via-ink/40 to-transparent lg:block" />
        <div className="pointer-events-none absolute inset-0 hidden lg:block lg:shadow-[inset_0_0_120px_rgba(14,11,10,0.5)]" />
      </div>
    </div>
  );
}
