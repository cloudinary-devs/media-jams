import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import addQueryToUrl from 'lib/addQueryToUrl';

const callbacks = {
  /**
   * @param  {string} url      URL provided as callback URL by the client
   * @param  {string} baseUrl  Default base URL of site (can be used as fallback)
   * @return {string}          URL the client will be redirect to
   */
  redirect: async (url, baseUrl) => {
    debugger;
    return Promise.resolve('http://localhost:3333');
    // return Promise.resolve(url);
  },
  /**
   * @param  {object} user     User object
   * @param  {object} account  Provider account
   * @param  {object} profile  Provider profile
   * @return {boolean}         Return `true` (or a modified JWT) to allow sign in
   *                           Return `false` to deny access
   */
  signIn: async (user, account, profile) => {
    debugger;

    const redirectUrl = addQueryToUrl(
      { origin: 'http://localhost:3333' },
      profile['https://mediajams-studio/claimUrl'],
    );
    return Promise.resolve(redirectUrl);
  },
};
const options = {
  providers: [
    Providers.Auth0({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      domain: process.env.AUTH0_DOMAIN,
      scope: 'openid profile',
      redirectUri: 'http://localhost:3000/api/auth/callback',
      postLogoutRedirectUri: 'http://localhost:3000/',
      session: {
        // The secret used to encrypt the cookie.
        cookieSecret: 'kejbfinimqwpqodwtilujjagdcbtynga',
        // The cookie lifetime (expiration) in seconds. Set to 8 hours by default.
        cookieLifetime: 60 * 60 * 8,
        // (Optional) The cookie domain this should run on. Leave it blank to restrict it to your domain.
        // cookieDomain: 'your-domain.com',
        // (Optional) SameSite configuration for the session cookie. Defaults to 'lax', but can be changed to 'strict' or 'none'. Set it to false if you want to disable the SameSite setting.
        cookieSameSite: 'lax',
        // (Optional) Store the id_token in the session. Defaults to false.
        storeIdToken: false,
        // (Optional) Store the access_token in the session. Defaults to false.
        storeAccessToken: false,
        // (Optional) Store the refresh_token in the session. Defaults to false.
        storeRefreshToken: false,
      },
      oidcClient: {
        // (Optional) Configure the timeout in milliseconds for HTTP requests to Auth0.
        httpTimeout: 2500,
        // (Optional) Configure the clock tolerance in milliseconds, if the time on your server is running behind.
        clockTolerance: 10000,
      },
    }),
    // ...add more providers here
  ],
  callbacks,
};

export default (req, res) => NextAuth(req, res, options);
