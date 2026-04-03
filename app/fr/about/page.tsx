import type { Metadata } from "next";
import { AboutPage } from "@/components/pages";

export const metadata: Metadata = {
  title: "A propos",
  description: "Histoire du studio, valeurs, process et approche WhatsApp-first au Maroc.",
};

export default function Page() {
  return <AboutPage locale="fr" />;
}
