import { initAuth0 } from '@auth0/nextjs-auth0';

export default initAuth0({
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  domain: process.env.AUTH0_DOMAIN,
  scope: 'openid profile email',
  // VERCEL_URL is available on 'preview' deployments
  // for other 'production' builds we fall back to the prod domain
  redirectUri:
    process.env.NODE_ENV === 'production'
      ? process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}/api/auth/callback`
        : `https://mediajams.dev/api/auth/callback`
      : `http://localhost:3000/api/auth/callback`,
  // deployed url or to production
  postLogoutRedirectUri: `https://mediajams.dev/api/auth/logout`,
  session: {
    // The secret used to encrypt the cookie.
    cookieSecret:
      process.env.AUTH0_COOKIE_SECRET ||
      'aE1OUWcLTmSLn8I79hNJPzjTo5-aE1OUWcLTmSLn8I79hNJPzjTo5',
    // The cookie lifetime (expiration) in seconds. Set to 8 hours by default.
    cookieLifetime: 60 * 60 * 8,
    // (Optional) The cookie domain this should run on. Leave it blank to restrict it to your domain.
    cookieSameSite: 'none',
    storeIdToken: false,
    storeAccessToken: false,
    storeRefreshToken: false,
  },
  oidcClient: {
    // (Optional) Configure the timeout in milliseconds for HTTP requests to Auth0.
    httpTimeout: 2500,
    // (Optional) Configure the clock tolerance in milliseconds, if the time on your server is running behind.
    clockTolerance: 10000,
  },
});
