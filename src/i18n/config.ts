/** Langues servies par le site. Le français est la langue par défaut. */
export const LOCALES = ["fr", "en", "ar"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "fr";

/** Cookie lu par le middleware pour rediriger « / » vers la bonne langue. */
export const LOCALE_COOKIE = "babacake-lang";

/** Étiquettes du sélecteur, chacune dans sa propre langue. */
export const LOCALE_LABELS: Record<Locale, string> = {
  fr: "FR",
  en: "EN",
  ar: "AR",
};

export const LOCALE_NAMES: Record<Locale, string> = {
  fr: "Français",
  en: "English",
  ar: "العربية",
};

export const LOCALE_DIR: Record<Locale, "ltr" | "rtl"> = {
  fr: "ltr",
  en: "ltr",
  ar: "rtl",
};

export function isLocale(value: string | undefined): value is Locale {
  return !!value && (LOCALES as readonly string[]).includes(value);
}

export function dirOf(locale: Locale): "ltr" | "rtl" {
  return LOCALE_DIR[locale];
}
