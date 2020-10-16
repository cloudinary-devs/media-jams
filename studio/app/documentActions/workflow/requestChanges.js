import EditIcon from 'part:@sanity/base/edit-icon';
import userStore from 'part:@sanity/base/user';
import { inferMetadataState, useWorkflowMetadata } from '../../lib/workflow';

export function requestChangesAction(props) {
  const metadata = useWorkflowMetadata(props.id, inferMetadataState(props));
  let buttonDisabled = true;
  if (metadata.data.state !== 'inReview') {
    return null;
  }
  const next = ({ user }) => {
    buttonDisabled = user.role !== 'moderator';
  };

  userStore.currentUser.subscribe({
    next,
    error: (error) => console.error(`Failed to get current user: ${error}`),
  });

  const onHandle = () => {
    metadata.setState('changesRequested');
    props.onComplete();
  };

  return {
    disabled: buttonDisabled,
    icon: EditIcon,
    label: 'Request changes',
    onHandle,
  };
}
