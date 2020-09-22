import PublishIcon from 'react-icons/lib/md/publish';
import { useDocumentOperation } from '@sanity/react-hooks';
import userStore from 'part:@sanity/base/user';
import { inferMetadataState, useWorkflowMetadata } from '../../lib/workflow';

export function publishAction(props) {
  const ops = useDocumentOperation(props.id, props.type);
  const metadata = useWorkflowMetadata(props.id, inferMetadataState(props));

  if (props.liveEdit || metadata.data.state === 'published') {
    return null;
  }
  const next = ({ user }) => {
    ops.publish.disabled = user.role !== 'administrator';
  };

  userStore.currentUser.subscribe({
    next,
    error: (error) => console.error(`Failed to get current user: ${error}`),
  });

  const onHandle = () => {
    if (ops.publish.disabled) {
      props.onComplete();
      return;
    }

    metadata.setState('published');
    ops.publish.execute();
    props.onComplete();
  };

  return {
    disabled: ops.publish.disabled,
    icon: PublishIcon,
    shortcut: 'mod+shift+p',
    label: 'Publish',
    onHandle,
  };
}
