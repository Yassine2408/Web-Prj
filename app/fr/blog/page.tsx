import type { Metadata } from "next";
import { BlogPage } from "@/components/pages";

export const metadata: Metadata = {
  title: "Blog",
  description: "Conseils SEO local, WhatsApp ordering, domaines .ma, vitesse et securite.",
};

export default async function Page() {
  return <BlogPage locale="fr" />;
}
