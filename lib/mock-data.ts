export type Cadence = 'monthly' | 'annual' | 'weekly'

export interface Subscription {
  id: string
  merchant: string
  category: string
  amount: number
  cadence: Cadence
  lastChargedOn: string
  isFreeTrial: boolean
  trialEndsOn?: string
  confidence: number
  annualCost: number
  cancelEmailGuess: string
}

function daysFromNow(days: number): string {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return d.toISOString().split('T')[0]
}

function daysAgo(days: number): string {
  const d = new Date()
  d.setDate(d.getDate() - days)
  return d.toISOString().split('T')[0]
}

export const MOCK_SUBSCRIPTIONS: Subscription[] = [
  {
    id: '1',
    merchant: 'Adobe Creative Cloud',
    category: 'Software',
    amount: 59.99,
    cadence: 'monthly',
    lastChargedOn: daysAgo(3),
    isFreeTrial: false,
    confidence: 0.99,
    annualCost: 719.88,
    cancelEmailGuess: 'support@adobe.com',
  },
  {
    id: '2',
    merchant: 'Peloton',
    category: 'Fitness',
    amount: 44.0,
    cadence: 'monthly',
    lastChargedOn: daysAgo(8),
    isFreeTrial: false,
    confidence: 0.97,
    annualCost: 528.0,
    cancelEmailGuess: 'support@onepeloton.com',
  },
  {
    id: '3',
    merchant: 'Netflix',
    category: 'Entertainment',
    amount: 22.99,
    cadence: 'monthly',
    lastChargedOn: daysAgo(12),
    isFreeTrial: false,
    confidence: 0.99,
    annualCost: 275.88,
    cancelEmailGuess: 'info@account.netflix.com',
  },
  {
    id: '4',
    merchant: 'NYTimes',
    category: 'News',
    amount: 17.0,
    cadence: 'monthly',
    lastChargedOn: daysAgo(5),
    isFreeTrial: false,
    confidence: 0.95,
    annualCost: 204.0,
    cancelEmailGuess: 'customercare@nytimes.com',
  },
  {
    id: '5',
    merchant: 'HBO Max',
    category: 'Entertainment',
    amount: 15.99,
    cadence: 'monthly',
    lastChargedOn: daysAgo(20),
    isFreeTrial: false,
    confidence: 0.98,
    annualCost: 191.88,
    cancelEmailGuess: 'help@hbomax.com',
  },
  {
    id: '6',
    merchant: 'Disney+',
    category: 'Entertainment',
    amount: 13.99,
    cadence: 'monthly',
    lastChargedOn: daysAgo(15),
    isFreeTrial: false,
    confidence: 0.98,
    annualCost: 167.88,
    cancelEmailGuess: 'help@disneyplus.com',
  },
  {
    id: '7',
    merchant: 'OpenAI',
    category: 'AI / Software',
    amount: 20.0,
    cadence: 'monthly',
    lastChargedOn: daysAgo(2),
    isFreeTrial: false,
    confidence: 0.99,
    annualCost: 240.0,
    cancelEmailGuess: 'support@openai.com',
  },
  {
    id: '8',
    merchant: 'Planet Fitness',
    category: 'Fitness',
    amount: 24.99,
    cadence: 'monthly',
    lastChargedOn: daysAgo(10),
    isFreeTrial: false,
    confidence: 0.96,
    annualCost: 299.88,
    cancelEmailGuess: 'info@planetfitness.com',
  },
  {
    id: '9',
    merchant: 'Spotify',
    category: 'Music',
    amount: 11.99,
    cadence: 'monthly',
    lastChargedOn: daysAgo(6),
    isFreeTrial: false,
    confidence: 0.99,
    annualCost: 143.88,
    cancelEmailGuess: 'support@spotify.com',
  },
  {
    id: '10',
    merchant: 'GitHub Copilot',
    category: 'Developer Tools',
    amount: 10.0,
    cadence: 'monthly',
    lastChargedOn: daysAgo(4),
    isFreeTrial: false,
    confidence: 0.97,
    annualCost: 120.0,
    cancelEmailGuess: 'support@github.com',
  },
  {
    id: '11',
    merchant: "The Farmer's Dog",
    category: 'Pet Food',
    amount: 89.0,
    cadence: 'monthly',
    lastChargedOn: daysAgo(29),
    isFreeTrial: true,
    trialEndsOn: daysFromNow(1),
    confidence: 0.92,
    annualCost: 1068.0,
    cancelEmailGuess: 'hello@thefarmersdog.com',
  },
  {
    id: '12',
    merchant: 'MasterClass',
    category: 'Education',
    amount: 120.0,
    cadence: 'annual',
    lastChargedOn: daysAgo(340),
    isFreeTrial: true,
    trialEndsOn: daysFromNow(25),
    confidence: 0.9,
    annualCost: 120.0,
    cancelEmailGuess: 'help@masterclass.com',
  },
  {
    id: '13',
    merchant: 'Dropbox',
    category: 'Cloud Storage',
    amount: 11.99,
    cadence: 'monthly',
    lastChargedOn: daysAgo(18),
    isFreeTrial: false,
    confidence: 0.95,
    annualCost: 143.88,
    cancelEmailGuess: 'support@dropbox.com',
  },
  {
    id: '14',
    merchant: 'Duolingo Plus',
    category: 'Education',
    amount: 6.99,
    cadence: 'monthly',
    lastChargedOn: daysAgo(22),
    isFreeTrial: false,
    confidence: 0.93,
    annualCost: 83.88,
    cancelEmailGuess: 'support@duolingo.com',
  },
  {
    id: '15',
    merchant: 'Calm',
    category: 'Wellness',
    amount: 14.99,
    cadence: 'monthly',
    lastChargedOn: daysAgo(9),
    isFreeTrial: false,
    confidence: 0.91,
    annualCost: 179.88,
    cancelEmailGuess: 'hello@calm.com',
  },
]

export const SORTED_MOCK_SUBSCRIPTIONS = [...MOCK_SUBSCRIPTIONS].sort(
  (a, b) => b.annualCost - a.annualCost
)

export function buildCancelEmail(sub: Subscription): string {
  return `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; color: #18181b; max-width: 560px; margin: 0 auto; padding: 24px;">
  <p>Hi ${sub.merchant} Support,</p>
  <p>I would like to cancel my subscription effective immediately. Please confirm cancellation and stop all future charges to my account.</p>
  <p><strong>Subscription:</strong> ${sub.merchant}<br/>
  <strong>Billing:</strong> $${sub.amount}/${sub.cadence}</p>
  <p>Please send a confirmation email once the cancellation has been processed.</p>
  <p>Thank you,<br/>A cancel-it user</p>
</body>
</html>`
}
