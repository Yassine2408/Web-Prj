import { cache } from "react";
import { createClient } from "@sanity/client";
import { groq } from "next-sanity";
import type { BlogPost, CaseStudy, FaqItem, Service, Testimonial } from "@/lib/types";

const fallbackServices: Service[] = [
  {
    id: "business-website",
    title: { fr: "Site vitrine rapide + SEO", ar: "Ù…ÙˆÙ‚Ø¹ Ø£Ø¹Ù…Ø§Ù„ Ø³Ø±ÙŠØ¹ Ù…Ø¹ SEO" },
    summary: {
      fr: "Site clair, rapide et prÃªt Ã  convertir vos visiteurs locaux.",
      ar: "Ù…ÙˆÙ‚Ø¹ ÙˆØ§Ø¶Ø­ ÙˆØ³Ø±ÙŠØ¹ ÙŠØ³Ø§Ø¹Ø¯Ùƒ Ø¹Ù„Ù‰ ØªØ­ÙˆÙŠÙ„ Ø§Ù„Ø²ÙˆØ§Ø± Ø§Ù„Ù…Ø­Ù„ÙŠÙŠÙ† Ø¥Ù„Ù‰ Ø¹Ù…Ù„Ø§Ø¡.",
    },
    deliverables: {
      fr: ["Design premium", "Pages services", "Optimisation Core Web Vitals", "SEO local de base"],
      ar: ["ØªØµÙ…ÙŠÙ… Ø§Ø­ØªØ±Ø§ÙÙŠ", "ØµÙØ­Ø§Øª Ø§Ù„Ø®Ø¯Ù…Ø§Øª", "ØªØ­Ø³ÙŠÙ† Ø§Ù„Ø³Ø±Ø¹Ø©", "ØªÙ‡ÙŠØ¦Ø© SEO Ù…Ø­Ù„ÙŠ"],
    },
    timeline: { fr: "2 Ã  4 semaines", ar: "Ù…Ù† Ø£Ø³Ø¨ÙˆØ¹ÙŠÙ† Ø¥Ù„Ù‰ 4 Ø£Ø³Ø§Ø¨ÙŠØ¹" },
    idealFor: {
      fr: "Cabinets, cliniques, salons, restaurants, commerces.",
      ar: "Ù„Ù„Ø¹ÙŠØ§Ø¯Ø§Øª ÙˆØ§Ù„ØµØ§Ù„ÙˆÙ†Ø§Øª ÙˆØ§Ù„Ù…Ø·Ø§Ø¹Ù… ÙˆØ§Ù„Ù…ØªØ§Ø¬Ø±.",
    },
  },
  {
    id: "local-seo",
    title: { fr: "SEO local + Google Business Profile", ar: "SEO Ù…Ø­Ù„ÙŠ + Ù…Ù„Ù Google Business" },
    summary: {
      fr: "Soyez visible sur Google Maps Ã  Casablanca, Rabat, KÃ©nitra et au-delÃ .",
      ar: "Ø§Ù„Ø¸Ù‡ÙˆØ± ÙÙŠ Google Maps ÙÙŠ Ø§Ù„Ø¯Ø§Ø± Ø§Ù„Ø¨ÙŠØ¶Ø§Ø¡ ÙˆØ§Ù„Ø±Ø¨Ø§Ø· ÙˆØ§Ù„Ù‚Ù†ÙŠØ·Ø±Ø© ÙˆØºÙŠØ±Ù‡Ø§.",
    },
    deliverables: {
      fr: ["Audit local", "Optimisation fiche GBP", "Citations locales", "Collecte d'avis"],
      ar: ["ØªØ¯Ù‚ÙŠÙ‚ Ù…Ø­Ù„ÙŠ", "ØªØ­Ø³ÙŠÙ† Ø§Ù„Ù…Ù„Ù Ø§Ù„ØªØ¬Ø§Ø±ÙŠ", "Ø¥Ø¯Ø±Ø§Ø¬Ø§Øª Ù…Ø­Ù„ÙŠØ©", "Ø®Ø·Ø© ØªÙ‚ÙŠÙŠÙ…Ø§Øª Ø§Ù„Ø¹Ù…Ù„Ø§Ø¡"],
    },
    timeline: { fr: "3 Ã  6 semaines", ar: "Ù…Ù† 3 Ø¥Ù„Ù‰ 6 Ø£Ø³Ø§Ø¨ÙŠØ¹" },
    idealFor: {
      fr: "Tout business local dÃ©pendant de la proximitÃ©.",
      ar: "Ù„ÙƒÙ„ Ù†Ø´Ø§Ø· Ù…Ø­Ù„ÙŠ ÙŠØ¹ØªÙ…Ø¯ Ø¹Ù„Ù‰ Ø§Ù„Ø¹Ù…Ù„Ø§Ø¡ Ø§Ù„Ù‚Ø±ÙŠØ¨ÙŠÙ†.",
    },
  },
  {
    id: "catalog-whatsapp",
    title: { fr: "Catalogue + commande WhatsApp", ar: "ÙƒØªØ§Ù„ÙˆØ¬ + Ø§Ù„Ø·Ù„Ø¨ Ø¹Ø¨Ø± ÙˆØ§ØªØ³Ø§Ø¨" },
    summary: {
      fr: "PrÃ©sentez vos produits et convertissez en conversation immÃ©diate.",
      ar: "Ø§Ø¹Ø±Ø¶ Ù…Ù†ØªØ¬Ø§ØªÙƒ ÙˆØ­ÙˆÙ„ Ø§Ù„Ø·Ù„Ø¨ Ù…Ø¨Ø§Ø´Ø±Ø© Ø¥Ù„Ù‰ Ù…Ø­Ø§Ø¯Ø«Ø© ÙˆØ§ØªØ³Ø§Ø¨.",
    },
    deliverables: {
      fr: ["CatÃ©gories produits", "CTA WhatsApp produit", "Templates message", "Tracking Ã©vÃ©nements"],
      ar: ["ØªØµÙ†ÙŠÙØ§Øª Ø§Ù„Ù…Ù†ØªØ¬Ø§Øª", "Ø²Ø± ÙˆØ§ØªØ³Ø§Ø¨ Ù„ÙƒÙ„ Ù…Ù†ØªØ¬", "Ù‚ÙˆØ§Ù„Ø¨ Ø±Ø³Ø§Ø¦Ù„", "ØªØªØ¨Ø¹ Ø§Ù„Ø£Ø­Ø¯Ø§Ø«"],
    },
    timeline: { fr: "2 Ã  3 semaines", ar: "Ù…Ù† Ø£Ø³Ø¨ÙˆØ¹ÙŠÙ† Ø¥Ù„Ù‰ 3 Ø£Ø³Ø§Ø¨ÙŠØ¹" },
    idealFor: {
      fr: "Parapharmacies, boutiques locales, revendeurs.",
      ar: "Ù„Ù„Ø¨Ø§Ø±Ø§ÙØ§Ø±Ù…Ø§Ø³ÙŠ ÙˆØ§Ù„Ù…ØªØ§Ø¬Ø± Ø§Ù„Ù…Ø­Ù„ÙŠØ©.",
    },
  },
  {
    id: "ecommerce",
    title: { fr: "E-commerce complet", ar: "Ù…ØªØ¬Ø± Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠ ÙƒØ§Ù…Ù„" },
    summary: {
      fr: "Boutique prÃªte Ã  vendre avec CMI/NAPS/Payzone, COD et WhatsApp.",
      ar: "Ù…ØªØ¬Ø± Ø¬Ø§Ù‡Ø² Ù„Ù„Ø¨ÙŠØ¹ Ù…Ø¹ CMI ÙˆNAPS ÙˆPayzone ÙˆØ§Ù„Ø¯ÙØ¹ Ø¹Ù†Ø¯ Ø§Ù„Ø§Ø³ØªÙ„Ø§Ù… ÙˆÙˆØ§ØªØ³Ø§Ø¨.",
    },
    deliverables: {
      fr: ["Checkout optimisÃ©", "Paiement marocain", "RÃ¨gles livraison", "Emails transactionnels"],
      ar: ["ØµÙØ­Ø© Ø¯ÙØ¹ Ù…Ø­Ø³Ù†Ø©", "Ø±Ø¨Ø· Ø§Ù„Ø¯ÙØ¹ Ø§Ù„Ù…ØºØ±Ø¨ÙŠ", "Ù‚ÙˆØ§Ø¹Ø¯ Ø§Ù„Ø´Ø­Ù†", "Ø±Ø³Ø§Ø¦Ù„ Ø§Ù„Ù…Ø¹Ø§Ù…Ù„Ø§Øª"],
    },
    timeline: { fr: "4 Ã  8 semaines", ar: "Ù…Ù† 4 Ø¥Ù„Ù‰ 8 Ø£Ø³Ø§Ø¨ÙŠØ¹" },
    idealFor: {
      fr: "CommerÃ§ants avec catalogue et logistique active.",
      ar: "Ù„Ù„Ù…ØªØ§Ø¬Ø± Ø§Ù„ØªÙŠ ØªÙ…Ù„Ùƒ ÙƒØªØ§Ù„ÙˆØ¬Ù‹Ø§ ÙˆØ´Ø­Ù†Ù‹Ø§ ÙØ¹Ù‘Ø§Ù„Ù‹Ø§.",
    },
  },
  {
    id: "booking",
    title: { fr: "RÃ©servations et rendez-vous", ar: "Ø§Ù„Ø­Ø¬ÙˆØ²Ø§Øª ÙˆØ§Ù„Ù…ÙˆØ§Ø¹ÙŠØ¯" },
    summary: {
      fr: "SystÃ¨me simple pour rÃ©duire les appels et no-shows.",
      ar: "Ù†Ø¸Ø§Ù… Ø¨Ø³ÙŠØ· Ù„ØªÙ‚Ù„ÙŠÙ„ Ø§Ù„Ø§ØªØµØ§Ù„Ø§Øª ÙˆØªÙØ§Ø¯ÙŠ ØºÙŠØ§Ø¨ Ø§Ù„Ø¹Ù…Ù„Ø§Ø¡.",
    },
    deliverables: {
      fr: ["Calendrier", "Confirmation WhatsApp", "Rappels", "Formulaire qualification"],
      ar: ["ØªÙ‚ÙˆÙŠÙ…", "ØªØ£ÙƒÙŠØ¯ Ø¹Ø¨Ø± ÙˆØ§ØªØ³Ø§Ø¨", "ØªØ°ÙƒÙŠØ± ØªÙ„Ù‚Ø§Ø¦ÙŠ", "Ù†Ù…ÙˆØ°Ø¬ Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„Ø¹Ù…ÙŠÙ„"],
    },
    timeline: { fr: "2 Ã  4 semaines", ar: "Ù…Ù† Ø£Ø³Ø¨ÙˆØ¹ÙŠÙ† Ø¥Ù„Ù‰ 4 Ø£Ø³Ø§Ø¨ÙŠØ¹" },
    idealFor: { fr: "Cliniques, dentistes, salons.", ar: "Ù„Ù„Ø¹ÙŠØ§Ø¯Ø§Øª ÙˆØ£Ø·Ø¨Ø§Ø¡ Ø§Ù„Ø£Ø³Ù†Ø§Ù† ÙˆØ§Ù„ØµØ§Ù„ÙˆÙ†Ø§Øª." },
  },
  {
    id: "maintenance",
    title: { fr: "Maintenance & sÃ©curitÃ©", ar: "Ø§Ù„ØµÙŠØ§Ù†Ø© ÙˆØ§Ù„Ø£Ù…Ø§Ù†" },
    summary: {
      fr: "Mises Ã  jour, sauvegardes, monitoring et support continu.",
      ar: "ØªØ­Ø¯ÙŠØ«Ø§Øª ÙˆÙ†Ø³Ø® Ø§Ø­ØªÙŠØ§Ø·ÙŠ ÙˆÙ…Ø±Ø§Ù‚Ø¨Ø© ÙˆØ¯Ø¹Ù… Ù…Ø³ØªÙ…Ø±.",
    },
    deliverables: {
      fr: ["Patch sÃ©curitÃ©", "Backups", "Monitoring uptime", "AmÃ©liorations mensuelles"],
      ar: ["ØªØ­Ø¯ÙŠØ«Ø§Øª Ø£Ù…Ø§Ù†", "Ù†Ø³Ø® Ø§Ø­ØªÙŠØ§Ø·ÙŠØ©", "Ù…Ø±Ø§Ù‚Ø¨Ø© Ø§Ù„ØªÙˆÙØ±", "ØªØ­Ø³ÙŠÙ†Ø§Øª Ø´Ù‡Ø±ÙŠØ©"],
    },
    timeline: { fr: "Plan mensuel", ar: "Ø®Ø·Ø© Ø´Ù‡Ø±ÙŠØ©" },
    idealFor: { fr: "Entreprises qui veulent la tranquillitÃ©.", ar: "Ù„Ù„Ø´Ø±ÙƒØ§Øª Ø§Ù„ØªÙŠ ØªØ±ÙŠØ¯ Ø±Ø§Ø­Ø© Ø§Ù„Ø¨Ø§Ù„." },
  },
];

