import type { Metadata } from "next";
import { WorkPage } from "@/components/pages";

export const metadata: Metadata = {
  title: "Realisations",
  description: "Etudes de cas: parapharmacie, clinique et commerce local au Maroc.",
};

export default async function Page() {
  return <WorkPage locale="fr" />;
}
