import { useQuery } from 'react-query';
import { authors as queryAuthors } from '@lib/queries/authors';

export function useAuthorsQuery() {
  return useQuery(`allAuthors`, queryAuthors.get);
}
