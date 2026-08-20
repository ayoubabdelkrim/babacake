"use client";

import { useEffect, useRef, useState } from "react";

import { refreshHeroProgress, subscribeHeroProgress } from "./hero-progress";
import { shouldSeek, videoTimeAt, SETTLED } from "./hero-scrub";

/** Source unique : un seul <video> pour mobile et desktop (un seul téléchargement). */
export const HERO_VIDEO_SRC = "/video/hero.mp4";

export default function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const track = video.closest<HTMLElement>("[data-hero-scroll]");
    if (!track) return;

    // La vidéo n'est jamais jouée : elle est pilotée image par image.
    video.pause();

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");

    let duration = 0;
    let applied = -1;
    let seeking = false;

    const onSeeking = () => {
      seeking = true;
    };
    const onSeeked = () => {
      seeking = false;
    };

    const apply = (t: number) => {
      applied = t;
      video.currentTime = t;
    };

    // On ne calcule plus la progression ici : elle vient de la source
    // partagée, celle qui pilote aussi la typographie.
    const unsubscribe = subscribeHeroProgress(track, ({ progress }) => {
      if (!duration || motion.matches) return;

      const next = videoTimeAt(progress, duration);
      const settled = Math.abs(next - applied) < SETTLED;

      if (!seeking && shouldSeek(next, applied, settled)) apply(next);
    });

    const onMeta = () => {
      duration = Number.isFinite(video.duration) ? video.duration : 0;
      setReady(true);
      video.pause();
      if (!duration) return;

      if (motion.matches) {
        // Comportement de repli : une image fixe, aucun pilotage.
        apply(0);
        return;
      }
      refreshHeroProgress();
    };

    const onMotionChange = () => {
      if (motion.matches && duration) apply(0);
      else refreshHeroProgress();
    };

    video.addEventListener("seeking", onSeeking);
    video.addEventListener("seeked", onSeeked);

    if (video.readyState >= 1 /* HAVE_METADATA */) onMeta();
    else video.addEventListener("loadedmetadata", onMeta);

    motion.addEventListener("change", onMotionChange);

    return () => {
      unsubscribe();
      video.removeEventListener("seeking", onSeeking);
      video.removeEventListener("seeked", onSeeked);
      video.removeEventListener("loadedmetadata", onMeta);
      motion.removeEventListener("change", onMotionChange);
    };
  }, []);

  return (
    <div className="hero-media">
      <div className="rv-veil relative h-full w-full overflow-hidden bg-espresso">
        <video
          ref={ref}
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          controls={false}
          tabIndex={-1}
          aria-hidden="true"
          onLoadedMetadata={() => setReady(true)}
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
        <div className="hero-fade-inline pointer-events-none absolute inset-y-0 hidden w-[46%] lg:block" />
        <div className="pointer-events-none absolute inset-x-0 top-0 hidden h-52 bg-gradient-to-b from-ink/85 via-ink/40 to-transparent lg:block" />
        <div className="pointer-events-none absolute inset-0 hidden lg:block lg:shadow-[inset_0_0_120px_rgba(14,11,10,0.5)]" />
      </div>
    </div>
  );
}
