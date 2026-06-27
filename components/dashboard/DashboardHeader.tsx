'use client'

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

const SERVICES = [
  { name: 'Auth0', live: true },
  { name: 'Claude', live: true },
  { name: 'Supabase', live: true },
  { name: 'Resend', live: true },
  { name: 'Sentry', live: false },
]

export function DashboardHeader() {
  return (
    <header className="flex items-center justify-between py-5 border-b border-zinc-200">
      <span className="text-base font-semibold tracking-tight text-zinc-900">Cancel-It</span>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          {SERVICES.map((s) => (
            <Tooltip key={s.name}>
              <TooltipTrigger asChild>
                <span
                  className={`w-2 h-2 rounded-full cursor-default ${
                    s.live ? 'bg-emerald-500' : 'bg-zinc-300'
                  }`}
                />
              </TooltipTrigger>
              <TooltipContent side="bottom" className="text-xs">
                {s.name} &mdash; {s.live ? 'live' : 'demo'}
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
        <span className="text-xs text-zinc-400">demo@cancel-it.app</span>
      </div>
    </header>
  )
}
