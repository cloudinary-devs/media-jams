import EditIcon from 'part:@sanity/base/edit-icon';
import { userModerator } from '../../lib/user';
import { inferMetadataState, useWorkflowMetadata } from '../../lib/workflow';

export function requestChangesAction(props) {
  const metadata = useWorkflowMetadata(props.id, inferMetadataState(props));
  const buttonDisabled = !userModerator();
  // if it's not in the following state, do not show
  if (!['inReview', 'updatedReview'].includes(metadata.data.state)) {
    return null;
  }
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
