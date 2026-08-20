/**
 * Données de la galerie.
 *
 * `file` correspond EXACTEMENT au nom présent dans public/image (espaces,
 * parenthèses et emoji compris) — l'URL est encodée au rendu.
 * `w` / `h` sont les dimensions réelles du JPEG : elles réservent la place
 * avant chargement, donc aucun décalage de mise en page (CLS = 0).
 * Les textes alternatifs ne vivent plus ici : ils sont traduits, donc ils
 * appartiennent aux dictionnaires, indexés par ce même `file`.
 * `scale` pilote le rythme éditorial : « full » occupe toute la largeur,
 * « inset » est resserré et aligné alternativement à gauche/droite.
 */
export type GalleryItem = {
  file: string;
  w: number;
  h: number;
  scale: "full" | "inset";
};

export const GALLERY_ITEMS: GalleryItem[] = [
  { file: "download (9).jpg", w: 736, h: 1104, scale: "full" },
  { file: "download (4).jpg", w: 736, h: 736, scale: "inset" },
  { file: "Car Cake.jpg", w: 736, h: 1288, scale: "full" },
  { file: "download (7).jpg", w: 736, h: 858, scale: "inset" },
  { file: "download (6).jpg", w: 736, h: 1308, scale: "full" },
  { file: "Rechartcake.jpg", w: 736, h: 736, scale: "inset" },
  { file: "download (8).jpg", w: 736, h: 981, scale: "full" },
  { file: "download (3).jpg", w: 736, h: 981, scale: "inset" },
  { file: "download (10).jpg", w: 437, h: 640, scale: "full" },
  { file: "💚.jpg", w: 736, h: 903, scale: "inset" },
  { file: "download (11).jpg", w: 736, h: 1051, scale: "full" },
  { file: "download (12).jpg", w: 736, h: 963, scale: "inset" },
];

/**
 * NON PUBLIÉES — 3 des 15 fichiers de public/image sont volontairement absents
 * de la galerie. Les fichiers restent en place : il suffit de coller une de
 * ces entrées dans GALLERY_ITEMS pour la publier (et d'ajouter son texte
 * alternatif dans les trois dictionnaires).
 *
 * 1. "Minion cake.jpg" — porte le filigrane « www.creativecakesbyclare.co.uk ».
 * 2. "Ad günün mübarək 🏎️🏎️Yusif🏎️🏎️ 📞Te.jpg" — porte le logo « LoLa Cake Baku ».
 *    Ces deux photos affichent la marque d'une autre pâtisserie.
 * 3. "download (5).jpg" — capture d'écran : flèche de retour et bouton visibles.
 */
export const WITHHELD: GalleryItem[] = [
  { file: "Minion cake.jpg", w: 736, h: 853, scale: "inset" },
  {
    file: "Ad günün mübarək 🏎️🏎️Yusif🏎️🏎️ 📞Te.jpg",
    w: 736,
    h: 809,
    scale: "inset",
  },
  { file: "download (5).jpg", w: 735, h: 811, scale: "inset" },
];

/**
 * Chemin web (jamais de chemin Windows côté navigateur).
 * On passe le nom BRUT : next/image encode lui-même le paramètre `url`.
 * Encoder ici produirait un double encodage (« %20 » devient « %2520 »)
 * et l'optimiseur chercherait un fichier qui n'existe pas.
 */
export const imageSrc = (file: string) => `/image/${file}`;
