import type { Line } from "@/i18n";

/**
 * Rend un titre multilingue. Chaque langue place son mot accentué là où sa
 * grammaire l'exige : le doré ne suit pas une position fixe mais le fragment
 * marqué dans le dictionnaire.
 */
export default function RichLines({
  lines,
  accentClassName = "text-gold-lite",
}: {
  lines: Line[];
  accentClassName?: string;
}) {
  return (
    <>
      {lines.map((line, i) => (
        <span key={i}>
          {i > 0 && <br />}
          {line.map((seg, j) =>
            seg.accent ? (
              <span key={j} className={`lining-figures ${accentClassName}`}>
                {seg.t}
              </span>
            ) : (
              <span key={j}>{seg.t}</span>
            ),
          )}
        </span>
      ))}
    </>
  );
}