const fallbackCaseStudies: CaseStudy[] = [
  {
    slug: "kenitra-fashion",
    title: { fr: "Kenitra Fashion", ar: "Ù‚Ù†ÙŠØ·Ø±Ø© ÙØ§Ø´Ù†" },
    clientType: { fr: "Projet client mode", ar: "Ù…Ø´Ø±ÙˆØ¹ Ø¹Ù…ÙŠÙ„ Ù„Ù„Ø£Ø²ÙŠØ§Ø¡" },
    liveUrl: "https://kenitra-fashion.vercel.app/",
    city: "KÃ©nitra",
    problem: {
      fr: "La marque avait besoin d'une prÃ©sence premium, mobile-first, avec conversion WhatsApp rapide.",
      ar: "Ø§Ù„Ø¹Ù„Ø§Ù…Ø© Ø§Ø­ØªØ§Ø¬Øª Ø­Ø¶ÙˆØ±Ù‹Ø§ Ø¨ØµØ±ÙŠÙ‹Ø§ Ø§Ø­ØªØ±Ø§ÙÙŠÙ‹Ø§ Ù…ØªÙˆØ§ÙÙ‚Ù‹Ø§ Ù…Ø¹ Ø§Ù„Ù‡Ø§ØªÙ Ù…Ø¹ ØªØ­ÙˆÙŠÙ„ Ø³Ø±ÙŠØ¹ Ø¹Ø¨Ø± ÙˆØ§ØªØ³Ø§Ø¨.",
    },
    solution: {
      fr: "Landing immersive avec hero impactant, sections collections et CTA WhatsApp direct pour la commande.",
      ar: "ØµÙØ­Ø© Ù‡Ø¨ÙˆØ· ØºØ§Ù…Ø±Ø© Ù…Ø¹ Ù‡ÙŠØ±Ùˆ Ù‚ÙˆÙŠ ÙˆØ£Ù‚Ø³Ø§Ù… Ù„Ù„Ù…Ù†ØªØ¬Ø§Øª ÙˆØ£Ø²Ø±Ø§Ø± Ø·Ù„Ø¨ Ù…Ø¨Ø§Ø´Ø±Ø© Ø¹Ø¨Ø± ÙˆØ§ØªØ³Ø§Ø¨.",
    },
    tech: ["Next.js", "Vercel", "WhatsApp CTA", "Responsive UI"],
    results: {
      fr: ["IdentitÃ© visuelle forte", "Navigation fluide mobile/desktop", "Tunnel de conversion WhatsApp simplifiÃ©"],
      ar: ["Ù‡ÙˆÙŠØ© Ø¨ØµØ±ÙŠØ© Ù‚ÙˆÙŠØ©", "ØªØ¬Ø±Ø¨Ø© Ø³Ù„Ø³Ø© Ø¹Ù„Ù‰ Ø§Ù„Ù‡Ø§ØªÙ ÙˆØ§Ù„ÙƒÙ…Ø¨ÙŠÙˆØªØ±", "Ù…Ø³Ø§Ø± Ø·Ù„Ø¨ ÙˆØ§ØªØ³Ø§Ø¨ Ù…Ø¨Ø³Ø·"],
    },
    gallery: ["/images/projects/kenitra-fashion-preview.png"],
  },
    {
    slug: "yoga-website",
    title: { fr: "Yoga Website", ar: "منصة يوغا فيديو" },
    clientType: { fr: "Projet client wellness video", ar: "مشروع عميل: منصة فيديو" },
    liveUrl: "https://yoga-website-eta-topaz.vercel.app/",
    city: "Kénitra",
    problem: {
      fr: "Le client avait besoin d'une vraie plateforme de videos, avec publication admin et contenu structure pour membres.",
      ar: "العميل كان يحتاج منصة فيديو حقيقية مع نشر من طرف الإدارة ومحتوى منظم للأعضاء.",
    },
    solution: {
      fr: "Nous avons implemente un espace admin pour uploader les videos, l'authentification login/register, et un systeme d'abonnement premium pour les videos reservees.",
      ar: "قمنا بتنفيذ لوحة إدارة لرفع الفيديوهات، ونظام تسجيل/دخول، واشتراك Premium لفتح الفيديوهات الحصرية.",
    },
    tech: ["Next.js", "Authentication", "Admin Dashboard", "Video Upload", "Premium Subscription", "Vercel"],
    results: {
      fr: [
        "Upload et publication video simplifies pour l'admin",
        "Acces securise via comptes utilisateurs",
        "Monetisation possible avec abonnement premium",
      ],
      ar: [
        "رفع ونشر الفيديوهات بسهولة من لوحة الإدارة",
        "وصول آمن عبر حسابات المستخدمين",
        "إمكانية الربح عبر اشتراك Premium",
      ],
    },
    gallery: ["/images/projects/yoga-website-preview.png"],
  },
  {
    slug: "parapharmacie-casablanca",
    title: { fr: "Projet pilote Parapharmacie", ar: "Ù…Ø´Ø±ÙˆØ¹ ØªØ¬Ø±ÙŠØ¨ÙŠ Ø¨Ø§Ø±Ø§ÙØ§Ø±Ù…Ø§Ø³ÙŠ" },
    clientType: { fr: "Simulation parapharmacie", ar: "Ù…Ø­Ø§ÙƒØ§Ø© Ø¨Ø§Ø±Ø§ÙØ§Ø±Ù…Ø§Ø³ÙŠ" },
    city: "Casablanca",
    problem: {
      fr: "Scenario test: un commerce dÃ©pend des passages en boutique avec peu de visibilitÃ© locale.",
      ar: "Ø³ÙŠÙ†Ø§Ø±ÙŠÙˆ Ø§Ø®ØªØ¨Ø§Ø±ÙŠ: Ù†Ø´Ø§Ø· ÙŠØ¹ØªÙ…Ø¯ Ø¹Ù„Ù‰ Ø§Ù„Ø²ÙˆØ§Ø± Ø§Ù„Ù…Ø¨Ø§Ø´Ø±ÙŠÙ† Ù…Ø¹ Ø¸Ù‡ÙˆØ± Ù…Ø­Ù„ÙŠ Ø¶Ø¹ÙŠÙ.",
    },
    solution: {
      fr: "Prototype catalogue par catÃ©gories, bouton WhatsApp par produit et fiches promos.",
      ar: "Ù†Ù…ÙˆØ°Ø¬ ÙƒØªØ§Ù„ÙˆØ¬ Ø­Ø³Ø¨ Ø§Ù„ÙØ¦Ø§Øª Ù…Ø¹ Ø²Ø± ÙˆØ§ØªØ³Ø§Ø¨ Ù„ÙƒÙ„ Ù…Ù†ØªØ¬ ÙˆØµÙØ­Ø§Øª Ø¹Ø±ÙˆØ¶.",
    },
    tech: ["Next.js", "Sanity", "Cloudflare", "WhatsApp CTA"],
    results: {
      fr: ["Prototype fonctionnel livre", "Parcours commande WhatsApp valide", "Performance cible < 1.5s"],
      ar: ["Ù†Ù…ÙˆØ°Ø¬ Ø¹Ù…Ù„ÙŠ Ø¬Ø§Ù‡Ø²", "Ù…Ø³Ø§Ø± Ø·Ù„Ø¨ ÙˆØ§ØªØ³Ø§Ø¨ Ù†Ø§Ø¬Ø­", "Ø³Ø±Ø¹Ø© Ù…Ø³ØªÙ‡Ø¯ÙØ© Ø£Ù‚Ù„ Ù…Ù† 1.5 Ø«Ø§Ù†ÙŠØ©"],
    },
    gallery: ["/images/placeholder-1.svg", "/images/placeholder-2.svg"],
  },
  {
    slug: "clinic-rabat",
    title: { fr: "Projet pilote Clinique", ar: "Ù…Ø´Ø±ÙˆØ¹ ØªØ¬Ø±ÙŠØ¨ÙŠ Ø¹ÙŠØ§Ø¯Ø©" },
    clientType: { fr: "Simulation clinique", ar: "Ù…Ø­Ø§ÙƒØ§Ø© Ø¹ÙŠØ§Ø¯Ø©" },
    city: "Rabat",
    problem: {
      fr: "Scenario test: prise de rendez-vous manuelle et faible presence locale.",
      ar: "Ø³ÙŠÙ†Ø§Ø±ÙŠÙˆ Ø§Ø®ØªØ¨Ø§Ø±ÙŠ: Ø­Ø¬Ø² ÙŠØ¯ÙˆÙŠ ÙˆØ­Ø¶ÙˆØ± Ù…Ø­Ù„ÙŠ Ø¶Ø¹ÙŠÙ.",
    },
    solution: {
      fr: "Prototype avec module rendez-vous, pages services et structure SEO locale.",
      ar: "Ù†Ù…ÙˆØ°Ø¬ Ù…Ø¹ Ù†Ø¸Ø§Ù… Ù…ÙˆØ§Ø¹ÙŠØ¯ ÙˆØµÙØ­Ø§Øª Ø®Ø¯Ù…Ø§Øª ÙˆÙ‡ÙŠÙƒÙ„Ø© SEO Ù…Ø­Ù„ÙŠ.",
    },
    tech: ["Next.js", "Form Actions", "Schema SEO"],
    results: {
      fr: ["Tunnel rendez-vous valide", "Structure GBP prete", "UX mobile testee"],
      ar: ["Ù…Ø³Ø§Ø± Ø§Ù„Ù…ÙˆØ§Ø¹ÙŠØ¯ Ø¬Ø§Ù‡Ø²", "Ø¨Ù†ÙŠØ© GBP Ø¬Ø§Ù‡Ø²Ø©", "ØªØ¬Ø±Ø¨Ø© Ø§Ù„Ù‡Ø§ØªÙ ØªÙ… Ø§Ø®ØªØ¨Ø§Ø±Ù‡Ø§"],
    },
    gallery: ["/images/placeholder-3.svg", "/images/placeholder-4.svg"],
  },
  {
    slug: "local-shop-kenitra",
    title: { fr: "Projet pilote Boutique KÃ©nitra", ar: "Ù…Ø´Ø±ÙˆØ¹ ØªØ¬Ø±ÙŠØ¨ÙŠ Ù…ØªØ¬Ø± Ø§Ù„Ù‚Ù†ÙŠØ·Ø±Ø©" },
    clientType: { fr: "Simulation boutique locale", ar: "Ù…Ø­Ø§ÙƒØ§Ø© Ù…ØªØ¬Ø± Ù…Ø­Ù„ÙŠ" },
    city: "KÃ©nitra",
    problem: {
      fr: "Scenario test: pas de catalogue en ligne et commandes uniquement en DM.",
      ar: "Ø³ÙŠÙ†Ø§Ø±ÙŠÙˆ Ø§Ø®ØªØ¨Ø§Ø±ÙŠ: Ù„Ø§ ÙŠÙˆØ¬Ø¯ ÙƒØªØ§Ù„ÙˆØ¬ Ø±Ù‚Ù…ÙŠ ÙˆØ§Ù„Ø·Ù„Ø¨Ø§Øª ÙÙ‚Ø· Ø¹Ø¨Ø± Ø§Ù„Ø±Ø³Ø§Ø¦Ù„.",
    },
    solution: {
      fr: "Mini catalogue e-commerce avec COD, pre-integration paiement marocain et pages promos.",
      ar: "ÙƒØªØ§Ù„ÙˆØ¬-Ù…ØªØ¬Ø± Ù…ØµØºØ± Ù…Ø¹ Ø§Ù„Ø¯ÙØ¹ Ø¹Ù†Ø¯ Ø§Ù„Ø§Ø³ØªÙ„Ø§Ù… ÙˆØªØ¬Ù‡ÙŠØ² Ø±Ø¨Ø· Ø§Ù„Ø¯ÙØ¹ Ø§Ù„Ù…Ø­Ù„ÙŠ ÙˆØµÙØ­Ø§Øª Ø¹Ø±ÙˆØ¶.",
    },
    tech: ["Next.js", "CMI-ready checkout", "Cloudflare Pages"],
    results: {
      fr: ["Stack e-commerce de base prete", "Parcours commande simplifie", "Base de lancement pour vrai projet"],
      ar: ["Ø¨Ù†ÙŠØ© Ù…ØªØ¬Ø± Ø£Ø³Ø§Ø³ÙŠØ© Ø¬Ø§Ù‡Ø²Ø©", "Ù…Ø³Ø§Ø± Ø·Ù„Ø¨ Ù…Ø¨Ø³Ø·", "Ù‚Ø§Ø¹Ø¯Ø© Ø¬Ø§Ù‡Ø²Ø© Ù„Ù…Ø´Ø±ÙˆØ¹ Ø­Ù‚ÙŠÙ‚ÙŠ"],
    },
    gallery: ["/images/placeholder-5.svg", "/images/placeholder-6.svg"],
  },
];

const fallbackTestimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Retour test #1",
    business: { fr: "Projet pilote Parapharmacie", ar: "Ù…Ø´Ø±ÙˆØ¹ ØªØ¬Ø±ÙŠØ¨ÙŠ Ø¨Ø§Ø±Ø§ÙØ§Ø±Ù…Ø§Ø³ÙŠ" },
    quote: {
      fr: "Prototype propre et clair. Le parcours WhatsApp est simple pour l'utilisateur final.",
      ar: "Ø§Ù„Ù†Ù…ÙˆØ°Ø¬ ÙˆØ§Ø¶Ø­ ÙˆØ³Ù‡Ù„. Ù…Ø³Ø§Ø± Ø§Ù„Ø·Ù„Ø¨ Ø¹Ø¨Ø± ÙˆØ§ØªØ³Ø§Ø¨ Ø¨Ø³ÙŠØ· Ù„Ù„Ù…Ø³ØªØ®Ø¯Ù….",
    },
  },
  {
    id: "t2",
    name: "Retour test #2",
    business: { fr: "Projet pilote Clinique", ar: "Ù…Ø´Ø±ÙˆØ¹ ØªØ¬Ø±ÙŠØ¨ÙŠ Ø¹ÙŠØ§Ø¯Ø©" },
    quote: {
      fr: "La structure SEO locale et la prise de rendez-vous sont prÃªtes pour un vrai lancement client.",
      ar: "Ù‡ÙŠÙƒÙ„Ø© SEO Ø§Ù„Ù…Ø­Ù„ÙŠØ© ÙˆÙ†Ø¸Ø§Ù… Ø§Ù„Ù…ÙˆØ§Ø¹ÙŠØ¯ Ø¬Ø§Ù‡Ø²Ø§Ù† Ù„Ø¥Ø·Ù„Ø§Ù‚ ÙØ¹Ù„ÙŠ Ù…Ø¹ Ø¹Ù…ÙŠÙ„.",
    },
  },
  {
    id: "t3",
    name: "Retour test #3",
    business: { fr: "Projet pilote Boutique", ar: "Ù…Ø´Ø±ÙˆØ¹ ØªØ¬Ø±ÙŠØ¨ÙŠ Ù…ØªØ¬Ø±" },
    quote: {
      fr: "Le workflow catalogue + WhatsApp est pratique et facile a maintenir.",
      ar: "Ù…Ø³Ø§Ø± Ø§Ù„ÙƒØªØ§Ù„ÙˆØ¬ + ÙˆØ§ØªØ³Ø§Ø¨ Ø¹Ù…Ù„ÙŠ ÙˆØ³Ù‡Ù„ Ø§Ù„ØµÙŠØ§Ù†Ø©.",
    },
  },
];

