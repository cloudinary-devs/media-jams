import { useQuery } from 'react-query';
import { tags as queryTags } from '@lib/queries/tags';

export function useTagsQuery(select, options) {
  return useQuery('jamTags', queryTags.get, {
    staleTime: Infinity,
    select,
    ...options,
  });
}
