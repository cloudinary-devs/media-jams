import { useQueryClient, useQuery, useMutation } from 'react-query';
import { jams as queryJams } from '@lib/queries/jams';

export function useJamsQuery(select) {
  return useQuery('allJams', queryJams.get, { staleTime: Infinity, select });
}

export function useFeaturedJamsQuery() {
  const {} = useQuery('featured jams');
}

export const useJamQueryBy = (ids) =>
  useJamsQuery((data) =>
    data.jams.filter((j) => {
      return ids.includes(j._id);
    }),
  );

export function useJamsMutation() {}
