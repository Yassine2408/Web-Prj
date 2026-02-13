import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import type { Locale } from "@/lib/types";

export function Footer({ locale }: { locale: Locale }) {
  const isAr = locale === "ar";
  return (
    <footer className="mt-16 border-t border-border/70 py-10">
      <div className="mx-auto grid w-full max-w-[1400px] gap-6 px-3 sm:px-5 md:grid-cols-3 lg:px-8">
        <div>
          <p className="font-semibold">{siteConfig.name}</p>
          <p className="mt-2 text-sm text-muted-foreground">
            {isAr
              ? "استوديو جديد أونلاين من القنيطرة. نبني مواقع سريعة وعملية للشركات المحلية."
              : "Nouveau studio en ligne base a Kenitra. Nous creons des sites rapides et utiles pour les business locaux."}
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            {isAr
              ? `واتساب/هاتف: ${siteConfig.phone} - انستغرام قريبًا`
              : `WhatsApp / Tel: ${siteConfig.phone} - Instagram bientot.`}
          </p>
        </div>
        <div className="text-sm">
          <p className="font-medium">{isAr ? "روابط" : "Liens"}</p>
          <div className="mt-2 flex flex-col gap-1 text-muted-foreground">
            <Link href={isAr ? "/ar/services" : "/fr/services"}>{isAr ? "الخدمات" : "Services"}</Link>
            <Link href={isAr ? "/ar/work" : "/fr/work"}>{isAr ? "الأعمال" : "Realisations"}</Link>
            <Link href={isAr ? "/ar/blog" : "/fr/blog"}>Blog</Link>
            <Link href={isAr ? "/ar/contact" : "/fr/contact"}>{isAr ? "اتصل" : "Contact"}</Link>
          </div>
        </div>
        <div className="text-sm">
          <p className="font-medium">{isAr ? "قانوني" : "Legal"}</p>
          <div className="mt-2 flex flex-col gap-1 text-muted-foreground">
            <Link href={isAr ? "/ar/privacy" : "/fr/privacy"}>{isAr ? "الخصوصية" : "Confidentialite"}</Link>
            <Link href={isAr ? "/ar/terms" : "/fr/terms"}>{isAr ? "الشروط" : "Conditions"}</Link>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            {isAr
              ? "نطاق .ma متاح عبر مسجلين معتمدين من ANRT."
              : "Le .ma est le ccTLD du Maroc et se reserve via registrars accredites ANRT."}
          </p>
        </div>
      </div>
    </footer>
  );
}
