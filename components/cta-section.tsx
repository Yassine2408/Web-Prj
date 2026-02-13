import Link from "next/link";
import { MessageCircle, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
import type { Locale } from "@/lib/types";

export function CTASection({ locale }: { locale: Locale }) {
  const isAr = locale === "ar";
  return (
    <section className="rounded-3xl border border-border/80 bg-gradient-to-br from-primary/15 via-background to-secondary/20 p-8 shadow-sm">
      <h3 className="text-2xl font-semibold">
        {isAr ? "جاهز لزيادة الطلبات المحلية؟" : "Pret a generer plus de demandes locales ?"}
      </h3>
      <p className="mt-2 text-sm text-muted-foreground">
        {isAr
          ? "نطلق موقعك بسرعة ونربطه بواتساب وGoogle Maps."
          : "On lance votre site rapidement et on le connecte a WhatsApp et Google Maps."}
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        <Button asChild>
          <Link href={isAr ? "/ar/contact" : "/fr/contact"}>
            {isAr ? "اطلب عرض سعر" : "Demander un devis"}
          </Link>
        </Button>
        <Button asChild variant="outline">
          <a href={`https://wa.me/${siteConfig.whatsappNumber.replace(/\D/g, "")}`}>
            <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp
          </a>
        </Button>
        <Button asChild variant="outline">
          <a href={`tel:${siteConfig.phone}`}>
            <PhoneCall className="mr-2 h-4 w-4" /> {isAr ? "اتصال" : "Appeler"}
          </a>
        </Button>
      </div>
    </section>
  );
}
