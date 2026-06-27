import { Auth0Client } from '@auth0/nextjs-auth0/server'

export function authConfigured(): boolean {
  return !!(
    process.env.AUTH0_SECRET &&
    process.env.AUTH0_ISSUER_BASE_URL &&
    process.env.AUTH0_CLIENT_ID &&
    process.env.AUTH0_CLIENT_SECRET
  )
}

let _auth0: Auth0Client | null = null

export function getAuth0(): Auth0Client | null {
  if (!authConfigured()) return null
  if (!_auth0) {
    _auth0 = new Auth0Client()
  }
  return _auth0
}
