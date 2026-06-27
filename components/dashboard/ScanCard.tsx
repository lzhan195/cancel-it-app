'use client'

import { useState } from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const SAMPLE_STATEMENT = `NETFLIX.COM 06/01 $22.99
SPOTIFY USA 06/02 $11.99
ADOBE SYSTEMS 06/03 $59.99
PLANET FITNESS 06/04 $24.99
OPENAI *CHATGPT 06/05 $20.00
NYTIMES DIGITAL 06/06 $17.00
DISNEYPLUS.COM 06/07 $13.99
HBO MAX 06/08 $15.99
PELOTON 06/09 $44.00
GITHUB COPILOT 06/10 $10.00
FARMERS DOG 06/11 $0.00 (FREE TRIAL - CONVERTS 06/28)
MASTERCLASS 06/12 $0.00 (FREE TRIAL - CONVERTS 07/22)
DROPBOX 06/13 $11.99
DUOLINGO PLUS 06/14 $6.99
CALM APP 06/15 $14.99`

interface Props {
  onScan: (statement: string) => void
  scanning: boolean
}

export function ScanCard({ onScan, scanning }: Props) {
  const [statement, setStatement] = useState('')
  const [email, setEmail] = useState('')

  return (
    <Card className="border-zinc-200 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-zinc-900">Scan a statement</CardTitle>
      </CardHeader>
      <CardContent className="pb-3">
        <Textarea
          value={statement}
          onChange={(e) => setStatement(e.target.value)}
          placeholder="Paste your bank or credit card statement here…"
          className="font-mono text-xs h-40 resize-none bg-white border-zinc-200 placeholder:text-zinc-500 text-zinc-900"
        />
      </CardContent>
      <CardFooter className="flex items-center justify-between gap-3 pt-0 flex-wrap">
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            className="bg-emerald-600 hover:bg-emerald-700"
            disabled={scanning || !statement.trim()}
            onClick={() => onScan(statement)}
          >
            {scanning ? 'Scanning…' : 'Scan for subscriptions'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setStatement(SAMPLE_STATEMENT)}
            className="border-zinc-200"
          >
            Try a sample
          </Button>
        </div>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Send actions to"
          className="text-xs h-8 w-48 border-zinc-200"
        />
      </CardFooter>
    </Card>
  )
}
