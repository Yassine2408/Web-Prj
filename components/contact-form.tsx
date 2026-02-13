"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toWhatsAppLink } from "@/lib/site-config";
import { sendLeadEmail } from "@/app/actions/contact";
import type { Locale } from "@/lib/types";

const formSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(6),
  city: z.string().min(2),
  businessType: z.string().min(2),
  packageInterest: z.string().min(2),
  message: z.string().min(10),
});

type FormValues = z.infer<typeof formSchema>;

const defaults: FormValues = {
  name: "",
  phone: "",
  city: "",
  businessType: "",
  packageInterest: "Business",
  message: "",
};

export function ContactForm({ locale }: { locale: Locale }) {
  const isAr = locale === "ar";
  const [status, setStatus] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaults,
  });

  const buildMessage = (values: FormValues) =>
    [
      "Bonjour Atlas Web Studio,",
      `Nom: ${values.name}`,
      `Telephone: ${values.phone}`,
      `Ville: ${values.city}`,
      `Type business: ${values.businessType}`,
      `Pack interesse: ${values.packageInterest}`,
      `Message: ${values.message}`,
    ].join("\n");

  const onWhatsApp = form.handleSubmit((values) => {
    setStatus(isAr ? "فتح واتساب..." : "Ouverture WhatsApp...");
    setTimeout(() => {
      window.open(toWhatsAppLink(buildMessage(values)), "_blank");
      setStatus("");
    }, 300);
  });

  const onEmail = form.handleSubmit((values) => {
    startTransition(async () => {
      setStatus(isAr ? "جاري الإرسال..." : "Envoi en cours...");
      const result = await sendLeadEmail(values);
      setStatus(result.ok ? (isAr ? "✓ تم الإرسال بنجاح." : "✓ Demande envoyee avec succes.") : (result.error || "Erreur"));
    });
  });

  return (
    <form className="space-y-4 rounded-2xl border border-border/70 p-5">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">{isAr ? "الاسم" : "Nom"}</Label>
          <Input id="name" {...form.register("name")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">{isAr ? "الهاتف" : "Telephone"}</Label>
          <Input id="phone" {...form.register("phone")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="city">{isAr ? "المدينة" : "Ville"}</Label>
          <Input id="city" {...form.register("city")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="businessType">{isAr ? "نوع النشاط" : "Type de business"}</Label>
          <Input id="businessType" {...form.register("businessType")} />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="packageInterest">{isAr ? "الباقة المهتم بها" : "Pack interesse"}</Label>
        <Input id="packageInterest" {...form.register("packageInterest")} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">{isAr ? "الرسالة" : "Message"}</Label>
        <Textarea id="message" {...form.register("message")} />
      </div>
      <div className="flex flex-wrap gap-3">
        <Button type="button" onClick={onWhatsApp}>
          {isAr ? "إرسال عبر واتساب" : "Envoyer via WhatsApp"}
        </Button>
        <Button type="button" variant="outline" onClick={onEmail} disabled={isPending}>
          {isAr ? "إرسال عبر البريد" : "Envoyer par email"}
        </Button>
      </div>
      {status ? <p className="text-sm text-muted-foreground">{status}</p> : null}
    </form>
  );
}
