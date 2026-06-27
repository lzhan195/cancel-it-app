import type { Subscription } from './mock-data'
import { MOCK_SUBSCRIPTIONS } from './mock-data'
import { getSupabaseClient } from './supabase'

// In-memory store seeded with mock data so cancel/remind always resolve demo ids
const memoryStore = new Map<string, Subscription>(
  MOCK_SUBSCRIPTIONS.map((s) => [s.id, s])
)

const reminderStore = new Map<string, { subscriptionId: string; remindOn: string }>()

export async function saveSubscriptions(subs: Subscription[]): Promise<void> {
  // Always update in-memory store
  for (const s of subs) {
    memoryStore.set(s.id, s)
  }

  const db = getSupabaseClient()
  if (db) {
    await db.from('subscriptions').upsert(
      subs.map((s) => ({ id: s.id, data: s }))
    )
  }
}

export async function getSubscription(id: string): Promise<Subscription | undefined> {
  // Try in-memory first
  const mem = memoryStore.get(id)
  if (mem) return mem

  const db = getSupabaseClient()
  if (db) {
    const { data } = await db
      .from('subscriptions')
      .select('data')
      .eq('id', id)
      .single()
    if (data?.data) {
      const sub = data.data as Subscription
      memoryStore.set(id, sub)
      return sub
    }
  }

  return undefined
}

export async function saveReminder(
  subscriptionId: string,
  remindOn: string
): Promise<void> {
  reminderStore.set(subscriptionId, { subscriptionId, remindOn })

  const db = getSupabaseClient()
  if (db) {
    await db.from('reminders').insert({ subscription_id: subscriptionId, remind_on: remindOn })
  }
}
