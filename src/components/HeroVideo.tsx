"use client";

import { useEffect, useRef, useState } from "react";

import { refreshHeroProgress, subscribeHeroProgress } from "./hero-progress";
import { HERO_POSTER } from "./hero-poster";
import { shouldSeek, videoTimeAt, SETTLED } from "./hero-scrub";

/**
 * Source unique : un seul <video> pour mobile et desktop (un seul
 * téléchargement). Version optimisée pour le web — même image, même cadrage,
 * même 720×1280, mais 4,4 Mo au lieu de 23, sans piste audio, et une image clé
 * toutes les 5 images pour que le scrub au défilement reste instantané.
 * L'original reste dans public/video/hero.mp4 comme sauvegarde.
 */
export const HERO_VIDEO_SRC = "/video/hero-optimized.mp4";

export default function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const track = video.closest<HTMLElement>("[data-hero-scroll]");
    if (!track) return;

    // La vidéo n'est jamais lue : elle est pilotée image par image. Mais un
    // décodeur qui n'a jamais démarré ne peint pas les `currentTime` sur iOS,
    // et Safari ignore `preload` tant qu'aucune lecture n'a été demandée.
    // On la démarre donc une fois, en sourdine, pour la mettre aussitôt en
    // pause : c'est un amorçage de décodeur, pas une lecture.
    video.muted = true;
    let primed = false;
    const prime = () => {
      if (primed) return;
      primed = true;
      try {
        const started = video.play();
        if (started) started.then(() => video.pause()).catch(() => {});
        else video.pause();
      } catch {
        /* Mode économie d'énergie : l'image d'attente reste affichée. */
      }
    };

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
      // Un seek avant les métadonnées lève une exception sur certains mobiles ;
      // sans première image décodée il ne peindrait rien de toute façon.
      if (video.readyState < 2 /* HAVE_CURRENT_DATA */) return;
      try {
        video.currentTime = t;
        applied = t;
      } catch {
        /* Seek momentanément indisponible : on retentera à la frame suivante. */
      }
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
      prime();
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

    // On ne dévoile la vidéo que lorsqu'une image est réellement décodée
    // (readyState >= 2). Auparavant l'affichage dépendait du seul
    // `loadedmetadata` : si l'évènement n'arrivait jamais — ce que fait iOS
    // tant que rien n'a été lu — l'élément restait à opacité 0 indéfiniment.
    const showIfPainted = () => {
      if (video.readyState >= 2) setReady(true);
    };

    const onError = () => {
      // L'image d'attente reste en place : jamais de rectangle noir.
      setReady(false);
    };

    video.addEventListener("seeking", onSeeking);
    video.addEventListener("seeked", onSeeked);
    video.addEventListener("loadedmetadata", onMeta);
    video.addEventListener("loadeddata", showIfPainted);
    video.addEventListener("canplay", showIfPainted);
    video.addEventListener("error", onError);
    motion.addEventListener("change", onMotionChange);

    // Safari ne charge rien de lui-même : ce coup de pouce déclenche la
    // récupération des métadonnées et débloque tout le reste.
    if (video.readyState === 0 /* HAVE_NOTHING */) video.load();
    if (video.readyState >= 1) onMeta();
    showIfPainted();
    prime();

    // Filet : si aucun évènement n'arrive, on revérifie une fois plutôt que
    // de rester bloqué sur l'image d'attente alors que la vidéo est prête.
    const safety = window.setTimeout(() => {
      showIfPainted();
      if (!duration && Number.isFinite(video.duration)) onMeta();
    }, 2500);

    return () => {
      unsubscribe();
      window.clearTimeout(safety);
      video.removeEventListener("seeking", onSeeking);
      video.removeEventListener("seeked", onSeeked);
      video.removeEventListener("loadedmetadata", onMeta);
      video.removeEventListener("loadeddata", showIfPainted);
      video.removeEventListener("canplay", showIfPainted);
      video.removeEventListener("error", onError);
      motion.removeEventListener("change", onMotionChange);
    };
  }, []);

  return (
    <div className="hero-media">
      <div className="rv-veil relative h-full w-full overflow-hidden bg-espresso">
        {/* Image d'attente, exactement au même cadrage que la vidéo. Elle
            reste derrière : si le décodage échoue, le Hero garde une image. */}
        {/* eslint-disable-next-line @next/next/no-img-element --
            data URI de 1,4 ko : next/image n'a rien à optimiser ici et
            ajouterait une requête là où l'objectif est de n'en avoir aucune. */}
        <img
          src={HERO_POSTER}
          alt=""
          aria-hidden="true"
          className="hero-frame absolute inset-0 scale-105 blur-[6px]"
        />
        <video
          ref={ref}
          muted
          playsInline
          preload="metadata"
          poster={HERO_POSTER}
          disablePictureInPicture
          controls={false}
          tabIndex={-1}
          aria-hidden="true"
          className={`relative transition-opacity duration-700 ease-out ${
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
