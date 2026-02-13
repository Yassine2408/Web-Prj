import Link from "next/link";
import { BadgeCheck, MapPin, Smartphone, Wrench } from "lucide-react";
import { CTASection } from "@/components/cta-section";
import { FAQAccordion } from "@/components/faq-accordion";
import { PricingCards } from "@/components/pricing-cards";
import { PricingTable } from "@/components/pricing-table";
import { ServiceCard } from "@/components/service-card";
import { TestimonialCarousel } from "@/components/testimonial-carousel";
import { ContactForm } from "@/components/contact-form";
import { StatsSection } from "@/components/stats-section";
import { IndustryBadges } from "@/components/industry-badges";
import { ProcessTimeline } from "@/components/process-timeline";
import { ScrollReveal } from "@/components/scroll-reveal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getBlogPosts, getCaseStudies, getFaq, getServices, getTestimonials } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";
import type { Locale } from "@/lib/types";

function t(locale: Locale, fr: string, ar: string) {
  return locale === "ar" ? ar : fr;
}

export async function HomePage({ locale }: { locale: Locale }) {
  const [services, work, testimonials, faqs] = await Promise.all([
    getServices(),
    getCaseStudies(),
    getTestimonials(),
    getFaq(),
  ]);

  return (
    <div className="space-y-16 md:space-y-20">
      <section className="rounded-3xl border border-border/70 bg-gradient-to-br from-primary/15 via-background to-secondary/20 p-5 shadow-sm sm:p-7 md:p-12">
        <p className="inline-block rounded-full border border-border/70 px-3 py-1 text-xs">
          {t(locale, "Sites web performants pour business marocains", "مواقع فعالة للشركات المغربية")}
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight sm:text-[2.5rem] md:text-5xl">
          {t(
            locale,
            "On construit des sites qui attirent, rassurent et convertissent via WhatsApp, appel et Google Maps.",
            "نبني مواقع تجذب العملاء وتزيد الثقة وتحوّل الزوار إلى طلبات عبر واتساب والاتصال وخرائط Google."
          )}
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          {t(
            locale,
            "Pour parapharmacies, cliniques, shops, salons et restaurants. Nous sommes un studio 100% en ligne, base a Kenitra, avec focus local avant extension nationale.",
            "للصيدليات والعيادات والمتاجر والصالونات والمطاعم. نحن استوديو 100% أونلاين من القنيطرة مع تركيز محلي أولًا ثم التوسع لباقي المغرب."
          )}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild>
            <Link href={locale === "ar" ? "/ar/contact" : "/fr/contact"}>{t(locale, "Demander un devis", "اطلب عرض سعر")}</Link>
          </Button>
          <Button variant="outline" asChild>
            <a href={`https://wa.me/${siteConfig.whatsappNumber.replace(/\D/g, "")}`}>{t(locale, "WhatsApp us", "راسلنا على واتساب")}</a>
          </Button>
        </div>
      </section>

      <ScrollReveal>
        <StatsSection locale={locale} />
      </ScrollReveal>

      <section className="grid gap-4 md:grid-cols-4">
        {[Smartphone, MapPin, BadgeCheck, Wrench].map((Icon, idx) => (
          <Card key={idx} className="rounded-2xl">
            <CardContent className="p-5">
              <Icon className="h-5 w-5 text-primary" />
              <p className="mt-3 text-sm text-muted-foreground">
                {[
                  t(locale, "Sites rapides et mobile-first", "مواقع سريعة ومناسبة للهاتف"),
                  t(locale, "SEO local et Google Maps", "SEO محلي وخرائط Google"),
                  t(locale, "Commande WhatsApp simplifiee", "طلب سهل عبر واتساب"),
                  t(locale, "Maintenance et securite", "صيانة وأمان مستمر"),
                ][idx]}
              </p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section>
        <h2 className="mb-6 text-3xl font-bold md:text-4xl">{t(locale, "Services", "الخدمات")}</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {services.slice(0, 6).map((service) => (
            <ServiceCard key={service.id} service={service} locale={locale} />
          ))}
        </div>
      </section>

      <ScrollReveal delay={0.1}>
        <section>
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">{t(locale, "Ideal pour", "مناسب لـ")}</h2>
          <div>
            <IndustryBadges />
          </div>
        </section>
      </ScrollReveal>

      <section>
        <h2 className="mb-2 text-3xl font-bold md:text-4xl">{t(locale, "Tarifs", "الأسعار")}</h2>
        <p className="mb-6 text-base text-muted-foreground">
          {t(locale, "Packages clairs en MAD + maintenance mensuelle.", "باقات واضحة بالدرهم مع خطة صيانة شهرية.")}
        </p>
        <div>
          <PricingCards locale={locale} />
        </div>
      </section>

      <ScrollReveal delay={0.2}>
        <section>
          <h2 className="mb-6 text-3xl font-semibold">{t(locale, "Notre processus", "عمليتنا")}</h2>
          <ProcessTimeline locale={locale} />
        </section>
      </ScrollReveal>

      <section>
        <div className="mb-2 flex items-end justify-between">
          <h2 className="text-3xl font-bold md:text-4xl">{t(locale, "Projets pilotes", "مشاريع تجريبية")}</h2>
          <Link href={locale === "ar" ? "/ar/work" : "/work"} className="text-sm text-primary">
            {t(locale, "Voir tout", "عرض الكل")}
          </Link>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          {t(
            locale,
            "Nous sommes nouveaux sur le marche: ces exemples sont des projets pilotes et simulations internes.",
            "نحن جدد في السوق: هذه أمثلة لمشاريع تجريبية ومحاكاة داخلية."
          )}
        </p>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {work.slice(0, 3).map((item) => (
            <Card key={item.slug} className="rounded-2xl">
              <CardHeader>
                <CardTitle>{item.title[locale]}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{item.problem[locale]}</p>
                <Button asChild variant="outline" className="mt-4 w-full">
                  <Link href={(locale === "ar" ? "/ar/work/" : "/fr/work/") + item.slug}>
                    {t(locale, "Voir le projet", "عرض المشروع")}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-2 text-3xl font-bold md:text-4xl">{t(locale, "Retours de projets pilotes", "آراء حول مشاريع تجريبية")}</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {t(
            locale,
            "Retours de tests et d'accompagnements avant nos premiers contrats officiels.",
            "آراء من اختبارات وتجارب قبل أول عقود رسمية."
          )}
        </p>
        <div className="mt-5">
          <TestimonialCarousel items={testimonials} locale={locale} />
        </div>
      </section>

      <section>
        <h2 className="mb-6 text-3xl font-bold md:text-4xl">{t(locale, "FAQ", "الأسئلة الشائعة")}</h2>
        <div>
          <FAQAccordion faqs={faqs} locale={locale} />
        </div>
      </section>

      <CTASection locale={locale} />
    </div>
  );
}

export async function ServicesPage({ locale }: { locale: Locale }) {
  const services = await getServices();
  return (
    <div className="space-y-12">
      <section>
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">{t(locale, "Nos services", "خدماتنا")}</h1>
        <p className="text-base text-muted-foreground md:text-lg">
          {t(
            locale,
            "De la vitrine au e-commerce, avec focus performance, SEO local et conversion WhatsApp.",
            "من المواقع التعريفية إلى المتاجر الإلكترونية مع تركيز على السرعة وSEO المحلي وتحويل واتساب."
          )}
        </p>
      </section>
      <div className="grid gap-4">
        {services.map((service) => (
          <Card key={service.id} className="rounded-2xl">
            <CardHeader>
              <CardTitle>{service.title[locale]}</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 md:grid-cols-3">
              <div>
                <p className="text-sm text-muted-foreground">{service.summary[locale]}</p>
              </div>
              <div>
                <p className="mb-2 text-sm font-medium">{t(locale, "Livrables", "المخرجات")}</p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {service.deliverables[locale].map((item) => (
                    <li key={item}>- {item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm">{t(locale, "Delai", "المدة")}: {service.timeline[locale]}</p>
                <p className="mt-2 text-sm text-muted-foreground">{service.idealFor[locale]}</p>
                <Button asChild className="mt-4">
                  <Link href={locale === "ar" ? "/ar/contact" : "/fr/contact"}>{t(locale, "Nous contacter", "تواصل معنا")}</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>{t(locale, "Integrations paiements au Maroc", "تكاملات الدفع في المغرب")}</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          {t(
            locale,
            "Nous integrons CMI (Maroc Telecommerce), NAPS, Payzone, paiement a la livraison (COD) et commande WhatsApp.",
            "نقوم بدمج CMI وNAPS وPayzone مع الدفع عند الاستلام والطلب عبر واتساب."
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export function PricingPage({ locale }: { locale: Locale }) {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">{t(locale, "Tarifs & packs", "الأسعار والباقات")}</h1>
        <p className="text-base text-muted-foreground md:text-lg">
        {t(
          locale,
          "Plans en MAD alignes au marche marocain (vitrine env. 3 000-15 000 MAD, e-commerce env. 8 000-50 000 MAD selon complexite).",
          "خطط بالدرهم متوافقة مع السوق المغربي (موقع تعريفي تقريبًا 3,000 إلى 15,000 درهم، والمتاجر 8,000 إلى 50,000 حسب التعقيد)."
        )}
        </p>
      </div>
      <PricingCards locale={locale} />
      <div className="pt-8">
        <h2 className="mb-4 text-2xl font-semibold">{t(locale, "Comparaison détaillée", "مقارنة تفصيلية")}</h2>
        <PricingTable locale={locale} />
      </div>
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>{t(locale, "Maintenance mensuelle", "الصيانة الشهرية")}</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          {t(locale, "A partir de 600 MAD/mois: securite, backups, monitoring, petites evolutions.", "ابتداء من 600 درهم/شهر: أمان ونسخ احتياطي ومراقبة وتطويرات بسيطة.")}
        </CardContent>
      </Card>
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>{t(locale, "Add-ons", "إضافات")}</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Google Business Profile, FR/AR multilingue, copywriting, shooting photo partenaire, landing pages ads.
        </CardContent>
      </Card>
      <FAQAccordion
        locale={locale}
        faqs={[
          {
            id: "pay-1",
            question: { fr: "Modalites de paiement", ar: "شروط الدفع" },
            answer: {
              fr: "Generalement 50% upfront, 30% a la validation, 20% au lancement.",
              ar: "عادة 50% مقدمًا، 30% عند الاعتماد، 20% عند الإطلاق.",
            },
          },
        ]}
      />
      <CTASection locale={locale} />
    </div>
  );
}

export async function WorkPage({ locale }: { locale: Locale }) {
  const work = await getCaseStudies();
  return (
    <div className="space-y-10">
      <div>
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">{t(locale, "Projets pilotes", "مشاريع تجريبية")}</h1>
        <p className="text-base text-muted-foreground">
        {t(
          locale,
          "Nous sommes une nouvelle structure: ces cas montrent notre methode de travail sur des projets pilotes.",
          "نحن هيكل جديد: هذه الحالات توضح منهجية العمل لدينا عبر مشاريع تجريبية."
        )}
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {work.map((item) => (
          <Card key={item.slug} className="rounded-2xl">
            <CardHeader>
              <CardTitle>{item.title[locale]}</CardTitle>
              <p className="text-sm text-muted-foreground">{item.clientType[locale]} - {item.city}</p>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{item.solution[locale]}</p>
              <Button asChild className="mt-4 w-full">
                <Link href={(locale === "ar" ? "/ar/work/" : "/fr/work/") + item.slug}>{t(locale, "Voir le projet", "عرض المشروع")}</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export async function WorkDetailPage({ locale, slug }: { locale: Locale; slug: string }) {
  const work = await getCaseStudies();
  const item = work.find((entry) => entry.slug === slug);
  if (!item) return null;

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-semibold">{item.title[locale]}</h1>
      <p className="text-muted-foreground">{item.clientType[locale]} - {item.city}</p>
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>{t(locale, "Probleme", "المشكل")}</CardTitle>
        </CardHeader>
        <CardContent>{item.problem[locale]}</CardContent>
      </Card>
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>{t(locale, "Solution", "الحل")}</CardTitle>
        </CardHeader>
        <CardContent>{item.solution[locale]}</CardContent>
      </Card>
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>{t(locale, "Resultats", "النتائج")}</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {item.results[locale].map((result) => (
              <li key={result}>- {result}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <CTASection locale={locale} />
    </div>
  );
}

export async function BlogPage({ locale }: { locale: Locale }) {
  const posts = await getBlogPosts();
  return (
    <div className="space-y-10">
      <h1 className="text-4xl font-bold md:text-5xl">Blog</h1>
      <div className="grid gap-4 md:grid-cols-3">
        {posts.map((post) => (
          <Card key={post.slug} className="rounded-2xl">
            <CardHeader>
              <CardTitle>{post.title[locale]}</CardTitle>
              <p className="text-xs text-muted-foreground">{post.date}</p>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{post.excerpt[locale]}</p>
              <Button asChild variant="outline" className="mt-4 w-full">
                <Link href={(locale === "ar" ? "/ar/blog/" : "/fr/blog/") + post.slug}>
                  {t(locale, "Lire l'article", "قراءة المقال")}
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export async function BlogDetailPage({ locale, slug }: { locale: Locale; slug: string }) {
  const posts = await getBlogPosts();
  const post = posts.find((entry) => entry.slug === slug);
  if (!post) return null;

  return (
    <article className="prose prose-neutral max-w-3xl dark:prose-invert">
      <h1>{post.title[locale]}</h1>
      <p>{post.content[locale]}</p>
      <CTASection locale={locale} />
    </article>
  );
}

export function AboutPage({ locale }: { locale: Locale }) {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">{t(locale, "A propos du studio", "من نحن")}</h1>
        <p className="text-base text-muted-foreground md:text-lg">
        {t(
          locale,
          "Nous sommes un nouveau studio marocain, 100% en ligne, base a Kenitra. On priorise vitesse, SEO local et experience mobile.",
          "نحن استوديو مغربي جديد 100% أونلاين من القنيطرة. نركز على السرعة وSEO المحلي وتجربة الهاتف."
        )}
        </p>
      </div>
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>{t(locale, "Transparence", "الشفافية")}</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          {t(
            locale,
            "Nous n'avons pas encore de portefeuille de clients officiels. Nous demarrons avec des projets pilotes solides et une approche execution-first.",
            "لا نملك بعد محفظة عملاء رسمية. ننطلق بمشاريع تجريبية قوية ونهج عملي يركز على التنفيذ."
          )}
        </CardContent>
      </Card>
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>{t(locale, "Pourquoi WhatsApp-first au Maroc", "لماذا WhatsApp-first في المغرب")}</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          {t(locale, "Parce que les clients veulent reponse immediate, confiance et confirmation rapide.", "لأن العملاء يريدون ردًا فوريًا وثقة وتأكيدًا سريعًا.")}
        </CardContent>
      </Card>
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Founder 1</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">Product & Growth</CardContent>
        </Card>
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Founder 2</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">Design & Engineering</CardContent>
        </Card>
      </div>
    </div>
  );
}

export function ContactPage({ locale }: { locale: Locale }) {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">{t(locale, "Contact", "اتصل بنا")}</h1>
        <p className="text-base text-muted-foreground md:text-lg">
        {t(
          locale,
          `Le moyen le plus rapide reste WhatsApp: ${siteConfig.phone}. Studio en ligne base a Kenitra.`,
          `أسرع وسيلة للتواصل هي واتساب: ${siteConfig.phone}. نحن استوديو أونلاين من القنيطرة.`
        )}
        </p>
      </div>
      <ContactForm locale={locale} />
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>{t(locale, "WhatsApp / Telephone", "واتساب / هاتف")}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">{siteConfig.phone}</CardContent>
        </Card>
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>{t(locale, "Ville", "المدينة")}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">{t(locale, "Kénitra (online)", "القنيطرة (أونلاين)")}</CardContent>
        </Card>
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Instagram</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            {t(locale, "Page en cours de creation.", "الصفحة قيد الإنشاء.")}
          </CardContent>
        </Card>
      </div>
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>{t(locale, "Local SEO", "SEO محلي")}</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          {t(locale, "Nous optimisons aussi votre Google Business Profile, citations locales et gestion des avis.", "نقوم أيضًا بتحسين Google Business Profile والإدراجات المحلية وإدارة التقييمات.")}
        </CardContent>
      </Card>
      <iframe
        title="Morocco map"
        src={siteConfig.mapEmbedUrl}
        className="h-72 w-full rounded-2xl border border-border"
        loading="lazy"
      />
    </div>
  );
}

export function PrivacyPage({ locale }: { locale: Locale }) {
  return (
    <div className="space-y-4">
      <h1 className="text-4xl font-semibold">{t(locale, "Politique de confidentialite", "سياسة الخصوصية")}</h1>
      <p className="text-muted-foreground">
        {t(locale, "Nous collectons seulement les donnees necessaires au traitement de votre demande.", "نجمع فقط البيانات الضرورية لمعالجة طلبك.")}
      </p>
      <p className="text-sm text-muted-foreground">
        {t(locale, "Analytics passe par Cloudflare Zaraz selon votre consentement.", "التحليلات تمر عبر Cloudflare Zaraz حسب موافقتك.")}
      </p>
    </div>
  );
}

export function TermsPage({ locale }: { locale: Locale }) {
  return (
    <div className="space-y-4">
      <h1 className="text-4xl font-semibold">{t(locale, "Conditions d'utilisation", "شروط الاستخدام")}</h1>
      <p className="text-muted-foreground">
        {t(locale, "Les prestations sont confirmees par devis signe. Delais et livrables sont precises contractuellement.", "يتم تأكيد الخدمات بعرض سعر موقع، مع تحديد المدة والمخرجات تعاقديًا.")}
      </p>
      <p className="text-sm text-muted-foreground">
        {t(locale, "Acompte standard: 50% au demarrage.", "الدفعة المسبقة القياسية: 50% عند الانطلاق.")}
      </p>
    </div>
  );
}

export async function AllSlugs() {
  const [work, blog] = await Promise.all([getCaseStudies(), getBlogPosts()]);
  return {
    work: work.map((item) => item.slug),
    blog: blog.map((item) => item.slug),
  };
}
