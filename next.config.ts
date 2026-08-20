import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next 16 n'autorise que les qualités déclarées ici. 82 donne un rendu
    // nettement plus net que le défaut (75) sur les détails des gâteaux 3D,
    // pour un poids quasi identique.
    qualities: [75, 82],
  },
};

export default nextConfig;
