import { DEFAULT_LOCALE, type Locale } from "./config";
import { ar } from "./locales/ar";
import { en } from "./locales/en";
import { fr } from "./locales/fr";
import type { Dictionary } from "./types";

const DICTIONARIES: Record<Locale, Dictionary> = { fr, en, ar };

/**
 * Point d'accès unique aux traductions. Tout texte visible passe par ici :
 * ajouter une langue revient à déposer un fichier dans `locales/` et à
 * l'enregistrer ci-dessus.
 */
export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale] ?? DICTIONARIES[DEFAULT_LOCALE];
}

export * from "./config";
export type { Dictionary, Line, Segment } from "./types";
