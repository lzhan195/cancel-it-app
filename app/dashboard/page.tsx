'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'
import { DashboardHeader } from '@/components/dashboard/DashboardHeader'
import { ScanCard } from '@/components/dashboard/ScanCard'
import { StatsCards } from '@/components/dashboard/StatsCards'
import { SubscriptionRow } from '@/components/dashboard/SubscriptionRow'
import { SORTED_MOCK_SUBSCRIPTIONS, type Subscription } from '@/lib/mock-data'

function DashboardContent() {
  const searchParams = useSearchParams()
  const isDemo = searchParams.get('demo') === 'true'

  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [scanning, setScanning] = useState(false)
  const [scanned, setScanned] = useState(false)

  useEffect(() => {
    if (isDemo) {
      runScan()
    }
  }, [isDemo]) // eslint-disable-line react-hooks/exhaustive-deps

  async function runScan(statement?: string) {
    setScanning(true)
    setScanned(false)
    setSubscriptions([])

    try {
      const res = await fetch('/api/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ statement: statement ?? '' }),
      })
      if (!res.ok) throw new Error('404')
      const data = await res.json()
      setSubscriptions(data.subscriptions)
    } catch {
      // mock fallback — simulate a short delay
      await new Promise((r) => setTimeout(r, 1400))
      setSubscriptions(SORTED_MOCK_SUBSCRIPTIONS)
    }

    setScanning(false)
    setScanned(true)
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-10">
        <DashboardHeader />


        <div className="flex flex-col gap-6 mt-8">
          <ScanCard onScan={runScan} scanning={scanning} />

          {(scanning || scanned) && (
            <>
              <Separator className="my-0" />

              {scanning ? (
                <div className="flex flex-col gap-3">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="h-16 w-full rounded-lg" />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  <StatsCards subscriptions={subscriptions} />

                  <div className="flex flex-col gap-2">
                    {subscriptions.map((sub) => (
                      <SubscriptionRow key={sub.id} subscription={sub} />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <DashboardContent />
    </Suspense>
  )
}
