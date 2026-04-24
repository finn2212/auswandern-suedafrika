// Contact form endpoint. Accepts JSON body, validates, and (eventually)
// forwards to an email provider like Resend. For now, logs the submission
// server-side and returns success — this lets the frontend flow work while
// mail delivery is being set up.
//
// Schema:
//   { name: string; email: string; subject?: string; message: string; website?: string }
//
// The `website` field is a honeypot — if it's non-empty, the request is
// silently dropped (bots fill all fields).

import { z } from 'zod'

const schema = z.object({
  name: z.string().trim().min(2, 'Bitte gib deinen Namen an.').max(120),
  email: z.string().trim().email('Bitte gib eine gültige E-Mail-Adresse an.').max(200),
  subject: z.string().trim().max(200).optional().default(''),
  message: z.string().trim().min(10, 'Die Nachricht sollte mindestens 10 Zeichen haben.').max(5000),
  website: z.string().optional(), // honeypot
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    const first = parsed.error.issues[0]
    throw createError({
      statusCode: 400,
      statusMessage: first?.message ?? 'Ungültige Eingabe.',
    })
  }

  const data = parsed.data

  // Honeypot — silently accept + discard
  if (data.website && data.website.trim().length > 0) {
    return { ok: true }
  }

  // TODO: forward to Resend once RESEND_API_KEY is set
  // const resendKey = process.env.RESEND_API_KEY
  // if (resendKey) { await sendViaResend(data, resendKey) }

  // For now, log on server so Laura & Finn see submissions during dev
  // eslint-disable-next-line no-console
  console.log('[contact]', {
    receivedAt: new Date().toISOString(),
    name: data.name,
    email: data.email,
    subject: data.subject,
    messagePreview: data.message.slice(0, 160),
    ip: getRequestIP(event, { xForwardedFor: true }),
  })

  return { ok: true }
})