const fallbackFaq: FaqItem[] = [
  {
    id: "f1",
    question: {
      fr: "Est-ce que vous gÃ©rez les domaines .ma ?",
      ar: "Ù‡Ù„ ØªÙˆÙØ±ÙˆÙ† Ø§Ù„Ù…Ø³Ø§Ø¹Ø¯Ø© ÙÙŠ Ø´Ø±Ø§Ø¡ Ù†Ø·Ø§Ù‚ .maØŸ",
    },
    answer: {
      fr: "Oui. Nous vous accompagnons pour l'achat du .ma via des registrars accrÃ©ditÃ©s ANRT et la configuration DNS.",
      ar: "Ù†Ø¹Ù…ØŒ Ù†Ø³Ø§Ø¹Ø¯Ùƒ ÙÙŠ Ø´Ø±Ø§Ø¡ Ù†Ø·Ø§Ù‚ .ma Ø¹Ø¨Ø± Ù…Ø³Ø¬Ù„ÙŠÙ† Ù…Ø¹ØªÙ…Ø¯ÙŠÙ† Ù…Ù† ANRT ÙˆØ¶Ø¨Ø· DNS.",
    },
  },
  {
    id: "f2",
    question: {
      fr: "Quels moyens de paiement pouvez-vous intÃ©grer ?",
      ar: "Ù…Ø§ ÙˆØ³Ø§Ø¦Ù„ Ø§Ù„Ø¯ÙØ¹ Ø§Ù„ØªÙŠ ÙŠÙ…ÙƒÙ† Ø¯Ù…Ø¬Ù‡Ø§ØŸ",
    },
    answer: {
      fr: "CMI (Maroc Telecommerce), NAPS, Payzone, paiement Ã  la livraison (COD), et commande WhatsApp.",
      ar: "CMI ÙˆNAPS ÙˆPayzone Ù…Ø¹ Ø§Ù„Ø¯ÙØ¹ Ø¹Ù†Ø¯ Ø§Ù„Ø§Ø³ØªÙ„Ø§Ù… ÙˆØ§Ù„Ø·Ù„Ø¨ Ø¹Ø¨Ø± ÙˆØ§ØªØ³Ø§Ø¨.",
    },
  },
  {
    id: "f3",
    question: {
      fr: "Comment se passent les paiements du projet ?",
      ar: "ÙƒÙŠÙ ÙŠØªÙ… Ø£Ø¯Ø§Ø¡ ØªÙƒÙ„ÙØ© Ø§Ù„Ù…Ø´Ø±ÙˆØ¹ØŸ",
    },
    answer: {
      fr: "En gÃ©nÃ©ral: 50% Ã  l'avance, 30% sur preview, 20% Ã  la mise en ligne.",
      ar: "Ø¹Ø§Ø¯Ø©: 50% Ù…Ù‚Ø¯Ù…Ù‹Ø§ØŒ 30% Ø¹Ù†Ø¯ Ø§Ù„Ù…Ø¹Ø§ÙŠÙ†Ø©ØŒ 20% Ø¹Ù†Ø¯ Ø§Ù„Ø¥Ø·Ù„Ø§Ù‚.",
    },
  },
];

