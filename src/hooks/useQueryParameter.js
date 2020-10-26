/**
 * This is from Kent C. Dodds' site. Source can be found here:
 * https://github.com/kentcdodds/kentcdodds.com/blob/ddec06e845b97d590041e44a2b88184c53efb2f4/src/components/search/index.js#L86-L111
 */

import React from 'react';

export default function useQueryParamState(searchParamName) {
  const [value, setValue] = React.useState(() => {
    if (typeof window === 'undefined') {
      return '';
    }
    const searchParams = new URL(window.location).searchParams;
    if (searchParams.has(searchParamName)) {
      return searchParams.get(searchParamName);
    } else {
      return '';
    }
  });

  React.useEffect(() => {
    const newUrl = new URL(window.location);
    newUrl.searchParams.set(searchParamName, value);
    if (value) {
      window.history.replaceState(window.history.state, '', newUrl);
    } else {
      newUrl.searchParams.delete(searchParamName);
      window.history.replaceState(window.history.state, '', newUrl);
    }
  }, [searchParamName, value]);

  return [value, setValue];
}

export function serializeArray(array) {
  return array.join(',').replace(' ', '+');
}

export function deserializeArray(arrString) {
  // full thing "tags=some+string,and+another"
  // "some+string,and+another"
  return arrString.split(',').map((string) => string.replace('+', ' '));
}
