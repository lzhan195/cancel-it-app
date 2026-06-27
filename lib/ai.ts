import { generateObject } from 'ai'
import { createAnthropic } from '@ai-sdk/anthropic'
import { SORTED_MOCK_SUBSCRIPTIONS } from './mock-data'
import { ExtractionSchema, toSubscription } from './subscriptions'

export async function extractSubscriptions(statement: string) {
  if (!process.env.ANTHROPIC_API_KEY || !statement || statement.trim().length < 20) {
    return SORTED_MOCK_SUBSCRIPTIONS
  }

  const provider = createAnthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  const modelId = process.env.AI_MODEL ?? 'claude-sonnet-4-6'

  const { object } = await generateObject({
    model: provider(modelId),
    schema: ExtractionSchema,
    system: `You extract ONLY recurring subscription charges from bank/credit-card statements.

Rules:
- EXCLUDE one-time purchases, groceries, gas stations, restaurants, rideshare (Uber/Lyft), and utilities.
- Clean merchant names: "NETFLIX.COM" → "Netflix", "SPOTIFY USA" → "Spotify".
- Detect free trials: set isFreeTrial=true and estimate trialEndsOn (YYYY-MM-DD) when possible.
- Guess a plausible cancellation email for each merchant (e.g. support@merchant.com).
- Assign a confidence score 0–1 for each subscription.
- cadence must be one of: monthly, annual, weekly.`,
    prompt: statement,
  })

  return object.subscriptions
    .map(toSubscription)
    .sort((a, b) => b.annualCost - a.annualCost)
}
