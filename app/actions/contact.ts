"use server";

import { z } from "zod";
import { Resend } from "resend";

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

  const contactEmail = process.env.CONTACT_EMAIL_TO || "sitara.kenitra@gmail.com";
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.CONTACT_EMAIL_FROM || "Sitara Leads <onboarding@resend.dev>",
      to: [contactEmail],
      subject: `Nouveau lead: ${parsed.data.name}`,
      text: Object.entries(parsed.data)
        .map(([k, v]) => `${k}: ${v}`)
        .join("\n"),
    });

    if (error) {
      return { ok: false, error: `Resend error: ${error.message}` };
    }

    if (!data?.id) {
      return { ok: false, error: "Email provider did not confirm message delivery." };
    }

    return { ok: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown email error";
    return { ok: false, error: `Send failed: ${message}` };
  }
}
