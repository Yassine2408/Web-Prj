import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function StickyWhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${siteConfig.whatsappNumber.replace(/\D/g, "")}`}
      className="fixed bottom-20 right-4 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-600 text-white shadow-lg hover:bg-green-700 md:bottom-6 md:h-12 md:w-auto md:px-4"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-5 w-5 md:mr-2 md:h-4 md:w-4" />
      <span className="hidden md:inline">WhatsApp</span>
    </a>
  );
}
