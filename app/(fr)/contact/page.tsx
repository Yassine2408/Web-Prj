import type { Metadata } from "next";
import { ContactPage } from "@/components/pages";

export const metadata: Metadata = {
  title: "Contact",
  description: "Demandez un devis, envoyez un brief WhatsApp ou appelez-nous.",
};

export default function Page() {
  return <ContactPage locale="fr" />;
}
