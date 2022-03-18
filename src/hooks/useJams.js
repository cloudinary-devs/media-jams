import { useQueryClient, useQuery, useMutation } from 'react-query';
import { postsByTag, postsByTagSlug } from '@lib/api';
import { jams as queryJams } from '@lib/queries/jams';
import useLazyQuery from '@hooks/useLazyQuery';

export function useJamsQuery(select, options) {
  return useQuery('allJams', queryJams.get, {
    staleTime: Infinity,
    select,
    ...options,
  });
}

export function useJamsLazyQuery(select, options) {
  return useLazyQuery('allJams', queryJams.get, {
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
 * @param {Array<Object>} tags
 * @param {*} options
 * @returns query object data of related jams by tag title
 */
export function useRelatedJams(tags, options) {
  if (tags === undefined) return { data: null };
  return useQuery(
    ['jamTag', tags[0].title],
    async () => {
      const tag = tags[0].title;
      const jamIds = await postsByTag(tag);
      const data = await queryJams.getByIds(jamIds);
      return {
        tag: {
          title: tag,
        },
        jams: data,
      };
    },
    {
      staleTime: Infinity,
      ...options,
    },
  );
}

export function useJamTag(tagSlug, options = {}) {
  return useQuery(
    ['jamTag-slug', tagSlug],
    () => queryJams.getJamsByTagSlug(tagSlug),
    {
      staleTime: Infinity,
      ...options,
    },
  );
}

export function useJamsMutation() {}
