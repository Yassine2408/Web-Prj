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
    default: "Atlas Web Studio المغرب",
    template: "%s | Atlas Web Studio",
  },
  description:
    "استوديو ويب جديد أونلاين من القنيطرة (المغرب): مواقع سريعة وSEO محلي وطلبات واتساب وصيانة مستمرة.",
  verification: {
    google: "cxSfIienqWNucOVOR69_PB4kS4uaB7T2PSrx_G0UTMQ",
  },
  openGraph: {
    title: "Atlas Web Studio المغرب",
    description:
      "استوديو رقمي أونلاين في القنيطرة: مواقع موجهة للتحويل للبارافارماسيات والعيادات والمتاجر والمطاعم والصالونات.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://web-prj-flame.vercel.app",
    siteName: "Atlas Web Studio",
    locale: "ar_MA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Atlas Web Studio المغرب",
    description: "استوديو ويب أونلاين في القنيطرة: مواقع سريعة وSEO محلي وطلبات واتساب.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
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
