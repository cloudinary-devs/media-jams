import React from 'react';
import { MdPublish as PublishIcon } from 'react-icons/md';
import { useDocumentOperation } from '@sanity/react-hooks';
import { userModerator } from '../../lib/user';
import { resolveProductionUrl } from '../../config/resolveProductionUrl';
import { inferMetadataState, useWorkflowMetadata } from '../../lib/workflow';

export function publishAction(props) {
  const ops = useDocumentOperation(props.id, props.type);
  const metadata = useWorkflowMetadata(props.id, inferMetadataState(props));
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const buttonDisabled = !userModerator();

  if (props.liveEdit || metadata.data.state !== 'approved') {
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
    icon: PublishIcon,
    shortcut: 'mod+shift+p',
    label: 'Publish',
    disabled: buttonDisabled,
    onHandle: () => {
      setDialogOpen(true);
    },
    dialog: dialogOpen && {
      type: 'confirm',
      onCancel: () => {
        setDialogOpen(false);
      },
      onConfirm: () => {
        onHandle();
      },
      message: 'Ready to Publish?',
    },
  };
}
