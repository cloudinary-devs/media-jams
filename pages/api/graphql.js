import auth0 from '@lib/auth0';
import { GraphQLClient } from 'graphql-request';

export default async function graphql(req, res) {
  try {
    // Get user acces_token IF available
    const tokenCache = auth0.tokenCache(req, res);
    const { accessToken } = await tokenCache.getAccessToken();
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
    const { query, variables } = req.body;
    const data = await graphQLClient.request(query, variables);
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({
      code: error.code,
      error: error.message,
    });
  }
}
