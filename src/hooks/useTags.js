import { useQueryClient } from 'react-query';
import { tags as queryTags } from '@lib/queries/tags';

export function useTags(select, options) {
  const queryClient = useQueryClient();
  const { data } = queryClient.getQueryData('jamTags');
  return data?.tags || [];
}
