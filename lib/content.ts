import { cache } from "react";
import { createClient } from "@sanity/client";
import { groq } from "next-sanity";
import type { BlogPost, CaseStudy, FaqItem, Service, Testimonial } from "@/lib/types";

const fallbackServices: Service[] = [
  {
    id: "business-website",
    title: { fr: "Site vitrine rapide + SEO", ar: "موقع أعمال سريع مع SEO" },
    summary: {
      fr: "Site clair, rapide et prêt à convertir vos visiteurs locaux.",
      ar: "موقع واضح وسريع يساعدك على تحويل الزوار المحليين إلى عملاء.",
    },
    deliverables: {
      fr: ["Design premium", "Pages services", "Optimisation Core Web Vitals", "SEO local de base"],
      ar: ["تصميم احترافي", "صفحات الخدمات", "تحسين السرعة", "تهيئة SEO محلي"],
    },
    timeline: { fr: "2 à 4 semaines", ar: "من أسبوعين إلى 4 أسابيع" },
    idealFor: {
      fr: "Cabinets, cliniques, salons, restaurants, commerces.",
      ar: "للعيادات والصالونات والمطاعم والمتاجر.",
    },
  },
  {
    id: "local-seo",
    title: { fr: "SEO local + Google Business Profile", ar: "SEO محلي + ملف Google Business" },
    summary: {
      fr: "Soyez visible sur Google Maps à Casablanca, Rabat, Kénitra et au-delà.",
      ar: "الظهور في Google Maps في الدار البيضاء والرباط والقنيطرة وغيرها.",
    },
    deliverables: {
      fr: ["Audit local", "Optimisation fiche GBP", "Citations locales", "Collecte d'avis"],
      ar: ["تدقيق محلي", "تحسين الملف التجاري", "إدراجات محلية", "خطة تقييمات العملاء"],
    },
    timeline: { fr: "3 à 6 semaines", ar: "من 3 إلى 6 أسابيع" },
    idealFor: {
      fr: "Tout business local dépendant de la proximité.",
      ar: "لكل نشاط محلي يعتمد على العملاء القريبين.",
    },
  },
  {
    id: "catalog-whatsapp",
    title: { fr: "Catalogue + commande WhatsApp", ar: "كتالوج + الطلب عبر واتساب" },
    summary: {
      fr: "Présentez vos produits et convertissez en conversation immédiate.",
      ar: "اعرض منتجاتك وحول الطلب مباشرة إلى محادثة واتساب.",
    },
    deliverables: {
      fr: ["Catégories produits", "CTA WhatsApp produit", "Templates message", "Tracking événements"],
      ar: ["تصنيفات المنتجات", "زر واتساب لكل منتج", "قوالب رسائل", "تتبع الأحداث"],
    },
    timeline: { fr: "2 à 3 semaines", ar: "من أسبوعين إلى 3 أسابيع" },
    idealFor: {
      fr: "Parapharmacies, boutiques locales, revendeurs.",
      ar: "للبارافارماسي والمتاجر المحلية.",
    },
  },
  {
    id: "ecommerce",
    title: { fr: "E-commerce complet", ar: "متجر إلكتروني كامل" },
    summary: {
      fr: "Boutique prête à vendre avec CMI/NAPS/Payzone, COD et WhatsApp.",
      ar: "متجر جاهز للبيع مع CMI وNAPS وPayzone والدفع عند الاستلام وواتساب.",
    },
    deliverables: {
      fr: ["Checkout optimisé", "Paiement marocain", "Règles livraison", "Emails transactionnels"],
      ar: ["صفحة دفع محسنة", "ربط الدفع المغربي", "قواعد الشحن", "رسائل المعاملات"],
    },
    timeline: { fr: "4 à 8 semaines", ar: "من 4 إلى 8 أسابيع" },
    idealFor: {
      fr: "Commerçants avec catalogue et logistique active.",
      ar: "للمتاجر التي تملك كتالوجًا وشحنًا فعّالًا.",
    },
  },
  {
    id: "booking",
    title: { fr: "Réservations et rendez-vous", ar: "الحجوزات والمواعيد" },
    summary: {
      fr: "Système simple pour réduire les appels et no-shows.",
      ar: "نظام بسيط لتقليل الاتصالات وتفادي غياب العملاء.",
    },
    deliverables: {
      fr: ["Calendrier", "Confirmation WhatsApp", "Rappels", "Formulaire qualification"],
      ar: ["تقويم", "تأكيد عبر واتساب", "تذكير تلقائي", "نموذج بيانات العميل"],
    },
    timeline: { fr: "2 à 4 semaines", ar: "من أسبوعين إلى 4 أسابيع" },
    idealFor: { fr: "Cliniques, dentistes, salons.", ar: "للعيادات وأطباء الأسنان والصالونات." },
  },
  {
    id: "maintenance",
    title: { fr: "Maintenance & sécurité", ar: "الصيانة والأمان" },
    summary: {
      fr: "Mises à jour, sauvegardes, monitoring et support continu.",
      ar: "تحديثات ونسخ احتياطي ومراقبة ودعم مستمر.",
    },
    deliverables: {
      fr: ["Patch sécurité", "Backups", "Monitoring uptime", "Améliorations mensuelles"],
      ar: ["تحديثات أمان", "نسخ احتياطية", "مراقبة التوفر", "تحسينات شهرية"],
    },
    timeline: { fr: "Plan mensuel", ar: "خطة شهرية" },
    idealFor: { fr: "Entreprises qui veulent la tranquillité.", ar: "للشركات التي تريد راحة البال." },
  },
];

