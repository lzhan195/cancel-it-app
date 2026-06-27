import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()
  // Replace with a real Resend call to schedule the trial reminder email.
  return NextResponse.json({ ok: true, subscriptionId: body.subscriptionId, via: 'resend' })
}
