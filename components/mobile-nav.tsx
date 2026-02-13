"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { navLinks } from "@/lib/site-config";
import type { Locale } from "@/lib/types";

export function MobileNav({ locale }: { locale: Locale }) {
  const [isOpen, setIsOpen] = useState(false);
  const links = navLinks(locale);
  const { setTheme, resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

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
          </nav>
        </div>
      )}
    </div>
  );
}
