import { Clock3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Locale, Service } from "@/lib/types";

export function ServiceCard({ service, locale }: { service: Service; locale: Locale }) {
  return (
    <Card className="h-full rounded-2xl">
      <CardHeader>
        <CardTitle>{service.title[locale]}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">{service.summary[locale]}</p>
        <ul className="space-y-1 text-sm">
          {service.deliverables[locale].slice(0, 3).map((item) => (
            <li key={item}>- {item}</li>
          ))}
        </ul>
        <p className="flex items-center text-xs text-muted-foreground">
          <Clock3 className="mr-2 h-3.5 w-3.5" />
          {service.timeline[locale]}
        </p>
      </CardContent>
    </Card>
  );
}
