const ICONS = {
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

const SOCIALS: {
  name: string;
  label: string;
  href: string;
  icon: keyof typeof ICONS;
}[] = [
  { name: "Instagram", label: "Instagram", href: "#", icon: "instagram" },
  { name: "Facebook", label: "Facebook", href: "#", icon: "facebook" },
  { name: "WhatsApp", label: "WhatsApp", href: "#", icon: "whatsapp" },
];

export default function HeroSocials({ location }: { location: string }) {
  return (
    <div className="flex items-center gap-6">
      <ul className="flex items-center gap-3">
        {SOCIALS.map((s) => (
          <li key={s.name}>
            <a
              href={s.href}
              aria-label={s.label}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/20 text-cream/60 transition-colors duration-500 hover:border-gold/60 hover:text-gold-lite"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-[15px] w-[15px]"
                fill={s.icon === "instagram" ? "none" : "currentColor"}
                stroke={s.icon === "instagram" ? "currentColor" : "none"}
                strokeWidth="1.4"
                aria-hidden="true"
              >
                {ICONS[s.icon]}
              </svg>
            </a>
          </li>
        ))}
      </ul>

      <span className="h-px w-8 bg-cream/20" aria-hidden="true" />

      <span className="font-sans text-[0.62rem] font-light tracking-[0.3em] text-cream/45 uppercase">
        {location}
      </span>
    </div>
  );
}
