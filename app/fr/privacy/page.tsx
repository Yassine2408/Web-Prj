import type { Metadata } from "next";
import { PrivacyPage } from "@/components/pages";

export const metadata: Metadata = {
  title: "Confidentialite",
  description: "Politique de confidentialite, cookies et analytics.",
};

export default function Page() {
  return <PrivacyPage locale="fr" />;
}
