import { gql } from 'graphql-request';
import { fetchGQL } from '@lib/fetchGraphQL';
const queryBookmarks = gql`
  query Bookmarks {
    bookmarks {
      content_id
    }
  }
`;

const addBookmark = gql`
  mutation Add_bookmark($object: bookmarks_insert_input!) {
    insert_bookmarks_one(object: $object) {
      content_id
    }
  }
`;

const removeBookmark = gql`
  mutation deleteBookMark($content_id: String!) {
    delete_bookmarks(where: { content_id: { _eq: $content_id } }) {
      returning {
        id
        content_id
      }
    }
  }
`;

/**
 *
 */
export const bookmarks = {
  get: () => fetchGQL(queryBookmarks),
  add: (content_id) => fetchGQL(addBookmark, { object: { content_id } }),
  remove: (content_id) => fetchGQL(removeBookmark, { content_id }),
};
