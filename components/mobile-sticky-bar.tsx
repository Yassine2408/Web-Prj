import Link from "next/link";
import { MessageCircle, Phone, FileText } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import type { Locale } from "@/lib/types";

export function MobileStickyBar({ locale }: { locale: Locale }) {
  const quoteHref = locale === "ar" ? "/ar/contact" : "/fr/contact";
  return (
    <div className="fixed inset-x-3 bottom-3 z-50 grid grid-cols-3 rounded-2xl border border-border bg-background/95 p-2 shadow-lg backdrop-blur md:hidden">
      <a className="flex flex-col items-center justify-center py-2 text-xs" href={`tel:${siteConfig.phone}`}>
        <Phone className="h-4 w-4" />
        {locale === "ar" ? "اتصال" : "Call"}
      </a>
      <a className="flex flex-col items-center justify-center py-2 text-xs" href={`https://wa.me/${siteConfig.whatsappNumber.replace(/\D/g, "")}`}>
        <MessageCircle className="h-4 w-4" />
        WhatsApp
      </a>
      <Link className="flex flex-col items-center justify-center py-2 text-xs" href={quoteHref}>
        <FileText className="h-4 w-4" />
        {locale === "ar" ? "عرض سعر" : "Quote"}
      </Link>
    </div>
  );
}
