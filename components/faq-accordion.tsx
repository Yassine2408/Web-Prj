import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FaqItem, Locale } from "@/lib/types";

export function FAQAccordion({ faqs, locale }: { faqs: FaqItem[]; locale: Locale }) {
  return (
    <Accordion type="single" collapsible className="w-full rounded-2xl border border-border/70 px-5">
      {faqs.map((item) => (
        <AccordionItem key={item.id} value={item.id}>
          <AccordionTrigger>{item.question[locale]}</AccordionTrigger>
          <AccordionContent>{item.answer[locale]}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
