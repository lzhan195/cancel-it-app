import { NextRequest, NextResponse } from 'next/server'
import { extractSubscriptions } from '@/lib/ai'
import { saveSubscriptions } from '@/lib/store'
import * as Sentry from '@sentry/nextjs'

export const runtime = 'nodejs'
export const maxDuration = 60

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    const statement = body.statement ?? ''

    const subscriptions = await extractSubscriptions(statement)
    await saveSubscriptions(subscriptions)

    return NextResponse.json({ subscriptions })
  } catch (err) {
    Sentry.captureException(err)
    return NextResponse.json({ error: 'Parse failed' }, { status: 500 })
  }
}
