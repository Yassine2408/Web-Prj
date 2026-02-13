import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function StickyWhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${siteConfig.whatsappNumber.replace(/\D/g, "")}`}
      className="fixed bottom-6 right-4 z-40 hidden h-12 items-center rounded-full bg-green-600 px-4 text-sm font-semibold text-white shadow-lg hover:bg-green-700 md:inline-flex"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="mr-2 h-4 w-4" />
      WhatsApp
    </a>
  );
}
