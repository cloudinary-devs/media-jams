export default {
  user: {
    name: 'jdoe@foobar.com',
    email: 'jdoe@foobar.com',
    user_id: 'auth0|0123456789',
    nickname: 'jdoe',
    picture: 'http://foobar.com/pictures/jdoe.png',
    identities: [
      {
        provider: 'auth0',
        user_id: '0123456789',
        connection: 'Username-Password-Connection',
        isSocial: false,
      },
    ],
  },
  context: {
    clientID: '123456789',
    clientName: 'MyWebApp',
    connection: 'MyDbConn',
    connectionStrategy: 'auth0',
    protocol: 'oidc-basic-profile',
    request: {
      query: {
        scope: 'openid',
      },
      body: {},
      userAgent:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1700.107 Safari/537.36',
      ip: 'X.X.X.X',
      geoip: {
        country_code: 'AR',
        country_code3: 'ARG',
        country_name: 'Argentina',
        region: '08',
        city: 'Federal',
        postal_code: '3180',
        latitude: -30.954599380493164,
        longitude: -58.78329849243164,
        continent_code: 'SA',
        time_zone: 'America/Argentina/Buenos_Aires',
      },
    },
    samlConfiguration: {},
    stats: {
      loginsCount: 5,
    },
    accessToken: {},
    idToken: {},
    authorization: {
      roles: ['Creator', 'Admin'],
    },
  },
};
