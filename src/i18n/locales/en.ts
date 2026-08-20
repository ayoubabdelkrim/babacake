import type { Dictionary } from "../types";

export const en: Dictionary = {
  meta: {
    title: "BabaCake — The art of the 3D cake",
    description:
      "Unique creations shaped with precision. A bespoke 3D cake atelier.",
  },
  nav: {
    home: "BabaCake — home",
    links: [
      { label: "Creations", href: "#creations" },
      { label: "Bespoke", href: "#sur-mesure" },
      { label: "The atelier", href: "#atelier" },
      { label: "Contact", href: "#contact" },
    ],
    openMenu: "Open menu",
    closeMenu: "Close menu",
    language: "Choose language",
  },
  hero: {
    brand: "BabaCake",
    title: [
      [{ t: "The art of" }],
      [{ t: "the " }, { t: "3D", accent: true }, { t: " cake" }],
    ],
    tagline: "Unique creations shaped with precision.",
    location: "Salé · Morocco",
  },
  captions: {
    forme: [[{ t: "Art takes shape" }]],
    idee: [[{ t: "From idea" }], [{ t: "to creation" }]],
    detail: [[{ t: "Every detail" }], [{ t: "matters." }]],
    savoir: [[{ t: "Discover our " }, { t: "craft", accent: true }]],
  },
  contact: {
    title: "Let’s create something special",
    body: ["Have an idea, a project, or a unique cake in mind?", "Let’s talk."],
    whatsapp: "WhatsApp",
    instagram: "Instagram",
    facebook: "Facebook",
    label: "Contact us",
  },
  gallery: {
    title: "Our creations",
    subtitle: "Every cake tells a story.",
    alts: {
      "download (9).jpg":
        "Four-tier wedding cake with white lace and a cascade of golden orchids",
      "download (4).jpg":
        "Bamboo-green ombre cake decorated with hand-modelled pandas",
      "Car Cake.jpg":
        "Three-tier spiral cake forming a racetrack with model cars",
      "download (7).jpg":
        "Two-tier unicorn cake with a pastel mane and a personalised cloud",
      "download (6).jpg":
        "Three-tier unicorn cake in pastel ombre with a gold horn and buttercream roses",
      "Rechartcake.jpg": "Two-tier cake shaped as a dalmatian puppy",
      "download (8).jpg":
        "Bride and groom wedding cake with ivory draping and a black tuxedo",
      "download (3).jpg":
        "Graphic comic-style cake in pink and white with bold black outlines",
      "download (10).jpg":
        "Four-tier wedding cake with sculpted draping and red roses",
      "💚.jpg":
        "Minimalist sage-green cake with a graphic drip and a modelled bow",
      "download (11).jpg":
        "Heart-shaped bridal cake with a black tuxedo and an ivory rose gown",
      "download (12).jpg":
        "Two-tier Spider-Man cake with a spider web and a modelled figure",
    },
  },
};
