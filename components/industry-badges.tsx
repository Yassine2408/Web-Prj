import { Pill, Stethoscope, ShoppingBag, UtensilsCrossed, Scissors } from "lucide-react";

const industries = [
  { icon: Pill, label: "Parapharmacie", color: "text-blue-600 dark:text-blue-400" },
  { icon: Stethoscope, label: "Clinic", color: "text-green-600 dark:text-green-400" },
  { icon: ShoppingBag, label: "Shop", color: "text-purple-600 dark:text-purple-400" },
  { icon: UtensilsCrossed, label: "Restaurant", color: "text-orange-600 dark:text-orange-400" },
  { icon: Scissors, label: "Salon", color: "text-pink-600 dark:text-pink-400" },
];

export function IndustryBadges() {
  return (
    <div className="flex flex-wrap gap-3">
      {industries.map((industry) => {
        const Icon = industry.icon;
        return (
          <div
            key={industry.label}
            className="flex items-center gap-2 rounded-full border border-border/70 bg-card px-4 py-2 text-sm font-medium shadow-sm"
          >
            <Icon className={`h-4 w-4 ${industry.color}`} />
            <span>{industry.label}</span>
          </div>
        );
      })}
    </div>
  );
}
