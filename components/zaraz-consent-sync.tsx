"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    zaraz?: {
      set: (key: string, value: string) => void;
      consent: {
        set: (value: { analytics?: boolean; marketing?: boolean }) => void;
      };
    };
  }
}

export function ZarazConsentSync() {
  useEffect(() => {
    const consent = window.localStorage.getItem("analytics-consent");
    if (!window.zaraz || !consent) return;
    const granted = consent === "granted";
    window.zaraz.set("analytics_consent", consent);
    window.zaraz.consent.set({ analytics: granted, marketing: false });
  }, []);

  return null;
}