const fallbackBlogPosts: BlogPost[] = [
  {
    slug: "seo-local-maroc",
    title: { fr: "SEO local au Maroc: guide pratique 2026", ar: "Ø¯Ù„ÙŠÙ„ SEO Ø§Ù„Ù…Ø­Ù„ÙŠ ÙÙŠ Ø§Ù„Ù…ØºØ±Ø¨ 2026" },
    excerpt: {
      fr: "Comment apparaÃ®tre sur Google Maps Ã  Casablanca, Rabat et KÃ©nitra.",
      ar: "ÙƒÙŠÙ ØªØ¸Ù‡Ø± ÙÙŠ Ø®Ø±Ø§Ø¦Ø· Google ÙÙŠ Ø§Ù„Ø¯Ø§Ø± Ø§Ù„Ø¨ÙŠØ¶Ø§Ø¡ ÙˆØ§Ù„Ø±Ø¨Ø§Ø· ÙˆØ§Ù„Ù‚Ù†ÙŠØ·Ø±Ø©.",
    },
    content: {
      fr: "Le SEO local commence par une fiche Google Business Profile complÃ¨te, des avis rÃ©guliers, des citations cohÃ©rentes, et un site rapide orientÃ© mobile.",
      ar: "SEO Ø§Ù„Ù…Ø­Ù„ÙŠ ÙŠØ¨Ø¯Ø£ Ø¨Ù…Ù„Ù Google Business Ù…ÙƒØªÙ…Ù„ ÙˆØªÙ‚ÙŠÙŠÙ…Ø§Øª Ù…Ø³ØªÙ…Ø±Ø© ÙˆØ¥Ø¯Ø±Ø§Ø¬Ø§Øª Ù…ØªÙ†Ø§Ø³Ù‚Ø© ÙˆÙ…ÙˆÙ‚Ø¹ Ø³Ø±ÙŠØ¹ Ù…ÙˆØ¬Ù‡ Ù„Ù„Ù‡Ø§ØªÙ.",
    },
    date: "2026-01-20",
    category: { fr: "SEO local", ar: "SEO Ù…Ø­Ù„ÙŠ" },
  },
  {
    slug: "commande-whatsapp-maroc",
    title: { fr: "Pourquoi WhatsApp convertit mieux pour les commerces locaux", ar: "Ù„Ù…Ø§Ø°Ø§ ÙˆØ§ØªØ³Ø§Ø¨ ÙŠØ­Ù‚Ù‚ ØªØ­ÙˆÙŠÙ„Ù‹Ø§ Ø£ÙØ¶Ù„ Ù„Ù„ØªØ¬Ø§Ø± Ø§Ù„Ù…Ø­Ù„ÙŠÙŠÙ†" },
    excerpt: {
      fr: "RÃ©duire la friction entre dÃ©couverte produit et commande.",
      ar: "ØªÙ‚Ù„ÙŠÙ„ Ø§Ù„Ø§Ø­ØªÙƒØ§Ùƒ Ø¨ÙŠÙ† Ø§ÙƒØªØ´Ø§Ù Ø§Ù„Ù…Ù†ØªØ¬ ÙˆØ¥ØªÙ…Ø§Ù… Ø§Ù„Ø·Ù„Ø¨.",
    },
    content: {
      fr: "Les clients marocains prÃ©fÃ¨rent souvent WhatsApp pour poser une question avant achat. Un bouton par produit amÃ©liore la conversion.",
      ar: "Ø§Ù„Ø¹Ù…Ù„Ø§Ø¡ ÙÙŠ Ø§Ù„Ù…ØºØ±Ø¨ ÙŠÙØ¶Ù„ÙˆÙ† ÙˆØ§ØªØ³Ø§Ø¨ Ù„Ø·Ø±Ø­ Ø§Ù„Ø£Ø³Ø¦Ù„Ø© Ù‚Ø¨Ù„ Ø§Ù„Ø´Ø±Ø§Ø¡ØŒ ÙˆØ²Ø± ÙˆØ§ØªØ³Ø§Ø¨ Ù„ÙƒÙ„ Ù…Ù†ØªØ¬ ÙŠØ±ÙØ¹ Ø§Ù„ØªØ­ÙˆÙŠÙ„.",
    },
    date: "2026-01-14",
    category: { fr: "Conversion", ar: "Ø§Ù„ØªØ­ÙˆÙŠÙ„" },
  },
  {
    slug: "choisir-domaine-ma",
    title: { fr: "Comment choisir un nom de domaine .ma pour son business", ar: "ÙƒÙŠÙ ØªØ®ØªØ§Ø± Ù†Ø·Ø§Ù‚ .ma Ù„Ù†Ø´Ø§Ø·Ùƒ" },
    excerpt: {
      fr: "RÃ¨gles de base et conseils branding local.",
      ar: "Ù‚ÙˆØ§Ø¹Ø¯ Ø£Ø³Ø§Ø³ÙŠØ© ÙˆÙ†ØµØ§Ø¦Ø­ Ù„Ù„Ù‡ÙˆÙŠØ© Ø§Ù„Ù…Ø­Ù„ÙŠØ©.",
    },
    content: {
      fr: "Le .ma renforce la confiance locale. Choisissez un nom court, lisible, et proche de votre marque ou activitÃ© principale.",
      ar: "Ù†Ø·Ø§Ù‚ .ma ÙŠØ¹Ø²Ø² Ø§Ù„Ø«Ù‚Ø© Ù…Ø­Ù„ÙŠÙ‹Ø§ØŒ Ø§Ø®ØªØ± Ø§Ø³Ù…Ù‹Ø§ Ù‚ØµÙŠØ±Ù‹Ø§ ÙˆÙˆØ§Ø¶Ø­Ù‹Ø§ ÙˆÙ‚Ø±ÙŠØ¨Ù‹Ø§ Ù…Ù† Ø¹Ù„Ø§Ù…ØªÙƒ.",
    },
    date: "2026-01-07",
    category: { fr: "Domaines", ar: "Ø§Ù„Ù†Ø·Ø§Ù‚Ø§Øª" },
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

