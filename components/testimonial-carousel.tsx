"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Locale, Testimonial } from "@/lib/types";

export function TestimonialCarousel({
  items,
  locale,
}: {
  items: Testimonial[];
  locale: Locale;
}) {
  const [index, setIndex] = useState(0);
  const item = items[index];

  return (
    <div className="space-y-4">
      <Card className="rounded-2xl">
        <CardContent className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <p className="text-lg">&ldquo;{item.quote[locale]}&rdquo;</p>
              <div className="mt-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.business[locale]}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={() => setIndex((index - 1 + items.length) % items.length)}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" onClick={() => setIndex((index + 1) % items.length)}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
