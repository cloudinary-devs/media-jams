import auth0 from '../../../lib/auth0';

export default async function logout(req, res) {
  try {
    await auth0.handleLogout(req, res, {
      returnTo: `https://${process.env.VERCEL_URL}`,
    });
  } catch (error) {
    console.error(error);
    res.status(error.status || 400).end(error.message);
  }
}
