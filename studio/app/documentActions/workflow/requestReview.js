import React from 'react';
import EyeIcon from 'part:@sanity/base/eye-icon';
import { useValidationStatus } from '@sanity/react-hooks';
import { inferMetadataState, useWorkflowMetadata } from '../../lib/workflow';
import { validate } from 'graphql';

export function requestReviewAction(props) {
  const [disabled, setDisabled] = React.useState(true);
  const { isValidating, markers } = useValidationStatus(props.id, props.type);
  const metadata = useWorkflowMetadata(props.id, inferMetadataState(props));
  const { state } = metadata.data;
  if (!props.draft || state === 'inReview' || state === 'approved') {
    return null;
  }
  /**
   * Workflow request for review must be valid to request review
   * otherwise it will be disabled
   */
  React.useEffect(() => {
    if (!isValidating) {
      setDisabled(markers.length !== 0);
    }
    console.log(markers);
  }, [isValidating, markers]);

  // const isDisabled =
  //   props.draft.slug?.current &&
  //   props.draft.cover &&
  //   props.draft.tags.length > 0
  //     ? false
  //     : true;

  const onHandle = () => {
    metadata.setState('inReview');
    props.onComplete();
  };

  return {
    disabled: disabled,
    icon: EyeIcon,
    label: 'Request review',
    onHandle,
  };
}
