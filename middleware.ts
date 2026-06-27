import { NextRequest, NextResponse } from 'next/server'

function isAuth0Configured(): boolean {
  return !!(
    process.env.AUTH0_SECRET &&
    process.env.AUTH0_ISSUER_BASE_URL &&
    process.env.AUTH0_CLIENT_ID &&
    process.env.AUTH0_CLIENT_SECRET
  )
}

export async function middleware(req: NextRequest) {
  if (!isAuth0Configured()) {
    return NextResponse.next()
  }

  const { Auth0Client } = await import('@auth0/nextjs-auth0/server')
  const auth0 = new Auth0Client()

  // Let Auth0 handle /auth/* routes (login, logout, callback)
  const authResponse = await auth0.middleware(req)

  // Protect /dashboard — redirect to login when no session
  if (req.nextUrl.pathname.startsWith('/dashboard')) {
    const session = await auth0.getSession()
    if (!session) {
      return NextResponse.redirect(new URL('/auth/login', req.url))
    }
  }

  return authResponse
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
