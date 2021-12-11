import React, { useReducer } from 'react';

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

const SearchContext = React.createContext();

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
  return React.useContext(SearchContext);
}
