import auth0 from '@lib/auth0';
import { initSentry, sentryHandler } from '@lib/sentry';
//initialize Sentry
initSentry();

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

const handler = async (req, res) => {
  try {
    const { redirectUri, returnTo } = getUrls(req);
    return auth0.handleLogin(req, res, {
      authorizationParams: {
        screen_hint: 'signup',
        redirect_uri: redirectUri,
      },
      returnTo: returnTo,
    });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
};

export default sentryHandler(handler);
