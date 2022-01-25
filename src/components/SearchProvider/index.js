import { useReducer, useEffect, createContext, useContext } from 'react';
import { QueryClient, useQuery } from 'react-query';

import { useJamsLazyQuery, useFeaturedJamsQuery } from '@hooks/useJams';
import useOnLoad from '@hooks/useOnLoad';
import { initFuse } from '@lib/search';

import GA from '@lib/googleAnalytics';

let Fuse;

const fuseOptions = {
  threshold: 0.35,
  location: 0,
  distance: 100,
  minMatchCharLength: 3,
  shouldSort: true,
  includeScore: true,
  useExtendedSearch: true,
  keys: ['title', 'tags.title', ['author', 'name']],
};

export const SSACTIONS = {
  SET_SEARCH: 'setSearch',
  ADD_TAG_FILTERS: 'addTagFilters',
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
    case SSACTIONS.REMOVE_TAG_FILTERS:
      return {
        ...state,
        selectedTagFilters: state.selectedTagFilters.filter(
          (t) => t !== action.tag,
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
  const [state, dispatch] = useReducer(reducer, initState);

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

  const value = {
    state,
    updateSearchValue: (value) => {
      dispatch({ type: SSACTIONS.SET_SEARCH, value });
    },
    addTag: (tag) => {
      return dispatch({ type: SSACTIONS.ADD_TAG_FILTERS, tag });
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

  let activeJams = [];

  useOnLoad(async () => {
    Fuse = await initFuse();
    await fetchJams();
  });

  const formattedTags = selectedTagFilters.map((item) => item.title);
  const isActiveSearch = searchValue || selectedTagFilters.length > 0;

  if (isActiveSearch && Fuse) {
    const queries = {
      $or: [
        {
          title: searchValue,
        },
        {
          $path: ['author.name'],
          $val: searchValue,
        },
        {
          $path: ['tags.title'],
          $val: searchValue,
        },
      ],
      $and: [],
    };

    if (formattedTags.length > 0) {
      formattedTags.forEach((tag) => {
        queries.$and.push({
          $path: 'tags.title',
          $val: `'${tag}`, // the ' in front adds exact match
        });
      });
    }

    const fuse = new Fuse(jams, fuseOptions);
    const results = fuse.search(queries).map((result) => result.item);

    activeJams = results;
  }

  return {
    ...context,
    jams: activeJams,
    isLoading: isLoadingJams,
    isActiveSearch,
  };
}
