import userStore from 'part:@sanity/base/user';
import { useEffect, useState } from 'react';

export function useCurrentUser() {
  const [user, setUser] = useState();

  useEffect(() => {
    userStore.currentUser.subscribe((e) => setUser(e.user));
  }, []);

  if (!user) {
    return {};
  }

  return user;
}
