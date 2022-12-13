import React from 'react';
import { useQuery } from 'react-query';
import { useJamsQuery, useJamsLazyQuery } from './useJams';
const { chain } = require('lodash');
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

const tagCount = (allJams, allTags) =>
  chain(allJams)
    .map((t) => t.tags)
    .flatten()
    .groupBy('_id')
    .values()
    .map((group) => ({ ...group[0], qty: group.length }))
    .filter((t) => t.qty > 1)
    .concat(allTags) // add in all tags
    .groupBy('_id') // group by unquie tag _id
    .map(_.spread(_.merge)) // flatten the array's of array's grouped by _id back into a single array
    .orderBy(['qty'], ['desc'])
    .value(); // used to unwrap the lodash chain

export function useTags() {
  const [allTags, setTags] = React.useState([]);
  const { data: dataTags } = useTagsQuery();
  const { data: dataJams } = useJamsQuery();

  React.useEffect(() => {
    if (!dataTags || !dataJams) return undefined;
    const { tags } = dataTags;
    const { jams } = dataJams;
    setTags();
  }, [dataTags, dataJams]);

  return [allTags];
}

export function useTagsLazy() {
  const [fetchJams, jamQueryData] = useJamsLazyQuery();
  const { data: allJams = {}, isLoading: isLoadingJams } = jamQueryData;
  const { jams = [] } = allJams;

  const [fetchTags, tagQueryData] = useTagsQueryLazy();
  const { data: allTags = {}, isLoading: isLoadingTags } = tagQueryData;
  const { tags = [] } = allTags;

  async function fetchTagsLazy() {
    return await Promise.all([fetchJams(), fetchTags()]);
  }

  return [
    fetchTagsLazy,
    {
      data: {
        tags:
          jams.length > 0 && tags.length > 0 ? tagCount(jams, tags) : undefined,
      },
      isLoading: isLoadingJams || isLoadingTags,
    },
  ];
}
