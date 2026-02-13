import type { Metadata } from "next";
import { HomePage } from "@/components/pages";

export const metadata: Metadata = {
  title: "Studio web au Maroc",
  description: "Sites web rapides, SEO local et conversion WhatsApp pour entreprises marocaines.",
};

export default async function Page() {
  return <HomePage locale="fr" />;
}
