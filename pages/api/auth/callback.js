import auth0 from '../../../lib/auth0';
import addQueryToUrl from '../../../lib/addQueryToUrl';

export default async function callback(req, res) {
  try {
    await auth0.handleCallback(req, res, {
      onUserLoaded: async (req, res, session, state) => {
        res.writeHead(302, {
          Location: addQueryToUrl(
            { origin: state.redirectTo },
            session.user['https://mediajams-studio/claimUrl'],
          ),
        });
      },
    });
    res.end();
    return;
  } catch (error) {
    console.error(error);
    res.status(error.status || 400).end(error.message);
  }
}
