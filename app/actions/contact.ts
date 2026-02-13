"use server";

import { z } from "zod";
import { Resend } from "resend";
import { siteConfig } from "@/lib/site-config";

const schema = z.object({
  name: z.string().min(2),
  phone: z.string().min(6),
  city: z.string().min(2),
  businessType: z.string().min(2),
  packageInterest: z.string().min(2),
  message: z.string().min(10),
});

export async function sendLeadEmail(input: z.infer<typeof schema>) {
  const parsed = schema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Invalid form data" };
  if (!process.env.RESEND_API_KEY) return { ok: false, error: "Email service not configured" };

  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({
    from: process.env.CONTACT_EMAIL_FROM || "Atlas Leads <onboarding@resend.dev>",
    to: [siteConfig.email],
    subject: `Nouveau lead: ${parsed.data.name}`,
    text: Object.entries(parsed.data)
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n"),
  });

  return { ok: true };
}
