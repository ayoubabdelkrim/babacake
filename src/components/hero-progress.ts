/**
 * Source unique de progression du Hero.
 *
 * Un seul écouteur de scroll et une seule boucle rAF pour toute la section :
 * la vidéo et la typographie lisent exactement la même valeur, donc elles ne
 * peuvent pas se désynchroniser. La boucle démarre à la demande et s'arrête
 * dès que la position est stable — rien ne tourne à l'arrêt.
 */

import { heroProgress, tailProgress } from "./hero-scrub";

/** Lissage : le défilement est saccadé, la séquence ne doit pas l'être. */
const EASING = 0.18;
/** En deçà, la progression est considérée atteinte (≈ 1/50 d'image vidéo). */
const SETTLED = 0.0001;

export type HeroFrame = { progress: number; tail: number };
type Subscriber = (frame: HeroFrame) => void;

const subscribers = new Set<Subscriber>();

let track: HTMLElement | null = null;
let raf = 0;
let running = false;
let smoothed = 0;
let started = false;

const read = () => {
  if (!track) return { target: 0, tail: 0 };
  const top = track.getBoundingClientRect().top;
  const h = track.offsetHeight;
  const vh = window.innerHeight;
  return { target: heroProgress(h, vh, top), tail: tailProgress(h, vh, top) };
};

const emit = (frame: HeroFrame) => {
  for (const fn of subscribers) fn(frame);
};

const tick = () => {
  const { target, tail } = read();
  smoothed += (target - smoothed) * EASING;

  const settled = Math.abs(target - smoothed) < SETTLED;
  if (settled) smoothed = target;

  emit({ progress: smoothed, tail });

  if (settled) {
    running = false;
    return;
  }
  raf = requestAnimationFrame(tick);
};

const kick = () => {
  if (running || !track) return;
  running = true;
  raf = requestAnimationFrame(tick);
};

/**
 * S'abonne à la progression. Le premier abonné installe les écouteurs, le
 * dernier à partir les retire. Renvoie la fonction de désabonnement.
 */
export function subscribeHeroProgress(
  el: HTMLElement,
  fn: Subscriber,
): () => void {
  track = el;
  subscribers.add(fn);

  if (!started) {
    started = true;
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick, { passive: true });
  }

  // Un rechargement en plein Hero ne doit pas repartir de zéro.
  const { target, tail } = read();
  smoothed = target;
  fn({ progress: smoothed, tail });

  return () => {
    subscribers.delete(fn);
    if (subscribers.size > 0) return;

    cancelAnimationFrame(raf);
    running = false;
    started = false;
    track = null;
    window.removeEventListener("scroll", kick);
    window.removeEventListener("resize", kick);
  };
}

/** Relance manuelle (ex. métadonnées vidéo arrivées après l'abonnement). */
export function refreshHeroProgress() {
  kick();
}
