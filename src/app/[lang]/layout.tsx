import type { Metadata } from "next";
import { Amiri, Cormorant_Garamond, Jost, Tajawal } from "next/font/google";
import { notFound } from "next/navigation";
import Script from "next/script";

import {
  DEFAULT_LOCALE,
  LOCALES,
  dirOf,
  getDictionary,
  isLocale,
} from "@/i18n";
import "../globals.css";

/* Latin — inchangé : c'est l'identité typographique approuvée. */
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

/* Arabe — Amiri (naskh de tradition) répond au Cormorant, Tajawal au Jost.
   `preload: false` : ces fontes ne sont téléchargées que si la page les
   utilise réellement, donc jamais en français ni en anglais. */
const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic"],
  weight: ["400", "700"],
  display: "swap",
  preload: false,
});

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic"],
  weight: ["300", "400", "500"],
  display: "swap",
  preload: false,
});

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const { meta } = getDictionary(locale);

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(LOCALES.map((l) => [l, `/${l}`])),
    },
    openGraph: { title: meta.title, description: meta.description, locale },
  };
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <html
      lang={lang}
      dir={dirOf(lang)}
      className={`${cormorant.variable} ${jost.variable} ${amiri.variable} ${tajawal.variable} h-full antialiased`}
    >
<body className="min-h-full flex flex-col bg-ink text-cream">
  {children}

  <Script
    id="meta-pixel"
    strategy="afterInteractive"
    dangerouslySetInnerHTML={{
      __html: `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');

        fbq('init', '3483653451797167');
        fbq('track', 'PageView');
      `,
    }}
  />
</body>
</html>
);
}