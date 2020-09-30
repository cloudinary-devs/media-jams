import PluginIcon from 'part:@sanity/base/plugin-icon';
import React, { useState } from 'react';
import { BoardTool } from '../components/boardTool';
import { RouterProvider } from '../lib/router';
import userStore from 'part:@sanity/base/user';

function BoardToolRoot(props) {
  const [isAllowed, setAllowed] = useState(false);
  const next = ({ user }) => {};
  userStore.currentUser.subscribe({
    next,
    error: (error) => console.error(`Failed to get current user: ${error}`),
  });

  return (
    <RouterProvider>{isAllowed && <BoardTool {...props} />}</RouterProvider>
  );
}

export default {
  name: 'workflow',
  title: 'Workflow',
  component: BoardToolRoot,
  icon: PluginIcon,
};
