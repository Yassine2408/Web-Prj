"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  Globe,
  Instagram,
  Mail,
  Menu,
  MessageCircle,
  Phone,
  Rocket,
  ShieldCheck,
  Sparkles,
  Star,
  Workflow,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

type FadeInProps = {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right";
  index?: number;
  className?: string;
};

function FadeIn({ children, direction = "up", index = 0, className }: FadeInProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const initial = useMemo(() => {
    if (direction === "down") return { opacity: 0, y: -40 };
    if (direction === "left") return { opacity: 0, x: 40 };
    if (direction === "right") return { opacity: 0, x: -40 };
    return { opacity: 0, y: 40 };
  }, [direction]);

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : initial}
      transition={{ duration: 0.7, ease: "easeOut", delay: index * 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function CounterAnimation({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.round(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <div ref={ref} className="text-4xl font-bold text-white">
      {count}
      {suffix}
    </div>
  );
}

export default function LabPage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { href: "#services", label: "Services" },
    { href: "#showcase", label: "Réalisations" },
    { href: "#pricing", label: "Tarifs" },
    { href: "#contact", label: "Contact" },
  ];

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  return (
    <div className="dot-pattern min-h-screen bg-background">
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed inset-x-0 top-0 z-50 border-b ${scrolled ? "border-white/10 bg-[#0e1422]/80 shadow-xl backdrop-blur-md" : "border-slate-200/80 bg-white/90 backdrop-blur-sm"}`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="#home" className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-[var(--primary)]" />
            <span className={`text-xl font-extrabold tracking-tight ${scrolled ? "text-white" : "text-[var(--text-heading)]"}`}>Sitara Studio</span>
          </Link>
          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition ${scrolled ? "text-white/80 hover:text-white" : "text-[var(--text-body)] hover:text-[var(--text-heading)]"}`}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="hidden items-center gap-3 md:flex">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="btn-cta h-11">Demander un devis</Button>
              </DialogTrigger>
              <DialogContent>
                <h3 className="text-xl font-bold text-[var(--text-heading)]">Démarrage rapide</h3>
                <p className="mt-2 text-sm text-[var(--text-body)]">Parlez-nous de votre projet en 2 minutes.</p>
                <form className="mt-4 space-y-3" onSubmit={onSubmit}>
                  <Input placeholder="Nom complet" />
                  <Input placeholder="Téléphone / WhatsApp" />
                  <Textarea placeholder="Objectif du site" />
                  <Button type="submit" className="btn-cta h-11 w-full">
                    Envoyer
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="rounded-md border border-white/20 p-2 text-white md:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        <AnimatePresence>
          {mobileOpen ? (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-white/10 bg-[#0e1422]/95 px-4 md:hidden"
            >
              <div className="flex flex-col gap-4 py-4">
                {navItems.map((item) => (
                  <a key={item.href} href={item.href} className="text-white/90" onClick={() => setMobileOpen(false)}>
                    {item.label}
                  </a>
                ))}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.header>

      <main id="home" className="pt-24">
        <section className="relative min-h-screen bg-white py-24 sm:py-32">
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
            <FadeIn>
              <Badge variant="outline" className="mb-6 border-[var(--primary)]/30 text-[var(--primary)]">
                Studio web premium au Maroc
              </Badge>
              <h1 className="text-3xl font-bold tracking-tight text-[var(--text-heading)] sm:text-4xl lg:text-5xl">
                On conçoit des expériences digitales qui <span className="text-gradient">impressionnent et convertissent</span>.
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-[var(--text-body)]">
                Sitara accompagne les marques ambitieuses avec des sites rapides, élégants et orientés business.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button className="btn-cta h-14 px-8">Commencer le projet</Button>
                <Button variant="outline" className="h-14 px-8">
                  Voir les réalisations
                </Button>
              </div>
              <div className="mt-8 flex items-center gap-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((n) => (
                    <div key={n} className="h-9 w-9 rounded-full border-2 border-white bg-[var(--accent-1)]/20" />
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 text-amber-500">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <Star key={n} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-[var(--text-muted)]">4.9/5 satisfaction client</p>
                </div>
              </div>
            </FadeIn>
            <FadeIn index={1} direction="left">
              <div className="relative">
                <div className="relative h-[520px] overflow-hidden rounded-2xl shadow-xl">
                  <Image src="/images/projects/kenitra-fashion-preview.png" alt="Hero preview" fill className="object-cover" />
                </div>
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -left-6 top-10 rounded-xl border border-[var(--border)] bg-white p-4 shadow-lg"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">Conversion</p>
                  <p className="text-xl font-bold text-[var(--text-heading)]">+37%</p>
                </motion.div>
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 5.6, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                  className="absolute -right-5 bottom-14 rounded-xl border border-[var(--border)] bg-white p-4 shadow-lg"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">Speed</p>
                  <p className="text-xl font-bold text-[var(--text-heading)]">&lt;1.4s</p>
                </motion.div>
              </div>
            </FadeIn>
          </div>
        </section>

        <section className="border-y bg-white py-10">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-8 px-4 text-sm text-[var(--text-muted)] sm:px-6 lg:px-8">
            {["NAPS", "CMI", "Cloudflare", "Vercel", "Google Maps"].map((logo) => (
              <span key={logo} className="font-semibold transition hover:text-[var(--primary)]">
                {logo}
              </span>
            ))}
          </div>
        </section>

        <section id="services" className="relative bg-[var(--dark-section)] py-24 sm:py-32">
          <div className="pointer-events-none absolute left-0 top-0 h-40 w-40 rounded-full bg-[var(--accent-2)]/20 blur-3xl" />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent-2)]">Services</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Une stack moderne pour un résultat <span className="text-gradient">production-ready</span>
              </h2>
            </FadeIn>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {[{
                icon: Globe,
                title: "Sites vitrines premium",
                desc: "Design haut de gamme, SEO local et expérience mobile fluide.",
                accent: "var(--accent-1)",
              }, {
                icon: MessageCircle,
                title: "Tunnel WhatsApp",
                desc: "Parcours orienté conversion pour générer plus de leads.",
                accent: "var(--accent-2)",
              }, {
                icon: ShieldCheck,
                title: "Maintenance & sécurité",
                desc: "Suivi continu, updates et protection de votre plateforme.",
                accent: "var(--accent-3)",
              }].map((feature, i) => (
                <FadeIn key={feature.title} index={i}>
                  <Card className="group h-full border-white/10 bg-white/5 text-white backdrop-blur-sm transition-transform duration-[400ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:shadow-xl">
                    <CardHeader>
                      <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-lg" style={{ backgroundColor: `${feature.accent}22` }}>
                        <feature.icon className="h-6 w-6" style={{ color: feature.accent }} />
                      </div>
                      <CardTitle>{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-white/75">{feature.desc}</p>
                      <a href="#contact" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--accent-2)]">
                        Learn more <ArrowRight className="h-4 w-4" />
                      </a>
                    </CardContent>
                  </Card>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-24 sm:py-32">
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
            <FadeIn direction="right">
              <div className="relative">
                <div className="relative h-[420px] overflow-hidden rounded-2xl shadow-xl">
                  <Image src="/images/projects/kenitra-fashion-preview.png" alt="About visual" fill className="object-cover transition duration-700 group-hover:scale-105" />
                </div>
                <Card className="absolute -bottom-7 left-6 w-60 shadow-xl">
                  <CardContent className="p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">Value</p>
                    <p className="mt-1 text-lg font-bold text-[var(--text-heading)]">UX + SEO + Performance</p>
                  </CardContent>
                </Card>
              </div>
            </FadeIn>
            <FadeIn>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--primary)]">Pourquoi Sitara</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-[var(--text-heading)] sm:text-4xl lg:text-5xl">
                Un partenaire digital orienté résultat.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-[var(--text-body)]">
                Nous combinons design premium, développement solide et stratégie de conversion pour livrer un site qui travaille pour votre business.
              </p>
              <div className="mt-8 space-y-3">
                {["Délais respectés", "Code propre et maintenable", "Accompagnement post-livraison"].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-[var(--text-body)]">
                    <CheckCircle2 className="h-5 w-5 text-[var(--primary)]" />
                    {item}
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        <section className="bg-[var(--dark-section)] py-20">
          <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
            {[{ label: "Projects", value: 28, suffix: "+" }, { label: "Satisfaction", value: 98, suffix: "%" }, { label: "Avg. score", value: 49, suffix: "/50" }, { label: "Delivery days", value: 14, suffix: "j" }].map((stat, i) => (
              <FadeIn key={stat.label} index={i}>
                <Card className="border-white/10 bg-white/5 text-center text-white">
                  <CardContent className="p-6">
                    <CounterAnimation target={stat.value} suffix={stat.suffix} />
                    <p className="mt-2 text-sm text-white/70">{stat.label}</p>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </section>

        <section id="showcase" className="bg-[var(--bg-light)] py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--primary)]">Showcase</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-[var(--text-heading)] sm:text-4xl lg:text-5xl">Projets récents</h2>
            </FadeIn>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {["Kenitra Fashion", "Clinique Horizon", "Para+ Market", "Sahara Events"].map((item, i) => (
                <FadeIn key={item} index={i}>
                  <div className="group overflow-hidden rounded-xl border border-[var(--border)] bg-white shadow-sm transition-transform duration-[400ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:shadow-xl">
                    <div className="relative h-64 overflow-hidden">
                      <Image src="/images/projects/kenitra-fashion-preview.png" alt={item} fill className="object-cover transition duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <Badge className="absolute left-4 top-4 bg-white text-black">Live</Badge>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold text-[var(--text-heading)]">{item}</h3>
                        <ArrowRight className="h-5 w-5 text-[var(--primary)]" />
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--primary)]">Process</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-[var(--text-heading)] sm:text-4xl">Comment on avance</h2>
            </FadeIn>
            <div className="mt-12 grid gap-6 md:grid-cols-4">
              {[{
                icon: Workflow, title: "Audit", desc: "Objectifs, persona, concurrence",
              }, { icon: Sparkles, title: "Design", desc: "UI premium, UX conversion" }, { icon: Rocket, title: "Build", desc: "Next.js, SEO, performance" }, { icon: ShieldCheck, title: "Launch", desc: "Mise en ligne + support" }].map((step, i) => (
                <FadeIn key={step.title} index={i}>
                  <div className="relative rounded-xl border border-[var(--border)] bg-white p-6 text-center shadow-sm">
                    <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--primary)]/10 text-[var(--primary)]">
                      <step.icon className="h-6 w-6" />
                    </div>
                    <Badge variant="secondary" className="mb-2">{`0${i + 1}`}</Badge>
                    <h3 className="text-lg font-semibold text-[var(--text-heading)]">{step.title}</h3>
                    <p className="mt-2 text-sm text-[var(--text-body)]">{step.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="bg-[var(--bg-light)] py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <h2 className="text-3xl font-bold tracking-tight text-[var(--text-heading)] sm:text-4xl">Plans</h2>
            </FadeIn>
            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {[
                { name: "Starter", price: "4 900 MAD", features: ["Landing page", "SEO de base", "Support 14 jours"] },
                { name: "Business", price: "9 900 MAD", features: ["Site multi-pages", "Blog + SEO", "Support 30 jours"], featured: true },
                { name: "Scale", price: "16 900 MAD", features: ["Stack avancée", "Optimisation CRO", "Support prioritaire"] },
              ].map((plan) => (
                <Card
                  key={plan.name}
                  className={`rounded-xl ${plan.featured ? "border-[var(--cta)] shadow-xl lg:scale-[1.03]" : "border-[var(--border)]"} transition`}
                >
                  <CardHeader>
                    <CardTitle>{plan.name}</CardTitle>
                    <p className="text-3xl font-bold text-[var(--text-heading)]">{plan.price}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-[var(--text-body)]">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-[var(--primary)]" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Button className="btn-cta mt-6 w-full">Choisir ce plan</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[var(--dark-section)] py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Témoignages</h2>
            </FadeIn>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {["Exécution rapide, design premium.", "Nos leads WhatsApp ont progressé dès la semaine 1.", "Très bon suivi post-livraison."].map((quote, i) => (
                <FadeIn key={quote} index={i}>
                  <div className="glass-card rounded-xl p-6 text-white">
                    <div className="mb-3 flex items-center gap-1 text-amber-400">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-sm leading-relaxed text-white/85">{quote}</p>
                    <Separator className="my-4 bg-white/10" />
                    <p className="text-sm font-semibold">Client {i + 1}</p>
                    <p className="text-xs text-white/60">Business local</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="dot-pattern overflow-hidden rounded-3xl bg-[var(--dark-section)] p-10 text-white shadow-2xl">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Prêt à faire passer votre présence digitale au niveau supérieur ?</h2>
              <p className="mt-4 max-w-2xl text-white/75">On peut démarrer cette semaine avec une roadmap claire et orientée ROI.</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button className="btn-cta h-12 px-7">Lancer le projet</Button>
                <Button variant="outline" className="h-12 border-white/25 bg-transparent px-7 text-white hover:bg-white/10">
                  Voir les plans
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="bg-[var(--bg-light)] py-24 sm:py-32">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
            <FadeIn>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--primary)]">Contact</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-[var(--text-heading)] sm:text-4xl">Parlons de votre projet</h2>
              <div className="mt-8 space-y-4 text-[var(--text-body)]">
                <p className="flex items-center gap-3"><Phone className="h-4 w-4 text-[var(--primary)]" /> +212 653 205 141</p>
                <p className="flex items-center gap-3"><Mail className="h-4 w-4 text-[var(--primary)]" /> hello@sitara.ma</p>
                <p className="flex items-center gap-3"><Globe className="h-4 w-4 text-[var(--primary)]" /> Kénitra, Maroc</p>
                <p className="flex items-center gap-3"><Clock3 className="h-4 w-4 text-[var(--primary)]" /> Lun-Sam, 09:00 - 19:00</p>
              </div>
              <div className="mt-6 flex gap-3 text-[var(--text-muted)]">
                <Instagram className="h-5 w-5" />
                <MessageCircle className="h-5 w-5" />
                <CircleDollarSign className="h-5 w-5" />
              </div>
            </FadeIn>
            <FadeIn direction="left">
              <Card className="rounded-xl border-[var(--border)] bg-white">
                <CardContent className="p-6">
                  <form onSubmit={onSubmit} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <Label>Nom</Label>
                        <Input className="mt-1 h-11 border-[#ddd]" required />
                      </div>
                      <div>
                        <Label>Email</Label>
                        <Input type="email" className="mt-1 h-11 border-[#ddd]" required />
                      </div>
                    </div>
                    <div>
                      <Label>Téléphone</Label>
                      <Input className="mt-1 h-11 border-[#ddd]" />
                    </div>
                    <div>
                      <Label>Message</Label>
                      <Textarea className="mt-1 min-h-28 border-[#ddd]" />
                    </div>
                    <Button type="submit" className="btn-cta h-12 w-full" disabled={submitting}>
                      {submitting ? "Envoi..." : "Envoyer la demande"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </section>
      </main>

      <footer className="bg-[var(--dark-section)] py-14 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-[var(--primary)]" />
                <span className="font-bold">Sitara Studio</span>
              </div>
              <p className="mt-3 text-sm text-white/65">Web development & digital solutions.</p>
            </div>
            <div>
              <p className="mb-2 text-sm font-semibold">Navigation</p>
              <div className="space-y-2 text-sm text-white/70">
                <a href="#services" className="block hover:text-white">Services</a>
                <a href="#showcase" className="block hover:text-white">Showcase</a>
              </div>
            </div>
            <div>
              <p className="mb-2 text-sm font-semibold">Support</p>
              <div className="space-y-2 text-sm text-white/70">
                <a href="#contact" className="block hover:text-white">Contact</a>
                <a href="#pricing" className="block hover:text-white">Pricing</a>
              </div>
            </div>
            <div>
              <p className="mb-2 text-sm font-semibold">Legal</p>
              <div className="space-y-2 text-sm text-white/70">
                <span className="block">Privacy</span>
                <span className="block">Terms</span>
              </div>
            </div>
          </div>
          <Separator className="my-6 bg-white/10" />
          <p className="text-xs text-white/60">© {new Date().getFullYear()} Sitara. All rights reserved.</p>
        </div>
      </footer>

      <AnimatePresence>
        {showToast ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 rounded-lg bg-[#111827] px-4 py-3 text-sm text-white shadow-xl"
          >
            Message envoyé avec succès.
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
