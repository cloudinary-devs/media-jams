import { useQuery, QueryClient } from 'react-query';
import { bookmarks as queryBookmarks } from '@lib/queries/bookmarks';
import { useUser } from '@auth0/nextjs-auth0';

export function useBookmarksQuery() {
  const { user, loading } = useUser();

  const queryInfo = useQuery('bookmarks', queryBookmarks.get, {
    // The query will not execute until the user exists
    enabled: !!user?.sub,
  });

  return {
    ...queryInfo,
  };
}
