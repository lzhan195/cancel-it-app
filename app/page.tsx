import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { FileText, TrendingDown, XCircle } from 'lucide-react'

export default function LandingPage() {
  const steps = [
    {
      icon: <FileText className="w-5 h-5 text-zinc-400" />,
      title: 'Paste',
      description: 'Drop in your bank or credit card statement.',
    },
    {
      icon: <TrendingDown className="w-5 h-5 text-zinc-400" />,
      title: 'See the leak',
      description: 'Claude finds every recurring charge you forgot about.',
    },
    {
      icon: <XCircle className="w-5 h-5 text-zinc-400" />,
      title: 'Cancel',
      description: 'One click drafts the cancellation email. Done.',
    },
  ]

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-24">
      <div className="w-full max-w-2xl flex flex-col items-center text-center gap-6">
        <Badge variant="secondary" className="text-xs font-medium text-zinc-500 border border-zinc-200">
          Built in NYC
        </Badge>

        <h1 className="text-5xl font-semibold tracking-tight text-balance text-zinc-900">
          Stop paying for subscriptions you forgot.
        </h1>

        <p className="text-lg text-zinc-500 text-pretty max-w-md">
          Paste your bank statement. We find every recurring charge draining your account.
        </p>

        <div className="flex items-center gap-3 mt-2">
          <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white">
            <Link href="/dashboard">Scan my statement</Link>
          </Button>
          <Button asChild variant="ghost" size="lg" className="text-zinc-600">
            <Link href="/dashboard?demo=true">Try the demo</Link>
          </Button>
        </div>

        <div className="w-full mt-12 grid grid-cols-3 gap-4">
          {steps.map((step) => (
            <Card key={step.title} className="border-0 shadow-none bg-transparent">
              <CardContent className="flex flex-col items-center gap-2 pt-6 text-center">
                <div className="mb-1">{step.icon}</div>
                <p className="text-sm font-medium text-zinc-800">{step.title}</p>
                <p className="text-sm text-zinc-500 leading-relaxed">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}
