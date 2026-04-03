"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const isDark = resolvedTheme === "dark";

  if (!isClient) {
    return (
      <Button variant="outline" size="sm" aria-label="Toggle theme">
        <span className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      size="sm"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  );
}
