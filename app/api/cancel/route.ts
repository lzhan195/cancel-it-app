import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()
  // Replace with a real Resend call to send the cancellation email.
  return NextResponse.json({ ok: true, subscriptionId: body.subscriptionId, via: 'resend' })
}
