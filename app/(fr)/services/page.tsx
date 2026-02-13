import type { Metadata } from "next";
import { ServicesPage } from "@/components/pages";

export const metadata: Metadata = {
  title: "Services",
  description: "Creation de site, SEO local, catalogue WhatsApp, e-commerce et maintenance.",
};

export default async function Page() {
  return <ServicesPage locale="fr" />;
}
