import auth0 from '@lib/auth0';
import { GraphQLClient } from 'graphql-request';
const endpoint = process.env.HASURA_GRAPHQL_URL;

/**
 * Check req for auth token from session.
 * w/o it calls will have a 'pubic' role in the header
 * calls to `tokenCache` throw on failure
 * @param {Object} req request
 * @param {Object} res response
 */
const userRequestHeader = async (req, res) => {
  const headers = {};
  try {
    const tokenCache = auth0.tokenCache(req, res);
    const { accessToken } = await tokenCache.getAccessToken();
    headers['Authorization'] = `Bearer ${accessToken}`;
  } catch (error) {
    headers['X-Hasura-Role'] = 'public';
  } finally {
    return headers;
  }
};

export default async function graphql(req, res) {
  try {
    // Get user acces_token IF available
    const headers = await userRequestHeader(req, res);

    const graphQLClient = new GraphQLClient(endpoint);
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
