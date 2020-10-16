import { MdPublish as PublishIcon } from 'react-icons/md';
import { useDocumentOperation } from '@sanity/react-hooks';
import { userModerator } from '../../lib/user';
import userStore from 'part:@sanity/base/user';
import { inferMetadataState, useWorkflowMetadata } from '../../lib/workflow';

export function publishAction(props) {
  const ops = useDocumentOperation(props.id, props.type);
  const metadata = useWorkflowMetadata(props.id, inferMetadataState(props));
  const buttonDisabled = !userModerator();

  if (props.liveEdit || metadata.data.state === 'published') {
    return null;
  }

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
