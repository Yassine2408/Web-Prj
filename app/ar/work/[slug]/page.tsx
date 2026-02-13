import { notFound } from "next/navigation";
import { AllSlugs, WorkDetailPage } from "@/components/pages";

export async function generateStaticParams() {
  const slugs = await AllSlugs();
  return slugs.work.map((slug) => ({ slug }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await WorkDetailPage({ locale: "ar", slug });
  if (!page) notFound();
  return page;
}
