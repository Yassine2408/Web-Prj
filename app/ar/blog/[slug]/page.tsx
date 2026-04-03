import { notFound } from "next/navigation";
import { AllSlugs, BlogDetailPage } from "@/components/pages";

export async function generateStaticParams() {
  const slugs = await AllSlugs();
  return slugs.blog.map((slug) => ({ slug }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await BlogDetailPage({ locale: "ar", slug });
  if (!page) notFound();
  return page;
}
