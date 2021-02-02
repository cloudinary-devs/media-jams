import auth0 from '@lib/auth0';
import { GraphQLClient } from 'graphql-request';

export default async function graphql(req, res) {
  try {
    // Get user acces_token IF available
    const tokenCache = auth0.tokenCache(req, res);
    const { accessToken } = await tokenCache.getAccessToken();
    console.log(accessToken);
    const endpoint = process.env.HASURA_GRAPHQL_URL;
    const graphQLClient = new GraphQLClient(endpoint);
    // Set headers
    // either an accessToken or a 'X-Hasura-Role' of 'public'
    const headers = accessToken
      ? {
          Authorization: `Bearer ${accessToken}`,
        }
      : {
          'X-Hasura-Role': 'public',
        };

    graphQLClient.setHeaders(headers);
    const data = await graphQLClient.request(req.body.query);
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({
      code: error.code,
      error: error.message,
    });
  }
}
