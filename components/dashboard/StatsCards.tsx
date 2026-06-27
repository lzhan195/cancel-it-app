'use client'

import { useEffect, useRef, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Subscription } from '@/lib/mock-data'

function useCountUp(target: number, duration = 1200) {
  const [value, setValue] = useState(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const start = performance.now()
    const animate = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(target * eased))
      if (progress < 1) rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [target, duration])

  return value
}

interface Props {
  subscriptions: Subscription[]
}

export function StatsCards({ subscriptions }: Props) {
  const totalAnnual = subscriptions.reduce((sum, s) => sum + s.annualCost, 0)
  const trialCount = subscriptions.filter((s) => s.isFreeTrial).length
  const subCount = subscriptions.filter((s) => !s.isFreeTrial).length

  const animatedTotal = useCountUp(Math.round(totalAnnual))

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-3 gap-3">
        <Card className="border-zinc-200 shadow-sm">
          <CardContent className="pt-6 pb-5">
            <p className="text-5xl font-bold tabular-nums text-emerald-600">
              ${animatedTotal.toLocaleString()}
            </p>
            <p className="text-sm text-zinc-600 mt-1">wasted per year</p>
          </CardContent>
        </Card>
        <Card className="border-zinc-200 shadow-sm">
          <CardContent className="pt-6 pb-5">
            <p className="text-5xl font-bold tabular-nums text-zinc-900">{subCount}</p>
            <p className="text-sm text-zinc-600 mt-1">subscriptions</p>
          </CardContent>
        </Card>
        <Card className="border-zinc-200 shadow-sm">
          <CardContent className="pt-6 pb-5">
            <p className="text-5xl font-bold tabular-nums text-amber-600">{trialCount}</p>
            <p className="text-sm text-zinc-600 mt-1">trials about to bill you</p>
          </CardContent>
        </Card>
      </div>
      <div className="flex items-center gap-2">
        <Badge variant="secondary" className="text-xs text-zinc-600 font-normal">
          Parsed by Claude
        </Badge>
        <Badge variant="secondary" className="text-xs text-zinc-600 font-normal">
          Saved to Supabase
        </Badge>
      </div>
    </div>
  )
}
