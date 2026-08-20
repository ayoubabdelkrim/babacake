import type { Dictionary } from "@/i18n";

import RevealOnScroll from "./RevealOnScroll";
import {
  FACEBOOK_URL,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  WHATSAPP_NUMBER_DISPLAY,
  WHATSAPP_URL,
} from "./contact-data";
import SocialIcon, { type SocialName } from "./social-icons";

export default function Contact({ dict }: { dict: Dictionary }) {
  const { contact } = dict;

  const channels: {
    icon: SocialName;
    label: string;
    value: string;
    href: string;
    primary?: boolean;
  }[] = [
    {
      icon: "whatsapp",
      label: contact.whatsapp,
      value: WHATSAPP_NUMBER_DISPLAY,
      href: WHATSAPP_URL,
      primary: true,
    },
    {
      icon: "instagram",
      label: contact.instagram,
      value: INSTAGRAM_HANDLE,
      href: INSTAGRAM_URL,
    },
    {
      icon: "facebook",
      label: contact.facebook,
      value: "BabaCake",
      href: FACEBOOK_URL,
    },
  ];

  return (
    <section id="contact" className="bg-ink text-cream">
      <div className="px-6 py-24 sm:px-8 sm:py-28 lg:px-[6vw] lg:py-36 2xl:px-[8vw]">
        <RevealOnScroll>
          <div className="lg:flex lg:items-start lg:justify-between lg:gap-20">
            <div className="lg:max-w-[36%]">
              <span
                data-reveal="item"
                className="mb-7 block h-px w-12 bg-gold/45 lg:mb-9"
                aria-hidden="true"
              />
              <h2
                data-reveal="item"
                style={{ ["--reveal-delay" as string]: "90ms" }}
                className="font-display text-[clamp(2.2rem,8.5vw,3rem)] leading-[1.02] font-light text-cream italic lg:text-[clamp(2.8rem,4vw,4.25rem)]"
              >
                {contact.title}
              </h2>
              <p
                data-reveal="item"
                style={{ ["--reveal-delay" as string]: "180ms" }}
                className="mt-6 max-w-[24rem] font-sans text-[0.95rem] leading-relaxed font-light text-beige lg:mt-8 lg:text-[1.02rem]"
              >
                {contact.body.map((line, i) => (
                  <span key={i} className="block">
                    {line}
                  </span>
                ))}
              </p>
            </div>

            <ul
              aria-label={contact.label}
              className="mt-12 w-full lg:mt-0 lg:max-w-[30rem]"
            >
              {channels.map((c, i) => (
                <li
                  key={c.label}
                  data-reveal="item"
                  style={{ ["--reveal-delay" as string]: `${260 + i * 90}ms` }}
                  className="border-t border-cream/12 last:border-b"
                >
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-5 py-6 sm:gap-6 sm:py-7"
                  >
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-colors duration-500 ${
                        c.primary
                          ? "border-gold/60 text-gold-lite group-hover:border-gold group-hover:bg-gold group-hover:text-ink"
                          : "border-cream/20 text-cream/60 group-hover:border-gold/60 group-hover:text-gold-lite"
                      }`}
                    >
                      <SocialIcon name={c.icon} className="h-[17px] w-[17px]" />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span
                        className={`block font-sans text-[0.62rem] font-light tracking-[0.28em] uppercase ${
                          c.primary ? "text-gold-lite" : "text-cream/45"
                        }`}
                      >
                        {c.label}
                      </span>
                      <span
                        dir="ltr"
                        className={`mt-1.5 block truncate font-sans font-light transition-colors duration-500 group-hover:text-gold-lite ltr:text-start rtl:text-end ${
                          c.primary
                            ? "text-[1.1rem] text-cream sm:text-[1.25rem]"
                            : "text-[0.98rem] text-cream/80"
                        }`}
                      >
                        {c.value}
                      </span>
                    </span>

                    <svg
                      viewBox="0 0 20 8"
                      className="h-2 w-5 shrink-0 text-cream/30 transition-all duration-500 ease-out group-hover:translate-x-1 group-hover:text-gold-lite rtl:-scale-x-100 rtl:group-hover:-translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      aria-hidden="true"
                    >
                      <path d="M0 4h18M14.5 1 18 4l-3.5 3" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </RevealOnScroll>
      </div>

      <noscript>
        <style>{`[data-reveal]{opacity:1 !important;transform:none !important}`}</style>
      </noscript>
    </section>
  );
}
