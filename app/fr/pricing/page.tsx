import type { Metadata } from "next";
import { PricingPage } from "@/components/pages";

export const metadata: Metadata = {
  title: "Tarifs",
  description: "Packages Starter, Business et Pro/E-commerce avec prix indicatifs en MAD.",
};

export default function Page() {
  return <PricingPage locale="fr" />;
}
