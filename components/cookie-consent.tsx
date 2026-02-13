"use client";

import { useState, useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";

export function CookieConsent() {
  const [dismissed, setDismissed] = useState(false);
  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  if (!isClient) return null;
  const hasConsentChoice = Boolean(window.localStorage.getItem("analytics-consent"));
  if (dismissed || hasConsentChoice) return null;

  return (
    <div className="fixed inset-x-4 bottom-4 z-50 rounded-2xl border border-border bg-background p-4 shadow-xl md:left-auto md:max-w-md">
      <p className="text-sm">
        Nous utilisons des cookies limités pour mesurer les performances (Zaraz + GA4) uniquement avec votre accord.
      </p>
      <div className="mt-3 flex gap-2">
        <Button
          size="sm"
          onClick={() => {
            window.localStorage.setItem("analytics-consent", "granted");
            setDismissed(true);
          }}
        >
          Accepter
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            window.localStorage.setItem("analytics-consent", "denied");
            setDismissed(true);
          }}
        >
          Refuser
        </Button>
      </div>
    </div>
  );
}
