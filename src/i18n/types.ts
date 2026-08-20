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
    eyebrow: string;
    /** Titre principal, une entrée par ligne affichée. */
    title: Line[];
    tagline: string;
    cta: string;
    location: string;
  };
  /** Récit synchronisé au défilement. Mêmes clés que la timeline existante. */
  captions: {
    forme: Line[];
    idee: Line[];
    detail: Line[];
    savoir: Line[];
  };
  gallery: {
    title: string;
    subtitle: string;
    /** Textes alternatifs, indexés par nom de fichier réel. */
    alts: Record<string, string>;
  };
};
