import { GraphQLClient, gql } from 'graphql-request';

export async function getBookmarks(accessToken) {
  return async function bookmarks() {
    const query = gql`
      {
        bookmarks {
          content_id
        }
      }
    `;
    const endpoint = 'https://stage-mediajam.hasura.app/v1/graphql';
    const graphQLClient = new GraphQLClient(endpoint);
    // Set a single header
    graphQLClient.setHeaders({
      Authorization: `Bearer ${accessToken}`,
      'X-Hasura-Role': 'user',
    });
    try {
      const data = await graphQLClient.request(query);
      console.log(data);
      return data;
    } catch (error) {
      throw error;
    }
  };
}
