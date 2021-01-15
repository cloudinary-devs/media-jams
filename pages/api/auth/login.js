import auth0 from '@lib/auth0';
import { initSentry } from '@lib/sentry';
//initialize Sentry
initSentry();

/**
 * TODO: if there is no origin url on the loging request,
 * redirect to the content studio. In the future this can be set to the default URL
 * and moderators / creators can use a content link in the navigation bar
 * @param {Object} req incoming request
 * @param {Object} res outbound response
 */
export default async function login(req, res) {
  try {
    await auth0.handleLogin(req, res);
  } catch (error) {
    console.error(error);
    res.status(error.status || 400).end(error.message);
  }
}
