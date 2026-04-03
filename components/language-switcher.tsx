"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Languages } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
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

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const frPath = toFrenchPath(pathname);
  const arPath = toArabicPath(pathname);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" aria-label="Switch language">
          <Languages className="mr-2 h-4 w-4" />
          {locale === "ar" ? "AR" : "FR"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href={frPath}>Francais</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={arPath}>العربية</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
