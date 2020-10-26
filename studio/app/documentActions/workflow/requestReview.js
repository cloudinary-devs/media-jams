import React from 'react';
import EyeIcon from 'part:@sanity/base/eye-icon';
import { RequestReviewWizard } from '../../components/requestReviewWizard';
import { inferMetadataState, useWorkflowMetadata } from '../../lib/workflow';

export function requestReviewAction(props) {
  const metadata = useWorkflowMetadata(props.id, inferMetadataState(props));
  const { state } = metadata.data;
  if (
    !props.draft ||
    !props.draft.slug?.current ||
    state === 'inReview' ||
    state === 'approved'
  ) {
    return null;
  }

  const onHandle = () => {
    metadata.setState('inReview');
    props.onComplete();
  };

  return {
    icon: EyeIcon,
    label: 'Request review',
    onHandle,
  };
}
