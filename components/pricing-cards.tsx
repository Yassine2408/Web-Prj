import Link from "next/link";
import { Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/lib/types";

const plans = {
  fr: [
    {
      name: "Starter",
      price: "A partir de 3 500 MAD",
      points: ["Site vitrine 1-5 pages", "SEO de base", "CTA WhatsApp + appel", "Delai rapide"],
    },
    {
      name: "Business",
      price: "A partir de 7 900 MAD",
      points: ["Site 6-12 pages", "SEO local + GBP", "Tracking conversion", "Copywriting de base"],
    },
    {
      name: "Pro / E-commerce",
      price: "A partir de 12 900 MAD",
      points: ["Catalogue ou boutique", "CMI/NAPS/Payzone ou COD", "Parcours commande optimise", "Support prioritaire"],
    },
  ],
  ar: [
    {
      name: "Starter",
      price: "ابتداء من 3,500 درهم",
      points: ["موقع 1 إلى 5 صفحات", "SEO أساسي", "واتساب + اتصال", "تسليم سريع"],
    },
    {
      name: "Business",
      price: "ابتداء من 7,900 درهم",
      points: ["موقع 6 إلى 12 صفحة", "SEO محلي + GBP", "تتبع التحويل", "كتابة أساسية"],
    },
    {
      name: "Pro / E-commerce",
      price: "ابتداء من 12,900 درهم",
      points: ["كتالوج أو متجر", "CMI/NAPS/Payzone أو COD", "تحسين مسار الطلب", "دعم أولوية"],
    },
  ],
};

export function PricingCards({ locale }: { locale: Locale }) {
  const data = plans[locale];
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {data.map((plan) => (
        <Card key={plan.name} className="rounded-2xl">
          <CardHeader>
            <CardTitle>{plan.name}</CardTitle>
            <p className="text-2xl font-semibold">{plan.price}</p>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {plan.points.map((point) => (
                <li key={point} className="flex items-start">
                  <Check className="mr-2 mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {point}
                </li>
              ))}
            </ul>
            <Button asChild className="mt-5 w-full">
              <Link href={locale === "ar" ? "/ar/contact" : "/fr/contact"}>
                {locale === "ar" ? "اطلب عرض سعر" : "Demander un devis"}
              </Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
