"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Un seul IntersectionObserver pour toute la section : aucun composant client
 * par image, aucune boucle d'animation JS. Chaque élément est libéré dès qu'il
 * est révélé, puis l'observateur se déconnecte quand tout est visible.
 *
 * Filet de sécurité : si l'observateur ne se déclenche jamais — onglet ouvert
 * en arrière-plan, retour via le bfcache, page masquée au chargement — un
 * balayage manuel révèle ce qui est réellement à l'écran. Une animation ne
 * doit jamais laisser du contenu invisible.
 */
export default function RevealOnScroll({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const targets = Array.from(
      el.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    if (targets.length === 0) return;

    const show = (node: Element) => node.classList.add("is-in");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      targets.forEach(show);
      return;
    }

    let remaining = targets.length;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          show(entry.target);
          observer.unobserve(entry.target);
          remaining -= 1;
        }
        if (remaining <= 0) observer.disconnect();
      },
      // Déclenche un peu avant l'entrée réelle : la révélation est déjà
      // terminée quand l'image atteint le centre du regard.
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );

    targets.forEach((t) => observer.observe(t));

    // Balayage manuel : ne révèle que ce qui est effectivement dans la fenêtre,
    // pour que les images encore plus bas gardent leur animation d'entrée.
    const sweep = () => {
      for (const t of targets) {
        if (t.classList.contains("is-in")) continue;
        const r = t.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) {
          show(t);
          observer.unobserve(t);
        }
      }
    };

    const onVisible = () => {
      if (document.visibilityState === "visible") sweep();
    };

    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("pageshow", sweep);
    const safety = window.setTimeout(sweep, 2500);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("pageshow", sweep);
      window.clearTimeout(safety);
    };
  }, []);

  return <div ref={root}>{children}</div>;
}
