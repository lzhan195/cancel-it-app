import { NextRequest, NextResponse } from 'next/server'
import { getSubscription, saveReminder } from '@/lib/store'
import { sendReminderConfirmation } from '@/lib/email'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const sub = await getSubscription(body.subscriptionId)

  if (!sub) {
    return NextResponse.json({ error: 'Subscription not found' }, { status: 404 })
  }

  let remindOn: string
  if (sub.trialEndsOn) {
    const d = new Date(sub.trialEndsOn)
    d.setDate(d.getDate() - 2)
    remindOn = d.toISOString().split('T')[0]
  } else {
    remindOn = new Date().toISOString().split('T')[0]
  }

  await saveReminder(sub.id, remindOn)
  const { via } = await sendReminderConfirmation(sub, remindOn)

  return NextResponse.json({ ok: true, subscriptionId: sub.id, remindOn, via })
}
