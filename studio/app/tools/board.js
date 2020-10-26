import PluginIcon from 'part:@sanity/base/plugin-icon';
import React, { useState, useEffect } from 'react';
import { BoardTool } from '../components/boardTool';
import { RouterProvider } from '../lib/router';
import userStore from 'part:@sanity/base/user';

function BoardToolRoot(props) {
  const [isAllowed, setAllowed] = useState(false);
  let disabled = true;
  const next = ({ user }) => {
    disabled = user.role !== 'administrator';
  };
  userStore.currentUser.subscribe({
    next,
    error: (error) => console.error(`Failed to get current user: ${error}`),
  });

  return (
    <RouterProvider>
      <BoardTool {...props} />
    </RouterProvider>
  );
}

export default {
  name: 'workflow',
  title: 'Workflow',
  component: BoardToolRoot,
  icon: PluginIcon,
};
