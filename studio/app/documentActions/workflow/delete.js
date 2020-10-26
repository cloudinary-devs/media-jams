import React from 'react';
import TrashIcon from 'part:@sanity/base/trash-icon';
import { inferMetadataState } from '../../lib/workflow/helpers';
import { useWorkflowMetadata } from '../../lib/workflow/metadata';
import { userModerator } from '../../lib/user';
import userStore from 'part:@sanity/base/user';
import { useDocumentOperation } from '@sanity/react-hooks';

export function deleteAction(props) {
  const [showConfirmDialog, setShowConfirmDialog] = React.useState(false);
  const ops = useDocumentOperation(props.id, props.type);
  const metadata = useWorkflowMetadata(props.id, inferMetadataState(props));
  const buttonDisabled = !userModerator();

  const onHandle = () => {
    if (ops.delete.disabled) {
      props.onComplete();
      return;
    }

    if (!showConfirmDialog) {
      setShowConfirmDialog(true);
      return;
    }

    setShowConfirmDialog(false);
    metadata.delete();
    ops.delete.execute();
    props.onComplete();
  };

  return {
    dialog: showConfirmDialog && {
      type: 'confirm',
      message: <div>Sure you want to delete?</div>,
      onConfirm: onHandle,
      onCancel: () => setShowConfirmDialog(false),
    },
    disabled: buttonDisabled,
    icon: TrashIcon,
    shortcut: 'mod+shift+d',
    label: 'Delete',
    onHandle,
  };
}
