import { useDocumentOperation } from '@sanity/react-hooks';
import userStore from 'part:@sanity/base/user';
import CloseIcon from 'part:@sanity/base/close-icon';
import { inferMetadataState, useWorkflowMetadata } from '../../lib/workflow';
import { userModerator } from '../../lib/user';

export function unpublishAction(props) {
  const ops = useDocumentOperation(props.id, props.type);
  const metadata = useWorkflowMetadata(props.id, inferMetadataState(props));
  const buttonDisabled = !userModerator();
  if (metadata.data.state !== 'published') {
    return null;
  }

  const onHandle = () => {
    if (ops.unpublish.disabled) {
      props.onComplete();
      return;
    }

    metadata.setState('draft');
    ops.unpublish.execute();
    props.onComplete();
  };

  return {
    disabled: buttonDisabled,
    icon: CloseIcon,
    shortcut: 'mod+shift+u',
    label: 'Unpublish',
    onHandle,
  };
}
