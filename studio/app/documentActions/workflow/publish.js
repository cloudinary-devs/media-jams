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
  let buttonDisabled = true;
  const next = ({ user }) => {
    buttonDisabled = user.role !== 'administrator';
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
    ops.patch.execute([{ set: { publishedAt: new Date().toISOString() } }]);
    metadata.setState('published');
    ops.publish.execute();
    props.onComplete();
  };

  return {
    disabled: buttonDisabled,
    icon: PublishIcon,
    shortcut: 'mod+shift+p',
    label: 'Publish',
    onHandle,
  };
}
