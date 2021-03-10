import { useQuery, useMutation } from 'react-query';
import jams from '@lib/queries/jams';

export function useJams() {
  const {} = useQuery('jams');
}

export function useFeaturedJams() {
  const {} = useQuery('featured jams');
}

export function useJamsMutation() {}
