import { useQuery, useQueryClient, useMutation } from 'react-query';
import { notes as notesQuery } from '@lib/queries/notes';
import { useUser } from '@auth0/nextjs-auth0';

export function useNotesQuery(select) {
  const { user, loading } = useUser();

  return useQuery('notes', notesQuery.get, {
    // The query will not execute until the user exists
    enabled: !!user?.sub,
    select,
    staleTime: 300000, // 5 minutes
    cacheTime: 300000, // 5 minutes
  });
}
