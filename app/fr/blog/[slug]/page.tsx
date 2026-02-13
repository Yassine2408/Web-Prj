import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { AllSlugs, BlogDetailPage } from "@/components/pages";

export async function generateStaticParams() {
  const slugs = await AllSlugs();
  return slugs.blog.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Article: ${slug}`,
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await BlogDetailPage({ locale: "fr", slug });
  if (!page) notFound();
  return page;
}
