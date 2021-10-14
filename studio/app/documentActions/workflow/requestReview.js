import React from 'react';
import EyeIcon from 'part:@sanity/base/eye-icon';
import { useValidationStatus } from '@sanity/react-hooks';
import { inferMetadataState, useWorkflowMetadata } from '../../lib/workflow';

export function requestReviewAction(props) {
  const { markers } = useValidationStatus(props.id, props.type);
  const metadata = useWorkflowMetadata(props.id, inferMetadataState(props));
  const { state } = metadata.data;
  if (
    !props.draft ||
    state === 'inReview' ||
    state === 'updatedReview' ||
    state === 'approved'
  ) {
    return null;
  }

  const onHandle = () => {
    // initial defaults to true on new documents,
    // once the state is anything but 'inReview' initial is set to false and it be comes updatedReview.
    // Regaurdless of the draft/publish status
    const status = metadata.data.initial ? 'inReview' : 'updatedReview';
    metadata.setState(status);
    props.onComplete();
  };

  return {
    disabled: markers.length !== 0,
    icon: EyeIcon,
    label: 'Request review',
    onHandle,
  };
}
