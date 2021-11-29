import React from 'react';
import { MdPublish as PublishIcon } from 'react-icons/md';
import { useDocumentOperation } from '@sanity/react-hooks';
import { userModerator } from '../../lib/user';
import userStore from 'part:@sanity/base/user';
import { resolveProductionUrl } from '../../config/resolveProductionUrl';
import { inferMetadataState, useWorkflowMetadata } from '../../lib/workflow';

function ConfirmDialogAction({ onComplete }) {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  return {
    icon: PublishIcon,
    shortcut: 'mod+shift+p',
    label: 'Publish',
    onHandle: () => {
      setDialogOpen(true);
    },
    dialog: dialogOpen && {
      type: 'confirm',
      onCancel: () => {
        setDialogOpen(false);
      },
      onConfirm: () => {
        alert('Published!');
        onComplete();
      },
      message: 'Ready to Publish?',
    },
  };
}

function DisablePublishDialogAction({ onComplete }) {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  return {
    label: 'Show confirm',
    onHandle: () => {
      setDialogOpen(true);
    },
    dialog: dialogOpen && {
      type: 'modal',
      onClose: () => {
        setDialogOpen(false);
      },
      title: 'Unable to Publish',
      content: (
        <div>
          <h3>👋 ... and I'm a modal</h3>
          <p>I'm suitable for longer and more diverse forms of content.</p>
        </div>
      ),
    },
  };
}

export function publishAction(props) {
  const ops = useDocumentOperation(props.id, props.type);
  const metadata = useWorkflowMetadata(props.id, inferMetadataState(props));
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const buttonDisabled = !userModerator();

  if (props.liveEdit || metadata.data.state !== 'approved') {
    return null;
  }

  const onHandle = async () => {
    if (ops.publish.disabled) {
      props.onComplete();
      return;
    }
    await ops.patch.execute([
      { set: { publishedAt: new Date().toISOString() } },
    ]);
    await metadata.setState('published');
    await ops.publish.execute();
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
