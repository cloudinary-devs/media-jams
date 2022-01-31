import { useReducer, useEffect, createContext, useContext } from 'react';
import { QueryClient, useQuery } from 'react-query';
import { useRouter } from 'next/router';

import { useJamsLazyQuery } from '@hooks/useJams';
import { useTagsQueryLazy, useTagsQuery } from '@hooks/useTags';
import { useAuthorsQueryLazy } from '@hooks/useAuthors';
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
  keys: [
    'title',
    'name',
    'tags.title',
    'tags._id',
    'author._id',
    'author.name',
    ['author', 'name'],
  ],
};

export const SSACTIONS = {
  SET_SEARCH: 'setSearch',
  ADD_TAG_FILTERS: 'addTagFilters',
  ADD_TAG_FILTER_GROUP: 'addTagFilterGroup',
  REMOVE_TAG_FILTERS: 'removeTagFilters',
  CLEAR_TAG_FILTERS: 'clearTagFilters',
  ADD_AUTHOR_FILTERS: 'addAuthorFilters',
  REMOVE_AUTHOR_FILTERS: 'removeAuthorFilters',
  CLEAR_AUTHOR_FILTERS: 'clearAuthorFilters',
  SET_JAMS: 'setJams',
  CLEAR_SEARCH: 'clearSearch',
};

const initState = {
  searchValue: '',
  selectedTagFilters: [],
  selectedAuthorFilters: [],
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

    case SSACTIONS.ADD_AUTHOR_FILTERS:
      return {
        ...state,
        selectedAuthorFilters: [...state.selectedAuthorFilters, action.author],
      };
    case SSACTIONS.REMOVE_AUTHOR_FILTERS:
      return {
        ...state,
        selectedAuthorFilters: state.selectedAuthorFilters.filter(
          (a) => a._id !== action.author._id,
        ),
      };
    case SSACTIONS.CLEAR_AUTHOR_FILTERS:
      return {
        ...state,
        selectedAuthorFilters: [],
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
  const { selectedTagFilters, selectedAuthorFilters } = state;

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

    clearAllTags: () => {
      dispatch({ type: SSACTIONS.CLEAR_TAG_FILTERS });
    },

    addAuthor: (author) => {
      return dispatch({ type: SSACTIONS.ADD_AUTHOR_FILTERS, author });
    },

    removeAuthor: (author) => {
      dispatch({ type: SSACTIONS.REMOVE_AUTHOR_FILTERS, author });
    },

    clearAllAuthors: () => {
      dispatch({ type: SSACTIONS.CLEAR_AUTHOR_FILTERS });
    },

    handleFilter: (data) => {
      dispatch({ type: SSACTIONS.SET_JAMS, jams: data });
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
  const { searchValue, selectedTagFilters, selectedAuthorFilters } = state;

  const [fetchJams, jamQueryData] = useJamsLazyQuery();
  const { data: allJams = {}, isLoading: isLoadingJams } = jamQueryData;
  const { jams = [] } = allJams;

  const [fetchTags, tagQueryData] = useTagsQueryLazy();
  const { data: allTags = {}, isLoading: isLoadingTags } = tagQueryData;
  const { tags = [] } = allTags;

  const [fetchAuthors, authorQueryData] = useAuthorsQueryLazy();
  const {
    data: allAuthors = {},
    isLoading: isLoadingAuthors,
  } = authorQueryData;
  const { authors = [] } = allAuthors;

  let activeJams = [];
  let activeTags = [];
  let activeAuthors = [];

  useOnLoad(async () => {
    Fuse = await initFuse();
    await Promise.all([fetchJams(), fetchTags(), fetchAuthors()]);
  });

  const isActiveSearch =
    searchValue ||
    selectedTagFilters.length > 0 ||
    selectedAuthorFilters.length > 0;

  if (isActiveSearch && Fuse) {
    activeJams = searchJams({
      Fuse,
      query: searchValue,
      jams,
      filters: {
        tags: selectedTagFilters,
        authors: selectedAuthorFilters,
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

    activeAuthors = searchAuthors({
      Fuse,
      query: searchValue,
      authors,
      filters: {
        tags: selectedAuthorFilters,
      },
    });
  }

  return {
    ...context,
    jams: activeJams,
    tags: activeTags,
    authors: activeAuthors,
    isLoading: isLoadingJams || isLoadingTags || isLoadingAuthors,
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

  if (Array.isArray(filters.authors) && filters.authors.length > 0) {
    $and.concat(
      filters.authors.forEach(({ _id }) => {
        $and.push({
          $path: 'author._id',
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

/**
 * searchAuthors
 */

function searchAuthors({ Fuse, query, authors, filters = {} } = {}) {
  const queries = {
    $or: [
      {
        name: query,
      },
    ],
    $and: [],
  };

  if (Array.isArray(filters.authors) && filters.authors.length > 0) {
    filters.authors.forEach(({ name }) => {
      queries.$and.push({
        $path: 'author.name',
        $val: `'${name}`, // the ' in front adds exact match
      });
    });
  }

  const fuse = new Fuse(authors, fuseSearchOptions);

  return fuse.search(queries).map((result) => result.item);
}
