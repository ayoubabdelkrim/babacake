/**
 * Logique pure du scrub vidéo du Hero.
 *
 * Isolée du composant pour deux raisons : elle se teste sans navigateur, et
 * elle documente noir sur blanc la correspondance défilement → image.
 * Aucune de ces fonctions ne touche au DOM.
 */

/** Pas minimal entre deux seeks : inutile de demander mieux qu'une image. */
export const MIN_STEP = 1 / 24;

/**
 * Marge de fin : sur certains navigateurs `currentTime === duration` vide
 * l'image. On s'arrête juste avant pour que la dernière image reste affichée.
 */
export const END_GUARD = 0.05;

/** Lissage du scrub : le défilement est saccadé, la vidéo ne doit pas l'être. */
export const EASING = 0.18;

/** En deçà de ce delta, on considère la position atteinte. */
export const SETTLED = 0.004;

/**
 * Progression 0 → 1 sur la hauteur excédentaire de la section.
 * `trackTop` est le `getBoundingClientRect().top` de la piste : 0 quand le
 * Hero touche le haut de l'écran, négatif ensuite.
 */
export function scrollProgress(
  trackHeight: number,
  viewportHeight: number,
  trackTop: number,
): number {
  const distance = trackHeight - viewportHeight;
  if (distance <= 0) return 0;
  return Math.min(1, Math.max(0, -trackTop / distance));
}

/** Position vidéo visée pour une progression donnée. */
export function videoTimeAt(progress: number, duration: number): number {
  if (!Number.isFinite(duration) || duration <= 0) return 0;
  return progress * Math.max(0, duration - END_GUARD);
}

/** Un pas de lissage vers la cible, avec accrochage final exact. */
export function stepTowards(current: number, target: number): number {
  const next = current + (target - current) * EASING;
  return Math.abs(target - next) < SETTLED ? target : next;
}

/**
 * Faut-il réellement déclencher un seek ? On saute les micro-variations
 * (sous l'image) sauf à l'arrivée, où l'on veut la position exacte.
 */
export function shouldSeek(
  next: number,
  applied: number,
  settled: boolean,
): boolean {
  if (settled) return applied !== next;
  return Math.abs(next - applied) >= MIN_STEP;
}

/* ============================================================
   Typographie synchronisée — même progression que la vidéo.
   ============================================================ */

/**
 * Respiration finale, en fraction de hauteur d'écran. La piste passe de 300vh
 * à 330vh : les 300vh mappés restent identiques (le rythme du scrub vidéo est
 * inchangé), les 30vh ajoutés tiennent la dernière image à l'écran.
 */
export const HOLD_RATIO = 0.3;

/** Distance réellement mappée sur 0 → 1, la respiration retirée. */
function mappedDistance(trackHeight: number, viewportHeight: number): number {
  return trackHeight - viewportHeight - viewportHeight * HOLD_RATIO;
}

/**
 * Progression 0 → 1 sur la partie mappée de la piste.
 * Atteint 1 avant la fin de la section : le reste est la respiration.
 */
export function heroProgress(
  trackHeight: number,
  viewportHeight: number,
  trackTop: number,
): number {
  const distance = mappedDistance(trackHeight, viewportHeight);
  if (distance <= 0) return 0;
  return Math.min(1, Math.max(0, -trackTop / distance));
}

/**
 * Avancement 0 → 1 dans la seule respiration finale. Vaut 0 tant que la
 * progression principale n'est pas terminée. Sert à retirer doucement le
 * dernier mot pour laisser la dernière image seule avant la Galerie.
 */
export function tailProgress(
  trackHeight: number,
  viewportHeight: number,
  trackTop: number,
): number {
  const distance = mappedDistance(trackHeight, viewportHeight);
  const hold = viewportHeight * HOLD_RATIO;
  if (distance <= 0 || hold <= 0) return 0;
  const scrolled = -trackTop - distance;
  return Math.min(1, Math.max(0, scrolled / hold));
}

/** Interpolation douce, sans rebond ni élasticité. */
export function smoothstep(edge0: number, edge1: number, x: number): number {
  if (edge1 <= edge0) return x >= edge1 ? 1 : 0;
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

export type CaptionSpec = {
  /** Fenêtre d'apparition. `null` = déjà présent au départ (bloc d'intro). */
  enter: [number, number] | null;
  /** Fenêtre de disparition. `null` = reste jusqu'à la fin. */
  exit: [number, number] | null;
};

/** Amplitudes volontairement faibles : éditorial, jamais spectaculaire. */
export const ENTER_Y = 20;
export const EXIT_Y = -20;
export const ENTER_SCALE = 0.98;

export type CaptionStyle = { opacity: number; y: number; scale: number };

/**
 * État visuel d'un bloc de texte pour une progression donnée.
 * Les fenêtres se chevauchent volontairement : le texte suivant commence à
 * arriver avant que le précédent ait fini de partir.
 */
export function captionStyle(p: number, spec: CaptionSpec): CaptionStyle {
  const tIn = spec.enter ? smoothstep(spec.enter[0], spec.enter[1], p) : 1;
  const tOut = spec.exit ? smoothstep(spec.exit[0], spec.exit[1], p) : 0;
  return {
    opacity: tIn * (1 - tOut),
    y: (1 - tIn) * ENTER_Y + tOut * EXIT_Y,
    scale: ENTER_SCALE + (1 - ENTER_SCALE) * tIn,
  };
}

/**
 * La séquence, six états. `brand` ouvre le site : son entrée est l'animation
 * CSS de révélation, elle ne fait donc que sortir. Les fenêtres se chevauchent
 * volontairement : la fenêtre d'entrée d'un message est exactement celle de
 * sortie du précédent. C'est un fondu enchaîné — à mi-parcours les deux sont
 * à 0,5 — plutôt qu'un relais décalé, qui creusait un instant presque vide
 * (mesuré à 0,23 d'opacité maximale) entre deux messages.
 */
export const HERO_CAPTIONS: { id: string; spec: CaptionSpec }[] = [
  { id: "brand", spec: { enter: null, exit: [0.12, 0.2] } },
  { id: "title", spec: { enter: [0.12, 0.2], exit: [0.32, 0.4] } },
  { id: "forme", spec: { enter: [0.32, 0.4], exit: [0.52, 0.6] } },
  { id: "idee", spec: { enter: [0.52, 0.6], exit: [0.7, 0.78] } },
  { id: "detail", spec: { enter: [0.7, 0.78], exit: [0.86, 0.93] } },
  { id: "savoir", spec: { enter: [0.86, 0.93], exit: null } },
];

/** Retrait du dernier mot pendant la respiration, image finale laissée seule. */
export function tailFade(tail: number): number {
  return 1 - smoothstep(0.5, 1, tail);
}
