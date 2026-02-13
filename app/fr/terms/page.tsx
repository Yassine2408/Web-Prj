import type { Metadata } from "next";
import { TermsPage } from "@/components/pages";

export const metadata: Metadata = {
  title: "Conditions",
  description: "Conditions d'utilisation et regles de collaboration.",
};

export default function Page() {
  return <TermsPage locale="fr" />;
}
