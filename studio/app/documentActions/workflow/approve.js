import CheckIcon from 'part:@sanity/base/check-icon';
import { userModerator } from '../../lib/user';
import { inferMetadataState, useWorkflowMetadata } from '../../lib/workflow';

export function approveAction(props) {
  const metadata = useWorkflowMetadata(props.id, inferMetadataState(props));
  const buttonDisabled = !userModerator();
  if (metadata.data.state !== 'inReview') {
    return null;
  }

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
