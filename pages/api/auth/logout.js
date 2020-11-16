import auth0 from '../../../lib/auth0';
import { logoutStudio } from '@lib/api';

export default async function logout(req, res) {
  try {
    logoutStudio();
    await auth0.handleLogout(req, res, {
      returnTo:
        process.env.NODE_ENV === 'production'
          ? `https://mediajams.dev`
          : `http://localhost:3000`,
    });
  } catch (error) {
    console.error(error);
    res.status(error.status || 400).end(error.message);
  }
}
