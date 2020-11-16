import React from 'react';
import { inferMetadataState, useWorkflowMetadata } from '../../lib/workflow';
import { GoClippy } from 'react-icons/go';
import { useDocumentOperation } from '@sanity/react-hooks';
import { resolveLiveEditUrl } from '../../config/resolveProductionUrl';
import Hotkeys from 'part:@sanity/components/typography/hotkeys';

export const liveEditAction = (props) => {
  const ops = useDocumentOperation(props.id, props.type);
  const metadata = useWorkflowMetadata(props.id, inferMetadataState(props));
  if (
    props.liveEdit ||
    props.type !== 'post' ||
    metadata.data.state === 'published'
  ) {
    return null;
  }
  let previewUrl;
  try {
    previewUrl = resolveLiveEditUrl(props.draft);
  } catch (error) {
    error.message = `An error was thrown while trying to get production preview url: ${error.message}`;
    // eslint-disable-next-line no-console
    return null;
  }

  if (!previewUrl) {
    return null;
  }
  const onHandle = () => {
    window.open(previewUrl, '_blank');
    props.onComplete();
  };

  return {
    icon: GoClippy,
    shortcut: 'mod+shift+l',
    label: 'Live Edit',
    onHandle,
  };
};
