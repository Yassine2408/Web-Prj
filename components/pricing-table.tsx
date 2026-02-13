import Link from "next/link";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/lib/types";

const features = {
  fr: [
    { name: "Pages incluses", starter: "5 pages", business: "10 pages", pro: "Illimité" },
    { name: "SEO de base", starter: true, business: true, pro: true },
    { name: "WhatsApp CTA", starter: true, business: true, pro: true },
    { name: "SEO local + GBP", starter: false, business: true, pro: true },
    { name: "Tracking conversion", starter: false, business: true, pro: true },
    { name: "E-commerce / Paiements", starter: false, business: false, pro: true },
    { name: "Multilingue FR/AR", starter: false, business: "Add-on", pro: true },
    { name: "Support prioritaire", starter: false, business: false, pro: true },
  ],
  ar: [
    { name: "الصفحات", starter: "5 صفحات", business: "10 صفحات", pro: "غير محدود" },
    { name: "SEO أساسي", starter: true, business: true, pro: true },
    { name: "زر واتساب", starter: true, business: true, pro: true },
    { name: "SEO محلي + GBP", starter: false, business: true, pro: true },
    { name: "تتبع التحويل", starter: false, business: true, pro: true },
    { name: "متجر إلكتروني", starter: false, business: false, pro: true },
    { name: "FR/AR", starter: false, business: "إضافة", pro: true },
    { name: "دعم أولوية", starter: false, business: false, pro: true },
  ],
};

function Cell({ value }: { value: string | boolean }) {
  if (typeof value === "boolean") {
    return value ? (
      <Check className="mx-auto h-5 w-5 text-green-600" />
    ) : (
      <X className="mx-auto h-5 w-5 text-muted-foreground/40" />
    );
  }
  return <span className="text-sm">{value}</span>;
}

export function PricingTable({ locale }: { locale: Locale }) {
  const data = features[locale];
  const isAr = locale === "ar";

  return (
    <div className="overflow-x-auto rounded-2xl border border-border/70">
      <table className="w-full">
        <thead className="border-b border-border/70 bg-muted/50">
          <tr>
            <th className="p-4 text-left text-sm font-semibold">{isAr ? "الميزة" : "Fonctionnalité"}</th>
            <th className="p-4 text-center text-sm font-semibold">Starter</th>
            <th className="p-4 text-center text-sm font-semibold">Business</th>
            <th className="p-4 text-center text-sm font-semibold">Pro</th>
          </tr>
        </thead>
        <tbody>
          {data.map((feature, idx) => (
            <tr key={idx} className="border-b border-border/50 last:border-0">
              <td className="p-4 text-sm font-medium">{feature.name}</td>
              <td className="p-4 text-center">
                <Cell value={feature.starter} />
              </td>
              <td className="p-4 text-center">
                <Cell value={feature.business} />
              </td>
              <td className="p-4 text-center">
                <Cell value={feature.pro} />
              </td>
            </tr>
          ))}
          <tr>
            <td className="p-4 text-sm font-semibold">{isAr ? "السعر" : "Prix"}</td>
            <td className="p-4 text-center text-sm font-bold">3,500+ MAD</td>
            <td className="p-4 text-center text-sm font-bold">7,900+ MAD</td>
            <td className="p-4 text-center text-sm font-bold">12,900+ MAD</td>
          </tr>
          <tr>
            <td className="p-4" />
            <td className="p-4">
              <Button asChild size="sm" variant="outline" className="w-full">
                <Link href={isAr ? "/ar/contact" : "/fr/contact"}>{isAr ? "اتصل" : "Devis"}</Link>
              </Button>
            </td>
            <td className="p-4">
              <Button asChild size="sm" className="w-full">
                <Link href={isAr ? "/ar/contact" : "/fr/contact"}>{isAr ? "اتصل" : "Devis"}</Link>
              </Button>
            </td>
            <td className="p-4">
              <Button asChild size="sm" variant="outline" className="w-full">
                <Link href={isAr ? "/ar/contact" : "/fr/contact"}>{isAr ? "اتصل" : "Devis"}</Link>
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
