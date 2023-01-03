import {
  useReducer,
  useEffect,
  createContext,
  useContext,
  useMemo,
} from 'react';
import { QueryClient, useQuery } from 'react-query';
import { useRouter } from 'next/router';

import { useJamsLazyQuery } from '@hooks/useJams';
import { useTagsQueryLazy, useTagsQuery } from '@hooks/useTags';
import { useAuthorsQueryLazy } from '@hooks/useAuthors';
import useOnLoad from '@hooks/useOnLoad';
import { initFuse } from '@lib/search';
import { dedupeArrayByKey } from '@lib/util';
import { useTags, useTagsLazy } from '@hooks/useTags';
import GA from '@lib/googleAnalytics';

let Fuse;

const fuseSearchOptions = {
  threshold: 0.35,
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
  SET_TAGS: 'setTags',
  CLEAR_SEARCH: 'clearSearch',
};

const initState = {
  tags: [],
  searchValue: '',
  selectedTagFilters: [],
  selectedAuthorFilters: [],
};

const SearchContext = createContext();

function reducer(state, action) {
  switch (action.type) {
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
      return { ...initState, tags: state.tags };

    default:
      throw new Error();
  }
}

export function SearchProvider({ children }) {
  const router = useRouter();
  const [allTags] = useTags();
  const [state, dispatch] = useReducer(reducer, initState);

  const { selectedTagFilters, selectedAuthorFilters } = state;
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

  useEffect(() => {
    //Set allTags
    dispatch({ type: SSACTIONS.SET_TAGS, tags: allTags });
  }, [allTags]);

  // Happens ONLY ONCE during load that 'isReady' changes from false -> true
  // routerTags are only populated from undefined to value after 'isReady' is true
  // Given query params from the router & react-query tags loaded
  // then update the state to reflect those chosen tags

  useEffect(() => {
    if (!routerTags || !Array.isArray(allTags) || allTags.length === 0) {
      return undefined;
    }
    const tagGroup = routerTags
      .split(',')
      .map((t) => allTags.find((at) => at.title === t))
      .filter((t) => !selectedTagFilters.find((stf) => stf._id === t._id));

    const deduped = dedupeArrayByKey(tagGroup, '_id');

    dispatch({ type: SSACTIONS.ADD_TAG_FILTER_GROUP, tags: deduped });
  }, [allTags, routerTags]);

  const value = useMemo(
    () => ({
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

      clearSearch: () => {
        dispatch({ type: SSACTIONS.CLEAR_SEARCH });
      },
    }),
    [state],
  );

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

  const [fetchTags, tagData] = useTagsLazy();
  const { data: allTags = {}, isLoading: isLoadingTags } = tagData;
  const { tags = [] } = allTags;

  // const [allTagsTags] = useTags();

  const [fetchAuthors, authorQueryData] = useAuthorsQueryLazy();
  const { data: allAuthors = {}, isLoading: isLoadingAuthors } =
    authorQueryData;
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
    filters.tags.forEach(({ _id }) => {
      $and.push({
        $path: 'tags._id',
        $val: `'${_id}`,
      });
    });
  }

  if (Array.isArray(filters.authors) && filters.authors.length > 0) {
    filters.authors.forEach(({ _id }) => {
      $and.push({
        $path: 'author._id',
        $val: `'${_id}`,
      });
    });
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
        $val: title,
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
        $val: name,
      });
    });
  }

  const fuse = new Fuse(authors, fuseSearchOptions);

  return fuse.search(queries).map((result) => result.item);
}
