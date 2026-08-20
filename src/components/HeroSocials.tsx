import { FACEBOOK_URL, INSTAGRAM_URL, WHATSAPP_URL } from "./contact-data";
import SocialIcon, { type SocialName } from "./social-icons";

const SOCIALS: { name: string; href: string; icon: SocialName }[] = [
  { name: "Instagram", href: INSTAGRAM_URL, icon: "instagram" },
  { name: "Facebook", href: FACEBOOK_URL, icon: "facebook" },
  { name: "WhatsApp", href: WHATSAPP_URL, icon: "whatsapp" },
];

export default function HeroSocials({ location }: { location: string }) {
  return (
    <div className="flex items-center gap-6">
      <ul className="flex items-center gap-3">
        {SOCIALS.map((s) => (
          <li key={s.name}>
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.name}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/20 text-cream/60 transition-colors duration-500 hover:border-gold/60 hover:text-gold-lite"
            >
              <SocialIcon name={s.icon} />
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
