'use client'

import { useEffect, useState } from 'react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

type IntegrationStatus = {
  Auth0: boolean
  Claude: boolean
  Supabase: boolean
  Resend: boolean
  Sentry: boolean
}

const SERVICE_NAMES: (keyof IntegrationStatus)[] = [
  'Auth0',
  'Claude',
  'Supabase',
  'Resend',
  'Sentry',
]

export function DashboardHeader() {
  const [integrations, setIntegrations] = useState<IntegrationStatus | null>(null)
  const [email, setEmail] = useState('demo@cancel-it.app')

  useEffect(() => {
    fetch('/api/status')
      .then((r) => r.json())
      .then((data) => {
        if (data.integrations) setIntegrations(data.integrations)
        if (data.email) setEmail(data.email)
      })
      .catch(() => {})
  }, [])

  return (
    <header className="flex items-center justify-between py-5 border-b border-zinc-200">
      <span className="text-base font-semibold tracking-tight text-zinc-900">Cancel-It</span>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          {SERVICE_NAMES.map((name) => {
            const live = integrations ? integrations[name] : false
            return (
              <Tooltip key={name}>
                <TooltipTrigger asChild>
                  <span
                    className={`w-2 h-2 rounded-full cursor-default ${
                      live ? 'bg-emerald-600' : 'bg-zinc-400'
                    }`}
                  />
                </TooltipTrigger>
                <TooltipContent side="bottom" className="text-xs">
                  {name} &mdash; {live ? 'live' : 'demo'}
                </TooltipContent>
              </Tooltip>
            )
          })}
        </div>
        <span className="text-xs text-zinc-500">{email}</span>
      </div>
    </header>
  )
}
