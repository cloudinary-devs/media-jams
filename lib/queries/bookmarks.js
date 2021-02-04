import { gql } from 'graphql-request';
import { fetchGQL } from '@lib/featchGraphQL';
const queryBookmarks = gql`
  {
    bookmarks {
      content_id
    }
  }
`;

const mutationAddBookmarks = gql`
  mutation add_bookmark($object: bookmarks_insert_input!) {
    insert_bookmarks_one(object: $object) {
      content_id
    }
  }
`;

/**
 *
 */
export const bookmarks = {
  get: () => fetchGQL(queryBookmarks),
  add: (content_id) =>
    fetchGQL(mutationAddBookmarks, { object: { content_id } }),
};
