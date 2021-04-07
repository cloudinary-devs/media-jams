import { useState, useEffect } from 'react';
import sanityClient from 'part:@sanity/base/client';
import { useCurrentProject } from '../project';
import { useObservable } from '../utils/use';
import { getUser$ } from './user';
import { getUserList$ } from './userList';

const client = sanityClient.withConfig({ apiVersion: '2019-05-28' });
export function useUser(userId) {
  const source = getUser$(userId);
  const initialState = null;
  const keys = [userId];

  return useObservable(source, initialState, keys);
}

export function useUserList(userIds) {
  if (!userIds) {
    throw new Error('useUserList: `userIds` must be an array of strings');
  }

  const source = getUserList$(userIds);
  const initialState = null;
  const keys = [userIds.join(',')];

  return useObservable(source, initialState, keys);
}

export function useProjectUsers() {
  const project = useCurrentProject();
  const allUserIds = project && project.members.map((user) => user.id);

  return useUserList(allUserIds || []);
}

export function userModerator() {
  const groupQuery = `* [_type == "system.group" && $identity in members]{_id}`;
  const [hasPermission, setPermission] = useState(false);
  useEffect(() => {
    const updatePermission = () => {
      client
        .fetch(groupQuery)
        // Convenience: Get the last portion of the group documents '_id' property,
        // since we'd like to just work with the string 'editors' instead of
        // '_.groups.editors'
        .then((docs) => docs.map((doc) => doc._id.split('.').pop()))
        .then((groupNames) => {
          setPermission(groupNames.includes('moderator'));
        });
    };
    updatePermission();
    return () => {};
  }, []);
  return hasPermission;
}
