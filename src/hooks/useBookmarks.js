import { useQuery, useQueryClient, useMutation } from 'react-query';
import { bookmarks as bookmarksQuery } from '@lib/queries/bookmarks';
import { useUser } from '@auth0/nextjs-auth0';

export function useBookmarksQuery(select) {
  const { user, loading } = useUser();

  const queryInfo = useQuery('bookmarks', bookmarksQuery.get, {
    // The query will not execute until the user exists
    enabled: !!user?.sub,
    select,
  });

  return {
    ...queryInfo,
  };
}

export function useAddBookmarkMutation({
  onSuccess: _onSuccess,
  onError: _onError,
}) {
  const queryClient = useQueryClient();
  return useMutation((post) => bookmarksQuery.add(post._id), {
    onMutate: async (post) => {
      await queryClient.cancelQueries('bookmarks');
      await queryClient.cancelQueries('bookmark jams');
      const previousBookmarkIds = queryClient.getQueryData('bookmarks');
      const previousBookmarkedPosts = queryClient.getQueryData('bookmark jams');

      let newBookmarkedPosts;

      if (previousBookmarkedPosts?.length === 0) {
        queryClient.setQueryData('bookmark jams', { allPost: [post] });
      } else {
        newBookmarkedPosts = [...previousBookmarkedPosts.allPost, post];
        queryClient.setQueryData('bookmark jams', {
          allPost: newBookmarkedPosts,
        });
      }

      return previousBookmarkIds;
    },
    // On failure, roll back to the previous value
    onError: (err, variables, previousBookmarkIds) => {
      _onError();
      // TODO: Revisit and add a toast on failure and rollback
      queryClient.setQueryData('bookmarks', previousBookmarkIds);
    },
    // After success or failure, refetch the bookmarks and bookmark jams queries
    onSuccess: () => {
      _onSuccess();
      queryClient.invalidateQueries('bookmarks');

      console.log('Queries successfully refreshed');
    },
  });
}

export function useRemoveBookmarkMutation({
  onSuccess: _onSuccess,
  onError: _onError,
}) {
  const queryClient = useQueryClient();
  return useMutation((post) => bookmarksQuery.remove(post._id), {
    onMutate: async (post) => {
      await queryClient.cancelQueries('bookmarks');
      await queryClient.cancelQueries('bookmark jams');
      const previousBookmarkIds = queryClient.getQueryData('bookmarks');
      const previousBookmarks = queryClient.getQueryData('bookmark jams');

      const newBookmarkedPosts = previousBookmarks?.allPost.filter(
        (data) => data._id !== post._id,
      );

      if (newBookmarkedPosts.length > 0) {
        queryClient.setQueryData('bookmark jams', {
          allPost: newBookmarkedPosts,
        });
      } else {
        queryClient.setQueryData('bookmark jams', []);
      }

      return previousBookmarkIds;
    },
    // On failure, roll back to the previous value
    onError: (err, variables, previousBookmarkIds) => {
      _onError();
      // TODO: Revisit and add a toast on failure and rollback
      queryClient.setQueryData('bookmarks', previousBookmarkIds);
    },
    // After success or failure, refetch the bookmarks and bookmark jams queries
    onSuccess: () => {
      _onSuccess();
      queryClient.invalidateQueries('bookmarks');
    },
  });
}
