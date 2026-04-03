import type { Metadata } from "next";
import { HomePage } from "@/components/pages";

export const metadata: Metadata = {
  title: "استوديو ويب في المغرب",
  description: "مواقع سريعة وSEO محلي وتحويل عبر واتساب للشركات المغربية.",
};

export default async function Page() {
  return <HomePage locale="ar" />;
}
