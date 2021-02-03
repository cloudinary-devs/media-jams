import { gql } from 'graphql-request';
import fetchGraphQL from '@lib/featchGraphQL';
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
  get: () => fetchGraphQL(queryBookmarks),
  add: (content_id) =>
    fetchGraphQL(mutationAddBookmarks, { object: { content_id } }),
};
