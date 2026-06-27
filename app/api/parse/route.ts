import { NextResponse } from 'next/server'
import { SORTED_MOCK_SUBSCRIPTIONS } from '@/lib/mock-data'

export async function POST() {
  // When no real backend is wired up, return mock data.
  // Replace this with a real Claude call to parse the statement.
  await new Promise((r) => setTimeout(r, 800))
  return NextResponse.json({ subscriptions: SORTED_MOCK_SUBSCRIPTIONS })
}
