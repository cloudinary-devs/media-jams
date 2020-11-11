import { initAuth0 } from '@auth0/nextjs-auth0';

export default initAuth0({
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  domain: process.env.AUTH0_DOMAIN,
  scope: 'openid profile',
  redirectUri:
    process.env.NODE_ENV === 'production'
      ? `https://${process.env.VERCEL_URL}/api/auth/callback`
      : 'http://localhost:3000/api/auth/callback',
  postLogoutRedirectUri: `https://${process.env.VERCEL_URL}`,
  session: {
    // The secret used to encrypt the cookie.
    cookieSecret:
      process.env.AUTH0_COOKIE_SECRET ||
      'aE1OUWcLTmSLn8I79hNJPzjTo5-aE1OUWcLTmSLn8I79hNJPzjTo5',
    // The cookie lifetime (expiration) in seconds. Set to 8 hours by default.
    cookieLifetime: 60 * 60 * 8,
    // (Optional) The cookie domain this should run on. Leave it blank to restrict it to your domain.
  },
  oidcClient: {
    // (Optional) Configure the timeout in milliseconds for HTTP requests to Auth0.
    httpTimeout: 2500,
    // (Optional) Configure the clock tolerance in milliseconds, if the time on your server is running behind.
    clockTolerance: 10000,
  },
});
