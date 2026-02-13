import { Locale } from "@/lib/types";

export const siteConfig = {
  name: "Atlas Web Studio",
  description:
    "Studio web en ligne base a Kenitra (Maroc): sites rapides, SEO local et conversion WhatsApp.",
  domain: "atlaswebstudio.ma",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "212653205141",
  phone: process.env.NEXT_PUBLIC_PHONE_NUMBER || "+212653205141",
  email: process.env.CONTACT_EMAIL_TO || "hello@atlaswebstudio.ma",
  city: "Kenitra",
  address: "Studio en ligne - Kenitra, Maroc",
  mapEmbedUrl:
    "https://www.google.com/maps?q=Kenitra&output=embed",
};

export const navLinks = (locale: Locale) => [
  { href: locale === "ar" ? "/ar/services" : "/services", label: locale === "ar" ? "الخدمات" : "Services" },
  { href: locale === "ar" ? "/ar/pricing" : "/pricing", label: locale === "ar" ? "الأسعار" : "Tarifs" },
  { href: locale === "ar" ? "/ar/work" : "/work", label: locale === "ar" ? "الأعمال" : "Réalisations" },
  { href: locale === "ar" ? "/ar/blog" : "/blog", label: locale === "ar" ? "المدونة" : "Blog" },
  { href: locale === "ar" ? "/ar/about" : "/about", label: locale === "ar" ? "من نحن" : "À propos" },
  { href: locale === "ar" ? "/ar/contact" : "/contact", label: locale === "ar" ? "اتصل بنا" : "Contact" },
];

export function localePath(locale: Locale, path: string) {
  if (locale === "ar") {
    return path === "/" ? "/ar" : `/ar${path}`;
  }
  return path;
}

export function toWhatsAppLink(message: string) {
  const number = siteConfig.whatsappNumber.replace(/\D/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
