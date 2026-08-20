/**
 * Un fragment de texte. `accent` marque le mot mis en or, comme « 3D » dans
 * le titre du Hero. Découper ainsi plutôt que d'injecter du HTML permet à
 * chaque langue de placer son accent où sa grammaire l'exige — la position
 * du mot accentué n'est pas la même en français, en anglais et en arabe.
 */
export type Segment = { t: string; accent?: boolean };

/** Une ligne de titre, composée d'un ou plusieurs fragments. */
export type Line = Segment[];

export type Dictionary = {
  meta: { title: string; description: string };
  nav: {
    home: string;
    links: { label: string; href: string }[];
    openMenu: string;
    closeMenu: string;
    language: string;
  };
  hero: {
    /** Révélation initiale, plein écran. La marque ne se traduit pas. */
    brand: string;
    /** Deuxième état du récit, et libellé lu par les technologies d'assistance. */
    title: Line[];
    /** Description, réservée aux lecteurs d'écran : le Hero reste minimal. */
    tagline: string;
    location: string;
  };
  /** Récit synchronisé au défilement. Mêmes clés que la timeline existante. */
  captions: {
    forme: Line[];
    idee: Line[];
    detail: Line[];
    savoir: Line[];
  };
  contact: {
    title: string;
    /** Accroche, une entrée par ligne affichée. */
    body: string[];
    whatsapp: string;
    instagram: string;
    facebook: string;
    /** Intitulé accessible du groupe de liens. */
    label: string;
  };
  gallery: {
    title: string;
    subtitle: string;
    /** Textes alternatifs, indexés par nom de fichier réel. */
    alts: Record<string, string>;
  };
};
