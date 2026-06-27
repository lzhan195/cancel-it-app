import { NextRequest, NextResponse } from 'next/server'
import { getSubscription } from '@/lib/store'
import { sendCancellation } from '@/lib/email'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const sub = await getSubscription(body.subscriptionId)

  if (!sub) {
    return NextResponse.json({ error: 'Subscription not found' }, { status: 404 })
  }

  const { via } = await sendCancellation(sub)
  return NextResponse.json({ ok: true, subscriptionId: sub.id, via })
}