const fallbackCaseStudies: CaseStudy[] = [
  {
    slug: "parapharmacie-casablanca",
    title: { fr: "Projet pilote Parapharmacie", ar: "مشروع تجريبي بارافارماسي" },
    clientType: { fr: "Simulation parapharmacie", ar: "محاكاة بارافارماسي" },
    city: "Casablanca",
    problem: {
      fr: "Scenario test: un commerce dépend des passages en boutique avec peu de visibilité locale.",
      ar: "سيناريو اختباري: نشاط يعتمد على الزوار المباشرين مع ظهور محلي ضعيف.",
    },
    solution: {
      fr: "Prototype catalogue par catégories, bouton WhatsApp par produit et fiches promos.",
      ar: "نموذج كتالوج حسب الفئات مع زر واتساب لكل منتج وصفحات عروض.",
    },
    tech: ["Next.js", "Sanity", "Cloudflare", "WhatsApp CTA"],
    results: {
      fr: ["Prototype fonctionnel livre", "Parcours commande WhatsApp valide", "Performance cible < 1.5s"],
      ar: ["نموذج عملي جاهز", "مسار طلب واتساب ناجح", "سرعة مستهدفة أقل من 1.5 ثانية"],
    },
    gallery: ["/images/placeholder-1.svg", "/images/placeholder-2.svg"],
  },
  {
    slug: "clinic-rabat",
    title: { fr: "Projet pilote Clinique", ar: "مشروع تجريبي عيادة" },
    clientType: { fr: "Simulation clinique", ar: "محاكاة عيادة" },
    city: "Rabat",
    problem: {
      fr: "Scenario test: prise de rendez-vous manuelle et faible presence locale.",
      ar: "سيناريو اختباري: حجز يدوي وحضور محلي ضعيف.",
    },
    solution: {
      fr: "Prototype avec module rendez-vous, pages services et structure SEO locale.",
      ar: "نموذج مع نظام مواعيد وصفحات خدمات وهيكلة SEO محلي.",
    },
    tech: ["Next.js", "Form Actions", "Schema SEO"],
    results: {
      fr: ["Tunnel rendez-vous valide", "Structure GBP prete", "UX mobile testee"],
      ar: ["مسار المواعيد جاهز", "بنية GBP جاهزة", "تجربة الهاتف تم اختبارها"],
    },
    gallery: ["/images/placeholder-3.svg", "/images/placeholder-4.svg"],
  },
  {
    slug: "local-shop-kenitra",
    title: { fr: "Projet pilote Boutique Kénitra", ar: "مشروع تجريبي متجر القنيطرة" },
    clientType: { fr: "Simulation boutique locale", ar: "محاكاة متجر محلي" },
    city: "Kénitra",
    problem: {
      fr: "Scenario test: pas de catalogue en ligne et commandes uniquement en DM.",
      ar: "سيناريو اختباري: لا يوجد كتالوج رقمي والطلبات فقط عبر الرسائل.",
    },
    solution: {
      fr: "Mini catalogue e-commerce avec COD, pre-integration paiement marocain et pages promos.",
      ar: "كتالوج-متجر مصغر مع الدفع عند الاستلام وتجهيز ربط الدفع المحلي وصفحات عروض.",
    },
    tech: ["Next.js", "CMI-ready checkout", "Cloudflare Pages"],
    results: {
      fr: ["Stack e-commerce de base prete", "Parcours commande simplifie", "Base de lancement pour vrai projet"],
      ar: ["بنية متجر أساسية جاهزة", "مسار طلب مبسط", "قاعدة جاهزة لمشروع حقيقي"],
    },
    gallery: ["/images/placeholder-5.svg", "/images/placeholder-6.svg"],
  },
];

const fallbackTestimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Retour test #1",
    business: { fr: "Projet pilote Parapharmacie", ar: "مشروع تجريبي بارافارماسي" },
    quote: {
      fr: "Prototype propre et clair. Le parcours WhatsApp est simple pour l'utilisateur final.",
      ar: "النموذج واضح وسهل. مسار الطلب عبر واتساب بسيط للمستخدم.",
    },
  },
  {
    id: "t2",
    name: "Retour test #2",
    business: { fr: "Projet pilote Clinique", ar: "مشروع تجريبي عيادة" },
    quote: {
      fr: "La structure SEO locale et la prise de rendez-vous sont prêtes pour un vrai lancement client.",
      ar: "هيكلة SEO المحلية ونظام المواعيد جاهزان لإطلاق فعلي مع عميل.",
    },
  },
  {
    id: "t3",
    name: "Retour test #3",
    business: { fr: "Projet pilote Boutique", ar: "مشروع تجريبي متجر" },
    quote: {
      fr: "Le workflow catalogue + WhatsApp est pratique et facile a maintenir.",
      ar: "مسار الكتالوج + واتساب عملي وسهل الصيانة.",
    },
  },
];

const fallbackFaq: FaqItem[] = [
  {
    id: "f1",
    question: {
      fr: "Est-ce que vous gérez les domaines .ma ?",
      ar: "هل توفرون المساعدة في شراء نطاق .ma؟",
    },
    answer: {
      fr: "Oui. Nous vous accompagnons pour l'achat du .ma via des registrars accrédités ANRT et la configuration DNS.",
      ar: "نعم، نساعدك في شراء نطاق .ma عبر مسجلين معتمدين من ANRT وضبط DNS.",
    },
  },
  {
    id: "f2",
    question: {
      fr: "Quels moyens de paiement pouvez-vous intégrer ?",
      ar: "ما وسائل الدفع التي يمكن دمجها؟",
    },
    answer: {
      fr: "CMI (Maroc Telecommerce), NAPS, Payzone, paiement à la livraison (COD), et commande WhatsApp.",
      ar: "CMI وNAPS وPayzone مع الدفع عند الاستلام والطلب عبر واتساب.",
    },
  },
  {
    id: "f3",
    question: {
      fr: "Comment se passent les paiements du projet ?",
      ar: "كيف يتم أداء تكلفة المشروع؟",
    },
    answer: {
      fr: "En général: 50% à l'avance, 30% sur preview, 20% à la mise en ligne.",
      ar: "عادة: 50% مقدمًا، 30% عند المعاينة، 20% عند الإطلاق.",
    },
  },
];

