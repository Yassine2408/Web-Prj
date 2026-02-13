"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Moon, Sun, Languages } from "lucide-react";
import { useTheme } from "next-themes";
import { navLinks } from "@/lib/site-config";
import type { Locale } from "@/lib/types";

function toArabicPath(pathname: string) {
  if (pathname === "/" || pathname === "/fr") return "/ar";
  if (pathname.startsWith("/ar")) return pathname;
  if (pathname.startsWith("/fr/")) return pathname.replace("/fr", "/ar");
  if (pathname.startsWith("/fr")) return pathname.replace("/fr", "/ar");
  return `/ar${pathname}`;
}

function toFrenchPath(pathname: string) {
  if (pathname === "/" || pathname === "/ar") return "/fr";
  if (pathname.startsWith("/fr")) return pathname;
  if (pathname.startsWith("/ar/")) return pathname.replace("/ar", "/fr");
  if (pathname.startsWith("/ar")) return pathname.replace("/ar", "/fr");
  return `/fr${pathname}`;
}

export function MobileNav({ locale }: { locale: Locale }) {
  const [isOpen, setIsOpen] = useState(false);
  const links = navLinks(locale);
  const { setTheme, resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const pathname = usePathname();
  const frPath = toFrenchPath(pathname);
  const arPath = toArabicPath(pathname);

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-foreground"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {isOpen && (
        <div className="fixed inset-x-0 top-14 z-50 border-b border-border bg-background shadow-lg sm:top-16">
          <nav className="flex flex-col px-4 py-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-medium hover:bg-muted"
              >
                {link.label}
              </Link>
            ))}
            
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className="flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium hover:bg-muted"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              <span>{isDark ? "Mode clair" : "Mode sombre"}</span>
            </button>

            {/* Language Switcher */}
            <div className="border-t border-border/70 pt-3">
              <div className="flex items-center gap-2 px-3 pb-2">
                <Languages className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs font-medium text-muted-foreground">
                  {locale === "ar" ? "اللغة" : "Langue"}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 px-3">
                <Link
                  href={frPath}
                  onClick={() => setIsOpen(false)}
                  className={`rounded-lg px-3 py-2 text-center text-sm font-medium ${
                    locale === "fr"
                      ? "bg-primary text-primary-foreground"
                      : "border border-border hover:bg-muted"
                  }`}
                >
                  Français
                </Link>
                <Link
                  href={arPath}
                  onClick={() => setIsOpen(false)}
                  className={`rounded-lg px-3 py-2 text-center text-sm font-medium ${
                    locale === "ar"
                      ? "bg-primary text-primary-foreground"
                      : "border border-border hover:bg-muted"
                  }`}
                >
                  العربية
                </Link>
              </div>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
