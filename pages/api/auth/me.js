import auth0 from '@lib/auth0';
import { initSentry } from '@lib/sentry';
//initialize Sentry
initSentry();

export default async function me(req, res) {
  try {
    const profile = await auth0.handleProfile(req, res);
    return profile;
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
}
