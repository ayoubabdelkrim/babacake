import { notFound } from "next/navigation";

import Gallery from "@/components/Gallery";
import Hero from "@/components/Hero";
import { getDictionary, isLocale } from "@/i18n";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = getDictionary(lang);

  return (
    <main className="flex-1">
      <Hero dict={dict} locale={lang} />
      <Gallery dict={dict} />
    </main>
  );
}
