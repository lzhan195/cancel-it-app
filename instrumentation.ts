export async function register() {
  if (!process.env.SENTRY_DSN) return

  const Sentry = await import('@sentry/nextjs')
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: 1.0,
  })
}

export async function onRequestError(
  err: { digest?: string } & Error,
  request: { path: string; method: string; headers: Record<string, string> },
  context: { routerKind: string; routePath: string; routeType: string }
) {
  if (!process.env.SENTRY_DSN) return
  const Sentry = await import('@sentry/nextjs')
  Sentry.captureException(err)
}
