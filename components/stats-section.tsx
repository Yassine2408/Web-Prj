import { TrendingUp, Users, Zap, Star } from "lucide-react";
import type { Locale } from "@/lib/types";

const stats = {
  fr: [
    { icon: Users, value: "Studio 2026", label: "Nouveau studio digital" },
    { icon: Star, value: "3 projets", label: "Projets pilotes internes" },
    { icon: Zap, value: "100% en ligne", label: "Sans bureau physique pour l'instant" },
    { icon: TrendingUp, value: "Kénitra d'abord", label: "Focus local puis Maroc entier" },
  ],
  ar: [
    { icon: Users, value: "استوديو 2026", label: "استوديو جديد" },
    { icon: Star, value: "3 مشاريع", label: "مشاريع تجريبية داخلية" },
    { icon: Zap, value: "100% أونلاين", label: "بدون مكتب حاليًا" },
    { icon: TrendingUp, value: "تركيز القنيطرة", label: "ثم العمل مع كل المغرب" },
  ],
};

export function StatsSection({ locale }: { locale: Locale }) {
  const data = stats[locale];
  
  return (
    <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {data.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div key={idx} className="flex flex-col items-center rounded-2xl border border-border/70 bg-card p-6 text-center">
            <Icon className="h-8 w-8 text-primary" />
            <p className="mt-3 text-3xl font-bold">{stat.value}</p>
            <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
          </div>
        );
      })}
    </section>
  );
}
