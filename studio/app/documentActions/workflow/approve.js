import CheckIcon from 'part:@sanity/base/check-icon';
import userStore from 'part:@sanity/base/user';
import { inferMetadataState, useWorkflowMetadata } from '../../lib/workflow';

export function approveAction(props) {
  const metadata = useWorkflowMetadata(props.id, inferMetadataState(props));
  if (metadata.data.state !== 'inReview') {
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
    metadata.setState('approved');
    props.onComplete();
  };

  return {
    disabled: buttonDisabled,
    icon: CheckIcon,
    label: 'Approve',
    onHandle,
  };
}
