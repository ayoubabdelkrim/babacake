/**
 * Jeu d'icônes partagé par le pied du Hero et la section Contact.
 * Tracé inline plutôt qu'une bibliothèque : trois glyphes ne justifient pas
 * une dépendance, et le trait reste accordé à la finesse de la typographie.
 */
export type SocialName = "instagram" | "facebook" | "whatsapp";

const PATHS: Record<SocialName, React.ReactNode> = {
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  facebook: (
    <path d="M14.5 8.5h2.2V5.6h-2.4c-2.2 0-3.6 1.4-3.6 3.6v1.6H8.4v2.9h2.3V21h3V13.7h2.3l.4-2.9h-2.7V9.6c0-.7.3-1.1.8-1.1Z" />
  ),
  whatsapp: (
    <path d="M4 20l1.2-4A8 8 0 1 1 8.4 19L4 20Zm5.6-5.9c.9 1.7 2.1 2.6 3.6 3.1.8.3 1.4.2 1.9-.1.4-.2.7-.7.8-1.1.1-.3 0-.5-.2-.6l-1.6-.8c-.2-.1-.4 0-.6.2l-.4.5c-.1.2-.3.2-.5.1-.9-.4-1.6-1.1-2-2-.1-.2 0-.4.1-.5l.4-.4c.2-.2.2-.4.1-.6l-.7-1.5c-.1-.3-.4-.4-.6-.3-.5.2-.9.5-1.1 1-.3.7-.2 1.5.2 2.3l.6 1.2Z" />
  ),
};

export default function SocialIcon({
  name,
  className = "h-[15px] w-[15px]",
}: {
  name: SocialName;
  className?: string;
}) {
  const outlined = name === "instagram";
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill={outlined ? "none" : "currentColor"}
      stroke={outlined ? "currentColor" : "none"}
      strokeWidth="1.4"
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  );
}
