import { useQuery } from 'react-query';
import { authors as queryAuthors } from '@lib/queries/authors';
import useLazyQuery from '@hooks/useLazyQuery';

export function useAuthorsQuery() {
  return useQuery(`allAuthors`, queryAuthors.get);
}

export function useAuthorsQueryLazy(select, options) {
  return useLazyQuery('allAuthors', queryAuthors.get, {
    staleTime: Infinity,
    select,
    ...options,
  });
}
