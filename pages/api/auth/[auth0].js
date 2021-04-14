import auth0 from '@lib/auth0';
import { initSentry, sentryHandler } from '@lib/sentry';
//initialize Sentry
initSentry();

const audience = process.env.AUTH0_AUDIENCE;
const scope = 'openid profile email';

function getUrls(req) {
  const host = req.headers['host'];
  const protocol = process.env.VERCEL_URL ? 'https' : 'http';
  const redirectUri = `${protocol}://${host}/api/auth/callback`;
  const returnTo = `${protocol}://${host}`;
  return {
    redirectUri,
    returnTo,
  };
}

/**
 * https://github.com/auth0/nextjs-auth0/issues/295
 */
export default auth0.handleAuth({
  async callback(req, res) {
    try {
      const { redirectUri } = getUrls(req);
      await auth0.handleCallback(req, res, { redirectUri: redirectUri });
    } catch (error) {
      res.status(error.status || 500).end(error.message);
    }
  },

  async login(req, res) {
    try {
      const { redirectUri, returnTo } = getUrls(req);

      await auth0.handleLogin(req, res, {
        authorizationParams: {
          audience: audience,
          scope: scope,
          redirect_uri: redirectUri,
        },
        returnTo: returnTo,
      });
    } catch (error) {
      res.status(error.status || 400).end(error.message);
    }
  },

  async logout(req, res) {
    const { returnTo } = getUrls(req);
    await auth0.handleLogout(req, res, {
      returnTo: returnTo,
    });
  },
});
