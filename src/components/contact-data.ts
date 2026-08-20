/**
 * Coordonnées réelles. Elles ne vivent pas dans les dictionnaires : un numéro
 * et une URL sont identiques dans les trois langues, les tripler inviterait
 * la divergence. Seuls les libellés sont traduits.
 */
export const WHATSAPP_NUMBER_DISPLAY = "0665479126";

/** Format international requis par wa.me : indicatif Maroc, sans le 0 initial. */
export const WHATSAPP_URL = `https://wa.me/212${WHATSAPP_NUMBER_DISPLAY.replace(/^0/, "")}`;

export const INSTAGRAM_HANDLE = "@baba.cake";
export const INSTAGRAM_URL = "https://www.instagram.com/baba.cake/";

/** URL fournie telle quelle — ne pas « nettoyer » en /babacake. */
export const FACEBOOK_URL =
  "https://www.facebook.com/profile.php?id=61578705251060";