const fallbackBlogPosts: BlogPost[] = [
  {
    slug: "seo-local-maroc",
    title: { fr: "SEO local au Maroc: guide pratique 2026", ar: "دليل SEO المحلي في المغرب 2026" },
    excerpt: {
      fr: "Comment apparaître sur Google Maps à Casablanca, Rabat et Kénitra.",
      ar: "كيف تظهر في خرائط Google في الدار البيضاء والرباط والقنيطرة.",
    },
    content: {
      fr: "Le SEO local commence par une fiche Google Business Profile complète, des avis réguliers, des citations cohérentes, et un site rapide orienté mobile.",
      ar: "SEO المحلي يبدأ بملف Google Business مكتمل وتقييمات مستمرة وإدراجات متناسقة وموقع سريع موجه للهاتف.",
    },
    date: "2026-01-20",
    category: { fr: "SEO local", ar: "SEO محلي" },
  },
  {
    slug: "commande-whatsapp-maroc",
    title: { fr: "Pourquoi WhatsApp convertit mieux pour les commerces locaux", ar: "لماذا واتساب يحقق تحويلًا أفضل للتجار المحليين" },
    excerpt: {
      fr: "Réduire la friction entre découverte produit et commande.",
      ar: "تقليل الاحتكاك بين اكتشاف المنتج وإتمام الطلب.",
    },
    content: {
      fr: "Les clients marocains préfèrent souvent WhatsApp pour poser une question avant achat. Un bouton par produit améliore la conversion.",
      ar: "العملاء في المغرب يفضلون واتساب لطرح الأسئلة قبل الشراء، وزر واتساب لكل منتج يرفع التحويل.",
    },
    date: "2026-01-14",
    category: { fr: "Conversion", ar: "التحويل" },
  },
  {
    slug: "choisir-domaine-ma",
    title: { fr: "Comment choisir un nom de domaine .ma pour son business", ar: "كيف تختار نطاق .ma لنشاطك" },
    excerpt: {
      fr: "Règles de base et conseils branding local.",
      ar: "قواعد أساسية ونصائح للهوية المحلية.",
    },
    content: {
      fr: "Le .ma renforce la confiance locale. Choisissez un nom court, lisible, et proche de votre marque ou activité principale.",
      ar: "نطاق .ma يعزز الثقة محليًا، اختر اسمًا قصيرًا وواضحًا وقريبًا من علامتك.",
    },
    date: "2026-01-07",
    category: { fr: "Domaines", ar: "النطاقات" },
  },
];

const hasSanityConfig = Boolean(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
    process.env.NEXT_PUBLIC_SANITY_DATASET
);

const sanityClient = hasSanityConfig
  ? createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
      apiVersion: "2025-01-01",
      useCdn: true,
    })
  : null;

const serviceQuery = groq`*[_type == "service"] | order(order asc){
  "id": _id,
  title,
  summary,
  deliverables,
  timeline,
  idealFor
}`;

const caseStudyQuery = groq`*[_type == "caseStudy"] | order(_createdAt desc){
  slug,
  title,
  clientType,
  city,
  problem,
  solution,
  tech,
  results,
  "gallery": gallery[].asset->url
}`;

const testimonialQuery = groq`*[_type == "testimonial"]{
  "id": _id,
  name,
  business,
  quote
}`;

const faqQuery = groq`*[_type == "faq"]{
  "id": _id,
  question,
  answer
}`;

const blogQuery = groq`*[_type == "blogPost"] | order(publishedAt desc){
  slug,
  title,
  excerpt,
  content,
  "date": publishedAt,
  category
}`;

async function safeFetch<T>(query: string, fallback: T): Promise<T> {
  if (!sanityClient) return fallback;
  try {
    const data = await sanityClient.fetch<T>(query);
    return data ?? fallback;
  } catch {
    return fallback;
  }
}

export const getServices = cache(() => safeFetch(serviceQuery, fallbackServices));
export const getCaseStudies = cache(() => safeFetch(caseStudyQuery, fallbackCaseStudies));
export const getTestimonials = cache(() => safeFetch(testimonialQuery, fallbackTestimonials));
export const getFaq = cache(() => safeFetch(faqQuery, fallbackFaq));
export const getBlogPosts = cache(() => safeFetch(blogQuery, fallbackBlogPosts));
