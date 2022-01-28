import { useReducer, useEffect, createContext, useContext } from 'react';
import { QueryClient, useQuery } from 'react-query';
import { useRouter } from 'next/router';

import { useJamsLazyQuery } from '@hooks/useJams';
import { useTagsQueryLazy, useTagsQuery } from '@hooks/useTags';
import useOnLoad from '@hooks/useOnLoad';
import { initFuse } from '@lib/search';
import { dedupeArrayByKey } from '@lib/util';
import GA from '@lib/googleAnalytics';

let Fuse;

const fuseSearchOptions = {
  // threshold: 0.35,
  location: 0,
  distance: 100,
  minMatchCharLength: 3,
  shouldSort: true,
  includeScore: true,
  useExtendedSearch: true,
  keys: ['title', 'tags.title', 'tags._id', ['author', 'name']],
};

export const SSACTIONS = {
  SET_SEARCH: 'setSearch',
  ADD_TAG_FILTERS: 'addTagFilters',
  ADD_TAG_FILTER_GROUP: 'addTagFilterGroup',
  REMOVE_TAG_FILTERS: 'removeTagFilters',
  CLEAR_TAG_FILTERS: 'clearTagFilters',
  SET_JAMS: 'setJams',
  CLEAR_SEARCH: 'clearSearch',
};

const initState = {
  searchValue: '',
  selectedTagFilters: [],
  filteredJams: [],
};

const SearchContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case SSACTIONS.SET_JAMS:
      return { ...state, filteredJams: action.jams };
    case SSACTIONS.SET_SEARCH:
      return { ...state, searchValue: action.value };
    case SSACTIONS.ADD_TAG_FILTERS:
      return {
        ...state,
        selectedTagFilters: [...state.selectedTagFilters, action.tag],
      };
    case SSACTIONS.ADD_TAG_FILTER_GROUP:
      return {
        ...state,
        selectedTagFilters: [...state.selectedTagFilters, ...action.tags],
      };
    case SSACTIONS.REMOVE_TAG_FILTERS:
      return {
        ...state,
        selectedTagFilters: state.selectedTagFilters.filter(
          (t) => t._id !== action.tag._id,
        ),
      };
    case SSACTIONS.CLEAR_TAG_FILTERS:
      return {
        ...state,
        selectedTagFilters: [],
      };
    case SSACTIONS.CLEAR_SEARCH:
      return initState;

    default:
      throw new Error();
  }
}

export function SearchProvider({ children }) {
  const router = useRouter();
  const { data: allTags } = useTagsQuery();
  const [state, dispatch] = useReducer(reducer, initState);
  const { tags } = router.query;
  const { selectedTagFilters } = state;

  // Capture search state with GA
  // debounce to reduce api calls
  useEffect(() => {
    const handler = setTimeout(() => {
      GA.searchBy(state);
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [state]);

  // Router Query for selected tags
  // Given query params from the router & react-query tags loaded
  // then update the state to reflect those chosen tags
  useEffect(() => {
    if (!tags || !allTags?.tags) {
      return null;
    }
    const tagGroup = tags
      .split(',')
      .map((t) => allTags.tags.find((at) => at.title === t))
      .filter((t) => !selectedTagFilters.find((stf) => stf._id === t._id));

    const deduped = dedupeArrayByKey(tagGroup, '_id');

    dispatch({ type: SSACTIONS.ADD_TAG_FILTER_GROUP, tags: deduped });
  }, [allTags, tags]);

  const value = {
    state,
    updateSearchValue: (value) => {
      dispatch({ type: SSACTIONS.SET_SEARCH, value });
    },

    addTag: (tag) => {
      return dispatch({ type: SSACTIONS.ADD_TAG_FILTERS, tag });
    },

    addTagGroup: (tags) => {
      return dispatch({ type: SSACTIONS.ADD_TAG_FILTER_GROUP, tags });
    },

    removeTag: (tag) => {
      dispatch({ type: SSACTIONS.REMOVE_TAG_FILTERS, tag });
    },

    handleFilter: (data) => {
      dispatch({ type: SSACTIONS.SET_JAMS, jams: data });
    },

    clearAllTags: () => {
      dispatch({ type: SSACTIONS.CLEAR_TAG_FILTERS });
    },
    clearSearch: () => {
      dispatch({ type: SSACTIONS.CLEAR_SEARCH });
    },
  };
  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
}

// Export useContext Hook.
export function useSearch() {
  const context = useContext(SearchContext);
  const { state = {} } = context;
  const { searchValue, selectedTagFilters } = state;

  const [fetchJams, jamQueryData] = useJamsLazyQuery();
  const { data: allJams = {}, isLoading: isLoadingJams } = jamQueryData;
  const { jams = [] } = allJams;

  const [fetchTags, tagQueryData] = useTagsQueryLazy();
  const { data: allTags = {}, isLoading: isLoadingTags } = tagQueryData;
  const { tags = [] } = allTags;

  let activeJams = [];
  let activeTags = [];

  useOnLoad(async () => {
    Fuse = await initFuse();
    await Promise.all([fetchJams(), fetchTags()]);
  });

  const isActiveSearch = searchValue || selectedTagFilters.length > 0;

  if (isActiveSearch && Fuse) {
    activeJams = searchJams({
      Fuse,
      query: searchValue,
      jams,
      filters: {
        tags: selectedTagFilters,
      },
    });

    activeTags = searchTags({
      Fuse,
      query: searchValue,
      tags,
      filters: {
        tags: selectedTagFilters,
      },
    });
  }

  return {
    ...context,
    jams: activeJams,
    tags: activeTags,
    isLoading: isLoadingJams || isLoadingTags,
    isActiveSearch,
  };
}

/**
 * searchJams
 */

function searchJams({ Fuse, query, jams, filters = {} } = {}) {
  const $or = [];
  const $and = [];

  if (query) {
    $or.push({
      $or: [
        {
          title: query,
        },
        {
          $path: ['author.name'],
          $val: query,
        },
        {
          $path: ['tag.title'],
          $val: query,
        },
      ],
    });
  }

  if (Array.isArray(filters.tags) && filters.tags.length > 0) {
    $and.concat(
      filters.tags.forEach(({ _id }) => {
        $and.push({
          $path: 'tags._id',
          $val: `'${_id}`, // the ' in front adds exact match
        });
      }),
    );
  }

  const queries = {
    $and: [
      {
        $and,
        $or,
      },
    ],
  };

  const fuse = new Fuse(jams, fuseSearchOptions);

  return fuse.search(queries).map((result) => result.item);
}

/**
 * searchTags
 */

function searchTags({ Fuse, query, tags, filters = {} } = {}) {
  const queries = {
    $or: [
      {
        title: query,
      },
      {
        $path: ['tags.title'],
        $val: query,
      },
    ],
    $and: [],
  };

  if (Array.isArray(filters.tags) && filters.tags.length > 0) {
    filters.tags.forEach(({ title }) => {
      queries.$and.push({
        $path: 'tags.title',
        $val: `'${title}`, // the ' in front adds exact match
      });
    });
  }

  const fuse = new Fuse(tags, fuseSearchOptions);

  return fuse.search(queries).map((result) => result.item);
}
