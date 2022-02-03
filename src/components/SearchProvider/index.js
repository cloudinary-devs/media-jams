import React, { useReducer, useEffect } from 'react';
import { useRouter } from 'next/router';

import { useTagsQuery, useTags } from '@hooks/useTags';
import GA from '@lib/googleAnalytics';

export const SSACTIONS = {
  SET_SEARCH: 'setSearch',
  ADD_TAG_FILTERS: 'addTagFilters',
  ADD_TAG_FILTER_GROUP: 'addTagFilterGroup',
  REMOVE_TAG_FILTERS: 'removeTagFilters',
  CLEAR_TAG_FILTERS: 'clearTagFilters',
  SET_JAMS: 'setJams',
  SET_TAGS: 'setTags',
  CLEAR_SEARCH: 'clearSearch',
};

const initState = {
  tags: [],
  searchValue: '',
  selectedTagFilters: [],
  filteredJams: [],
};

const SearchContext = React.createContext();

function reducer(state, action) {
  switch (action.type) {
    case SSACTIONS.SET_JAMS:
      return { ...state, filteredJams: action.jams };
    case SSACTIONS.SET_SEARCH:
      return { ...state, searchValue: action.value };
    case SSACTIONS.SET_TAGS:
      return { ...state, tags: action.tags };

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
  // const { data: allTags } = useTagsQuery();
  const [allTags] = useTags();
  const [state, dispatch] = useReducer(reducer, initState);
  const { tags: routerTags } = router.query;

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

  React.useEffect(() => {
    //Set allTags
    dispatch({ type: SSACTIONS.SET_TAGS, tags: allTags });
  }, [allTags]);

  // Happens ONLY ONCE during load that 'isReady' changes from false -> true
  // routerTags are only populated from undefined to value after 'isReady' is true
  // Given query params from the router & react-query tags loaded
  React.useEffect(() => {
    if (!routerTags || !allTags) {
      return null;
    }
    const tagGroup = routerTags
      .split(',')
      .map((t) => allTags.find((at) => at.title === t));
    dispatch({ type: SSACTIONS.ADD_TAG_FILTER_GROUP, tags: tagGroup });
  }, [router.isReady]);

  // Update router params to reflect selected tag state
  React.useEffect(() => {
    if (!router.isReady) return null;
    const formattedTags = state.selectedTagFilters.map((item) => item.title);
    const routerPath =
      formattedTags.length > 0
        ? `/?tags=${formattedTags
            .map((t) => encodeURIComponent(t))
            .join('%2C')}`
        : `/`;
    router.push(routerPath, undefined, { shallow: true });
  }, [state.selectedTagFilters]);

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
  return React.useContext(SearchContext);
}
