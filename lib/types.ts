export type Locale = "fr" | "ar";

export type Service = {
  id: string;
  title: Record<Locale, string>;
  summary: Record<Locale, string>;
  deliverables: Record<Locale, string[]>;
  timeline: Record<Locale, string>;
  idealFor: Record<Locale, string>;
};

export type CaseStudy = {
  slug: string;
  title: Record<Locale, string>;
  clientType: Record<Locale, string>;
  city: string;
  problem: Record<Locale, string>;
  solution: Record<Locale, string>;
  tech: string[];
  results: Record<Locale, string[]>;
  gallery: string[];
};

export type Testimonial = {
  id: string;
  name: string;
  business: Record<Locale, string>;
  quote: Record<Locale, string>;
};

export type FaqItem = {
  id: string;
  question: Record<Locale, string>;
  answer: Record<Locale, string>;
};

export type BlogPost = {
  slug: string;
  title: Record<Locale, string>;
  excerpt: Record<Locale, string>;
  content: Record<Locale, string>;
  date: string;
  category: Record<Locale, string>;
};
