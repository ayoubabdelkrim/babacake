import type { Dictionary } from "../types";

/**
 * Arabe. Deux points d'attention typographiques :
 * — les titres sont découpés en lignes courtes pour éviter les césures
 *   maladroites, l'arabe ne se coupant pas comme le latin ;
 * — l'italique n'existe pas en arabe : la feuille de style la neutralise
 *   en RTL plutôt que de laisser le navigateur pencher les glyphes.
 */
export const ar: Dictionary = {
  meta: {
    title: "بابا كيك — فن الكيك ثلاثي الأبعاد",
    description: "إبداعات فريدة تُصنع بدقة. مشغل كيك ثلاثي الأبعاد حسب الطلب.",
  },
  nav: {
    home: "بابا كيك — الرئيسية",
    links: [
      { label: "إبداعاتنا", href: "#creations" },
      { label: "حسب الطلب", href: "#sur-mesure" },
      { label: "المشغل", href: "#atelier" },
      { label: "اتصل بنا", href: "#contact" },
    ],
    openMenu: "فتح القائمة",
    closeMenu: "إغلاق القائمة",
    language: "اختر اللغة",
  },
  hero: {
    brand: "BabaCake",
    title: [[{ t: "فن الكيك" }], [{ t: "ثلاثي الأبعاد", accent: true }]],
    tagline: "إبداعات فريدة تُصنع بدقة.",
    location: "سلا · المغرب",
  },
  captions: {
    forme: [[{ t: "الفن يأخذ شكلاً" }]],
    idee: [[{ t: "من الفكرة" }], [{ t: "إلى الإبداع" }]],
    detail: [[{ t: "كل تفصيل" }], [{ t: "يصنع الفرق." }]],
    savoir: [[{ t: "اكتشفوا " }, { t: "مهارتنا", accent: true }]],
  },
  contact: {
    title: "لِنُبدع شيئًا مميزًا",
    body: ["لديك فكرة، مشروع، أو كعكة فريدة؟", "لنتحدث."],
    whatsapp: "واتساب",
    instagram: "إنستغرام",
    facebook: "فيسبوك",
    label: "تواصل معنا",
  },
  gallery: {
    title: "إبداعاتنا",
    subtitle: "كل كيكة تحكي قصة.",
    alts: {
      "download (9).jpg":
        "كيكة زفاف من أربع طبقات بدانتيل أبيض وسلسلة من زهور الأوركيد الذهبية",
      "download (4).jpg": "كيكة بتدرج أخضر مزينة بدببة باندا مشكّلة يدويًا",
      "Car Cake.jpg":
        "كيكة من ثلاث طبقات حلزونية تشكل حلبة سباق مع سيارات مصغرة",
      "download (7).jpg": "كيكة يونيكورن من طبقتين بعرف باستيل وسحابة مخصصة",
      "download (6).jpg":
        "كيكة يونيكورن من ثلاث طبقات بتدرجات باستيل وقرن ذهبي وورود كريمية",
      "Rechartcake.jpg": "كيكة من طبقتين على شكل جرو دلماسي",
      "download (8).jpg": "كيكة زفاف للعروسين بثنيات عاجية وبدلة سوداء",
      "download (3).jpg": "كيكة برسم كرتوني بالأبيض والوردي وحدود سوداء واضحة",
      "download (10).jpg": "كيكة زفاف من أربع طبقات بثنيات منحوتة وورود حمراء",
      "💚.jpg": "كيكة بسيطة بلون أخضر مريمي مع تقطير رسومي وعقدة مشكّلة",
      "download (11).jpg":
        "كيكة على شكل قلب للعروسين ببدلة سوداء وفستان من الورود العاجية",
      "download (12).jpg":
        "كيكة من طبقتين بتصميم سبايدرمان مع شبكة عنكبوت ومجسم مشكّل",
    },
  },
};
