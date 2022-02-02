import React from 'react';
import { useQuery } from 'react-query';
import { useJamsQuery } from './useJams';
const { chain } = require('lodash');
import { tags as queryTags } from '@lib/queries/tags';

export function useTagsQuery(select, options) {
  return useQuery('jamTags', queryTags.get, {
    staleTime: Infinity,
    select,
    ...options,
  });
}
const tagCount = (allJams, allTags) =>
  chain(allJams)
    .map((t) => t.tags)
    .flatten()
    .groupBy('_id')
    .values()
    .map((group) => ({ ...group[0], qty: group.length }))
    .filter((t) => t.qty > 1)
    .concat(allTags)
    .groupBy('_id')
    .map(_.spread(_.merge))
    .orderBy(['qty'], ['desc'])
    .value(); // used to unwrap the lodash chain

export function useTags() {
  const [allTags, setTags] = React.useState(null);
  const {
    data: { tags },
  } = useTagsQuery();
  const {
    data: { jams },
  } = useJamsQuery();

  React.useEffect(() => {
    if (!tags) return null;
    console.log('Tags', tags);
    console.log('Jams', jams);
    console.log(tagCount(jams, tags));
    setTags(tagCount(jams, tags));
  }, [tags, jams]);

  return [allTags];
}
