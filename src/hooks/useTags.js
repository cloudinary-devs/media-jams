import { useQueryClient, useQuery } from 'react-query';

import { tags as queryTags } from '@lib/queries/tags';
import useLazyQuery from '@hooks/useLazyQuery';

export function useTagsQuery(select, options) {
  return useQuery('jamTags', queryTags.get, {
    staleTime: Infinity,
    select,
    ...options,
  });
}

export function useTagsQueryLazy(select, options) {
  return useLazyQuery('jamTags', queryTags.get, {
    staleTime: Infinity,
    select,
    ...options,
  });
}
