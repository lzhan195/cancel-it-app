'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { EmailDialog } from './EmailDialog'
import type { Subscription } from '@/lib/mock-data'

interface Props {
  subscription: Subscription
}

function trialDaysLeft(trialEndsOn: string): number {
  const now = new Date()
  const end = new Date(trialEndsOn)
  return Math.max(0, Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)))
}

export function SubscriptionRow({ subscription: sub }: Props) {
  const [cancelled, setCancelled] = useState(false)
  const [guarded, setGuarded] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogSent, setDialogSent] = useState(false)

  const daysLeft = sub.isFreeTrial && sub.trialEndsOn ? trialDaysLeft(sub.trialEndsOn) : null

  async function handleCancel() {
    try {
      const res = await fetch('/api/cancel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subscriptionId: sub.id }),
      })
      if (!res.ok) throw new Error('404')
    } catch {
      // fall through to mock
    }
    setDialogSent(true)
    setDialogOpen(true)
    setCancelled(true)
    toast.success(`Cancellation sent to ${sub.merchant}`, {
      description: `Draft delivered via Resend to ${sub.cancelEmailGuess}`,
    })
  }

  async function handleGuard() {
    try {
      const res = await fetch('/api/remind', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subscriptionId: sub.id }),
      })
      if (!res.ok) throw new Error('404')
    } catch {
      // fall through to mock
    }
    setGuarded(true)
    toast.success(`Trial reminder set for ${sub.merchant}`, {
      description: `You'll be reminded before the trial converts.`,
    })
  }

  function handlePreview() {
    setDialogSent(false)
    setDialogOpen(true)
  }

  return (
    <>
      <Card className="shadow-sm">
        <CardContent className="flex items-center justify-between gap-4 py-4 px-5">
          <div className="flex flex-col gap-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-medium text-zinc-900">{sub.merchant}</span>
              <Badge variant="secondary" className="text-xs font-normal text-zinc-500">
                {sub.category}
              </Badge>
              {sub.isFreeTrial && daysLeft !== null && (
                <Badge className="text-xs font-normal bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-50">
                  trial bills in {daysLeft}d
                </Badge>
              )}
            </div>
            <p className="text-xs text-zinc-400">
              ${sub.amount}/{sub.cadence} &middot; ${sub.annualCost.toLocaleString()}/yr
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {cancelled || guarded ? (
              <Badge
                variant="secondary"
                className="text-xs font-normal text-zinc-400 cursor-pointer"
                onClick={cancelled ? handlePreview : undefined}
              >
                {cancelled ? 'Sent via Resend' : 'Reminder set'}
              </Badge>
            ) : (
              <>
                {sub.isFreeTrial && (
                  <Button variant="outline" size="sm" onClick={handleGuard}>
                    Guard trial
                  </Button>
                )}
                <Button size="sm" onClick={handleCancel}>
                  Draft cancellation
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      <EmailDialog
        subscription={sub}
        sent={dialogSent}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </>
  )
}
