/**
 * Single source of truth for how the site can be reached.
 *
 * Only fields that are real go here. `phone` and `whatsapp` are null until
 * a real number is confirmed — components must check for null and simply
 * not render that contact method rather than inventing one. See the
 * open questions from the Stage 1 audit (contact channels to publish).
 */
export const contact = {
  email: "contact@awoken.in",
  /** E.164, no spaces, e.g. "+919876543210". Null = not published yet. */
  phone: null as string | null,
  /** WhatsApp number, digits only (no "+"), e.g. "919876543210". Null = not published yet. */
  whatsapp: null as string | null,
} as const

export function mailtoHref(subject?: string): string {
  return subject ? `mailto:${contact.email}?subject=${encodeURIComponent(subject)}` : `mailto:${contact.email}`
}

export function telHref(): string | undefined {
  return contact.phone ? `tel:${contact.phone.replace(/[^\d+]/g, "")}` : undefined
}

export function whatsappHref(message?: string): string | undefined {
  if (!contact.whatsapp) return undefined
  const base = `https://wa.me/${contact.whatsapp}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}
