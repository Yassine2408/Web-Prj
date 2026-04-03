import { Search, Pencil, Code, Rocket } from "lucide-react";
import type { Locale } from "@/lib/types";

const steps = {
  fr: [
    { icon: Search, title: "Audit & objectifs", desc: "Analyse de votre business et définition des KPIs" },
    { icon: Pencil, title: "Design & contenu", desc: "Wireframes, maquettes et copywriting orienté conversion" },
    { icon: Code, title: "Développement & SEO", desc: "Code propre, Core Web Vitals et optimisation locale" },
    { icon: Rocket, title: "Lancement & maintenance", desc: "Mise en ligne, formation et support continu" },
  ],
  ar: [
    { icon: Search, title: "تحليل الأهداف", desc: "تحليل نشاطك وتحديد مؤشرات الأداء" },
    { icon: Pencil, title: "تصميم ومحتوى", desc: "هيكلة وتصميم ونصوص موجهة للتحويل" },
    { icon: Code, title: "تطوير وSEO", desc: "كود نظيف وتحسين السرعة والظهور المحلي" },
    { icon: Rocket, title: "إطلاق وصيانة", desc: "النشر والتدريب والدعم المستمر" },
  ],
};

export function ProcessTimeline({ locale }: { locale: Locale }) {
  const data = steps[locale];

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-6 top-8 hidden h-[calc(100%-4rem)] w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent md:block" />
      
      <div className="grid gap-6 md:gap-8">
        {data.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div key={idx} className="relative flex items-start gap-4">
              {/* Icon circle */}
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-background">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              
              {/* Content */}
              <div className="flex-1 rounded-2xl border border-border/70 bg-card p-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-primary">0{idx + 1}</span>
                  <h3 className="font-semibold">{step.title}</h3>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{step.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
