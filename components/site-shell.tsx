import { Footer } from "@/components/footer";
import { MobileStickyBar } from "@/components/mobile-sticky-bar";
import { Navbar } from "@/components/navbar";
import { StickyWhatsAppButton } from "@/components/sticky-whatsapp-button";
import type { Locale } from "@/lib/types";

export function SiteShell({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  return (
    <div className={locale === "ar" ? "rtl" : ""}>
      <Navbar locale={locale} />
      <main className="mx-auto w-full max-w-[1400px] px-3 py-8 pb-24 sm:px-5 md:pb-10 lg:px-8">{children}</main>
      <Footer locale={locale} />
      <StickyWhatsAppButton />
      <MobileStickyBar locale={locale} />
    </div>
  );
}
