import auth0 from '@lib/auth0';
import { initSentry, sentryHandler } from '@lib/sentry';
//initialize Sentry
initSentry();

export default auth0.handleAuth();
