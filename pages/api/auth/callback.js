import auth0 from '../../../lib/auth0';
import addQueryToUrl from '../../../lib/addQueryToUrl';
import { initSentry, sentryHandler } from '@lib/sentry';
//initialize Sentry
initSentry();

export default sentryHandler(async function callback(req, res) {
  try {
    await auth0.handleCallback(req, res);
    return;
  } catch (error) {
    console.error(error);
    res.status(error.status || 400).end(error.message);
  }
});
