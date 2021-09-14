import { useQueryClient, useQuery, useMutation } from 'react-query';
import { jams as queryJams } from '@lib/queries/jams';

export function useJamsQuery(select, options) {
  return useQuery('allJams', queryJams.get, {
    staleTime: Infinity,
    enabled: false,
    refetchOnWindowFocus: false,
    select,
    ...options,
  });
}

export function useFeaturedJamsQuery() {
  const queryClient = useQueryClient();
  const featuredJams = queryClient.getQueryData('featuredJams');
  return { data: featuredJams || [] };
}

export const useJamQueryBy = (ids) => {
  return useJamsQuery((data) =>
    data?.jams?.filter((j) => {
      return ids.includes(j._id);
    }),
  );
};

export function useJamsMutation() {}
