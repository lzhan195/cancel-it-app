import { NextResponse } from 'next/server'
import { integrationStatus } from '@/lib/config'
import { getAuth0 } from '@/lib/auth0'

export async function GET() {
  const integrations = integrationStatus()
  let email: string | undefined

  try {
    const auth0 = getAuth0()
    if (auth0) {
      const session = await auth0.getSession()
      email = session?.user?.email
    }
  } catch {
    // Auth0 not available or no session
  }

  return NextResponse.json({ integrations, email })
}
