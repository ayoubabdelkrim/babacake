import type { Dictionary } from "../types";

export const fr: Dictionary = {
  meta: {
    title: "BabaCake — L’art du gâteau 3D",
    description:
      "Créations uniques façonnées avec précision. Atelier de gâteaux 3D sur mesure.",
  },
  nav: {
    home: "BabaCake — accueil",
    links: [
      { label: "Créations", href: "#creations" },
      { label: "Sur mesure", href: "#sur-mesure" },
      { label: "L’atelier", href: "#atelier" },
      { label: "Contact", href: "#contact" },
    ],
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    language: "Choisir la langue",
  },
  hero: {
    brand: "BabaCake",
    title: [[{ t: "L’art du" }], [{ t: "gâteau " }, { t: "3D", accent: true }]],
    tagline: "Créations uniques façonnées avec précision.",
    location: "Salé · Maroc",
  },
  captions: {
    forme: [[{ t: "L’art prend forme" }]],
    idee: [[{ t: "De l’idée" }], [{ t: "à la création" }]],
    detail: [[{ t: "Chaque détail" }], [{ t: "compte." }]],
    savoir: [[{ t: "Voyez notre " }, { t: "savoir-faire", accent: true }]],
  },
  contact: {
    title: "Parlons de votre création",
    body: ["Une idée, un projet, un gâteau unique ?", "Parlons-en."],
    whatsapp: "WhatsApp",
    instagram: "Instagram",
    facebook: "Facebook",
    label: "Nous contacter",
  },
  gallery: {
    title: "Nos créations",
    subtitle: "Chaque gâteau raconte une histoire.",
    alts: {
      "download (9).jpg":
        "Pièce montée de mariage à quatre étages, dentelle blanche et cascade d’orchidées dorées",
      "download (4).jpg":
        "Gâteau dégradé vert bambou orné de pandas modelés à la main",
      "Car Cake.jpg":
        "Gâteau trois étages en spirale formant un circuit de course avec voitures",
      "download (7).jpg":
        "Gâteau licorne deux étages, crinière pastel et nuage personnalisé",
      "download (6).jpg":
        "Gâteau licorne trois étages aux dégradés pastel, corne dorée et roses en crème",
      "Rechartcake.jpg": "Gâteau deux étages en forme de chiot dalmatien",
      "download (8).jpg":
        "Gâteau de mariage marié et mariée, drapé ivoire et smoking noir",
      "download (3).jpg":
        "Gâteau graphique style bande dessinée, rose et blanc aux contours noirs",
      "download (10).jpg":
        "Pièce montée quatre étages, drapé sculpté et roses rouges",
      "💚.jpg":
        "Gâteau minimaliste vert sauge à coulure graphique et nœud modelé",
      "download (11).jpg":
        "Gâteau cœur mariés, smoking noir et robe de roses ivoire",
      "download (12).jpg":
        "Gâteau deux étages Spider-Man, toile d’araignée et figurine modelée",
    },
  },
};
