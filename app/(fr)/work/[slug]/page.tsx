import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { AllSlugs, WorkDetailPage } from "@/components/pages";

export async function generateStaticParams() {
  const slugs = await AllSlugs();
  return slugs.work.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Etude de cas: ${slug}`,
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await WorkDetailPage({ locale: "fr", slug });
  if (!page) notFound();
  return page;
}
