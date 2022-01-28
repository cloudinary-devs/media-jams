import React, { useCallback, useState } from 'react';
import { useQuery } from 'react-query';

export default function useLazyQuery(key, fn, options = {}) {
  const [enabled, setEnabled] = useState(false);
  const query = useQuery(key, fn, {
    ...options,
    enabled,
  });
  return [useCallback(() => setEnabled(true), []), query];
}
