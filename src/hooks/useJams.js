import { useQueryClient, useQuery, useMutation } from 'react-query';
import { postsByTag } from '@lib/api';
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

/**
 *
 * @param {Array<string>} tags
 * @param {*} options
 * @returns query object data of related jams by tag title
 */
export async function useRelatedJams(tags, options) {
  if (tags === undefined) return { data: null };
  return useQuery(
    ['jamTag', tags[0]],
    async () => {
      const jamIds = await postsByTag(tags[0]);
      const data = queryJams.getByIds(jamIds);
      return data;
    },
    {
      staleTime: Infinity,
      ...options,
    },
  );
}

export function useJamsMutation() {}
