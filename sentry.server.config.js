// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;
const VERCEL_ENV = process.env.VERCEL_ENV || 'development';
Sentry.init({
  environment: VERCEL_ENV,
  dsn:
    SENTRY_DSN ||
    'https://97717a3cbeb2457284d50c82edd8c777@o1000093.ingest.sentry.io/5959356',
  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1.0,
  // ...
  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
});
