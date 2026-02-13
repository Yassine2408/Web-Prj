import Image from "next/image";
import Link from "next/link";
import { MessageCircle, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";
import { MobileNav } from "@/components/mobile-nav";
import { navLinks, siteConfig } from "@/lib/site-config";
import type { Locale } from "@/lib/types";

export function Navbar({ locale }: { locale: Locale }) {
  const links = navLinks(locale);
  const contactHref = locale === "ar" ? "/ar/contact" : "/contact";
  const logoUrl = process.env.NEXT_PUBLIC_LOGO_URL;
  const hasLocalLogo = Boolean(logoUrl && logoUrl.startsWith("/"));

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-[1400px] items-center justify-between px-3 sm:h-16 sm:px-5 lg:px-8">
        <Link href={locale === "ar" ? "/ar" : "/"} className="flex items-center gap-2 font-semibold tracking-tight">
          {hasLocalLogo ? (
            <Image
              src={logoUrl!}
              alt={siteConfig.name}
              width={170}
              height={48}
              className="h-8 w-auto object-contain sm:h-9"
              priority
            />
          ) : null}
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-sm font-extrabold text-transparent whitespace-nowrap">
            {siteConfig.name}
          </span>
        </Link>
        <nav className="hidden items-center gap-4 text-sm lg:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-muted-foreground hover:text-foreground">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="hidden lg:block">
            <LanguageSwitcher locale={locale} />
          </div>
          <div className="hidden lg:block">
            <ThemeToggle />
          </div>
          <MobileNav locale={locale} />
          <Button asChild className="hidden lg:inline-flex">
            <Link href={contactHref}>{locale === "ar" ? "اطلب عرض سعر" : "Demander un devis"}</Link>
          </Button>
          <Button asChild variant="outline" className="hidden xl:inline-flex">
            <a href={`https://wa.me/${siteConfig.whatsappNumber.replace(/\D/g, "")}`}>
              <MessageCircle className="mr-2 h-4 w-4" />
              WhatsApp
            </a>
          </Button>
          <Button asChild variant="outline" className="hidden xl:inline-flex">
            <a href={`tel:${siteConfig.phone}`}>
              <PhoneCall className="mr-2 h-4 w-4" />
              {locale === "ar" ? "اتصل بنا" : "Appeler"}
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
