import { Resend } from 'resend'
import type { Subscription } from './mock-data'
import { buildCancelEmail } from './mock-data'

let _resend: Resend | null = null

function getResend(): Resend | null {
  if (!process.env.RESEND_API_KEY) return null
  if (!_resend) _resend = new Resend(process.env.RESEND_API_KEY)
  return _resend
}

const FROM = 'Cancel-It <noreply@cancel-it.app>'

function getTo(): string {
  return process.env.NOTIFY_EMAIL ?? 'demo@cancel-it.app'
}

export async function sendCancellation(sub: Subscription): Promise<{ via: string }> {
  const html = buildCancelEmail(sub)
  const subject = `Cancel ${sub.merchant} subscription`
  const resend = getResend()

  if (!resend) {
    console.log('[Email Preview]', { to: getTo(), subject })
    return { via: 'preview' }
  }

  await resend.emails.send({ from: FROM, to: getTo(), subject, html })
  return { via: 'resend' }
}

export async function sendReminderConfirmation(
  sub: Subscription,
  remindOn: string
): Promise<{ via: string }> {
  const subject = `Reminder set: Cancel ${sub.merchant} before ${remindOn}`
  const html = `<!DOCTYPE html>
<html><body style="font-family:sans-serif;color:#18181b;max-width:560px;margin:0 auto;padding:24px;">
  <p>Hi there,</p>
  <p>We'll remind you to cancel your <strong>${sub.merchant}</strong> subscription before <strong>${remindOn}</strong>.</p>
  <p>Current billing: $${sub.amount}/${sub.cadence}</p>
  <p>&mdash; Cancel-It</p>
</body></html>`

  const resend = getResend()
  if (!resend) {
    console.log('[Email Preview]', { to: getTo(), subject })
    return { via: 'preview' }
  }

  await resend.emails.send({ from: FROM, to: getTo(), subject, html })
  return { via: 'resend' }
}
