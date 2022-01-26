import { useQueryClient } from 'react-query';

import { tags as queryTags } from '@lib/queries/tags';
import useLazyQuery from '@hooks/useLazyQuery';

export function useTags(select, options) {
  const queryClient = useQueryClient();
  const { data } = queryClient.getQueryData('jamTags') || {};
  return data?.tags || [];
}

export function useTagsLazy(select, options) {
  return useLazyQuery('jamTags', queryTags.get, {
    staleTime: Infinity,
    select,
    ...options,
  });
}
