import { useQueryClient, useQuery, useMutation } from 'react-query';
import { jams as queryJams } from '@lib/queries/jams';

export function useJamsQuery(select, options) {
  return useQuery('allJams', queryJams.get, {
    staleTime: Infinity,
    select,
    ...options,
  });
}

export function useFeaturedJamsQuery() {
  return useQuery('featuredJams', queryJams.getStaticFeaturedJams, {
    staleTime: Infinity,
  });
}

export const useJamQueryBy = (ids) => {
  return useJamsQuery((data) =>
    data?.jams?.filter((j) => {
      return ids.includes(j._id);
    }),
  );
};

export function useJamsMutation() {}
