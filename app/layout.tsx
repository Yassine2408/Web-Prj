import type { Metadata } from "next";
import { Cairo, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { CookieConsent } from "@/components/cookie-consent";
import { LocalBusinessSchema } from "@/components/local-business-schema";
import { ZarazConsentSync } from "@/components/zaraz-consent-sync";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://web-prj-flame.vercel.app"),
  title: {
    default: "Atlas Web Studio Maroc",
    template: "%s | Atlas Web Studio",
  },
  description:
    "Nouveau studio web en ligne base a Kenitra (Maroc): sites rapides, SEO local Google Maps, commandes WhatsApp et maintenance continue.",
  verification: {
    google: "cxSfIienqWNucOVOR69_PB4kS4uaB7T2PSrx_G0UTMQ",
  },
  openGraph: {
    title: "Atlas Web Studio Maroc",
    description:
      "Studio digital en ligne a Kenitra: sites conversion-first pour parapharmacies, cliniques, commerces, restaurants et salons.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://web-prj-flame.vercel.app",
    siteName: "Atlas Web Studio",
    locale: "fr_MA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Atlas Web Studio Maroc",
    description: "Studio web en ligne a Kenitra: sites rapides, SEO local et commandes WhatsApp.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${inter.variable} ${cairo.variable} antialiased`}>
        <ThemeProvider>
          <LocalBusinessSchema />
          <ZarazConsentSync />
          {children}
          <CookieConsent />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
