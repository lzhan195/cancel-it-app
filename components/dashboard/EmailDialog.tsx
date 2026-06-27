'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import type { Subscription } from '@/lib/mock-data'
import { buildCancelEmail } from '@/lib/mock-data'

interface Props {
  subscription: Subscription | null
  sent: boolean
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EmailDialog({ subscription, sent, open, onOpenChange }: Props) {
  if (!subscription) return null

  const html = buildCancelEmail(subscription)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base">
            Cancel {subscription.merchant}
            <Badge variant={sent ? 'secondary' : 'outline'} className="text-xs font-normal">
              {sent ? 'Sent via Resend' : 'Preview'}
            </Badge>
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3 mt-1">
          <div className="flex flex-col gap-0.5">
            <p className="text-xs text-zinc-400">To</p>
            <p className="text-sm text-zinc-700">{subscription.cancelEmailGuess}</p>
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="text-xs text-zinc-400">Subject</p>
            <p className="text-sm text-zinc-700">
              Cancellation Request — {subscription.merchant} Subscription
            </p>
          </div>
          <div
            className="border border-zinc-200 rounded-md p-4 text-sm text-zinc-700 bg-zinc-50 overflow-auto max-h-64"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
