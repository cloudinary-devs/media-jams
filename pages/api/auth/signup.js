import auth0 from '@lib/auth0';
import { initSentry, sentryHandler } from '@lib/sentry';
//initialize Sentry
initSentry();

const handler = async (req, res) => {
  try {
    return auth0.handleLogin(req, res, {
      authorizationParams: {
        screen_hint: 'signup',
      },
    });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
};

export default sentryHandler(handler);
