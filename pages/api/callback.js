import auth0 from '../../lib/auth0';
import addQueryToUrl from '../../lib/addQueryToUrl';

export default async function callback(req, res) {
  try {
    await auth0.handleCallback(req, res, {
      onUserLoaded: async (req, res, session, state) => {
        console.log(
          addQueryToUrl(
            { origin: 'http://localhost:3333/' },
            session.user['https://mediajams-studio/claimUrl'],
          ),
        );
        res.writeHead(302, {
          Location: addQueryToUrl(
            { origin: 'http://localhost:3333/' },
            session.user['https://mediajams-studio/claimUrl'],
          ),
        });
        // return;
      },
    });
    res.end();
  } catch (error) {
    console.error(error);
    res.status(error.status || 400).end(error.message);
  }
}
