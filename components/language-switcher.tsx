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
  if (pathname === "/") return "/ar";
  if (pathname.startsWith("/ar")) return pathname;
  return `/ar${pathname}`;
}

function toFrenchPath(pathname: string) {
  if (pathname === "/ar") return "/";
  if (pathname.startsWith("/ar/")) return pathname.replace("/ar", "");
  return pathname;
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
