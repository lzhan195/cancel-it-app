export function integrationStatus() {
  return {
    Auth0: !!(
      process.env.AUTH0_SECRET &&
      process.env.AUTH0_ISSUER_BASE_URL &&
      process.env.AUTH0_CLIENT_ID &&
      process.env.AUTH0_CLIENT_SECRET
    ),
    Claude: !!process.env.ANTHROPIC_API_KEY,
    Supabase: !!(
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.SUPABASE_SERVICE_ROLE_KEY
    ),
    Resend: !!process.env.RESEND_API_KEY,
    Sentry: !!(process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN),
  }
}
