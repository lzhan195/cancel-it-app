import { z } from 'zod'
import type { Subscription } from './mock-data'

const SubscriptionInputSchema = z.object({
  merchant: z.string(),
  category: z.string(),
  amount: z.number(),
  cadence: z.enum(['monthly', 'annual', 'weekly']),
  lastChargedOn: z.string(),
  isFreeTrial: z.boolean(),
  trialEndsOn: z.string().optional(),
  confidence: z.number().min(0).max(1),
  cancelEmailGuess: z.string(),
})

export const ExtractionSchema = z.object({
  subscriptions: z.array(SubscriptionInputSchema),
})

export type SubscriptionInput = z.infer<typeof SubscriptionInputSchema>

export function annualize(amount: number, cadence: 'monthly' | 'annual' | 'weekly'): number {
  if (cadence === 'monthly') return Math.round(amount * 12 * 100) / 100
  if (cadence === 'weekly') return Math.round(amount * 52 * 100) / 100
  return amount // annual
}

export function toSubscription(input: SubscriptionInput): Subscription {
  return {
    ...input,
    id: `ai-${crypto.randomUUID()}`,
    annualCost: annualize(input.amount, input.cadence),
  }
}
